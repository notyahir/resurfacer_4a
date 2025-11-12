import { Collection, Db } from "npm:mongodb";
import { freshID } from "@utils/database.ts";
import { ID } from "@utils/types.ts";
import LibraryCacheConcept from "../LibraryCache/LibraryCacheConcept.ts";
import TrackScoringConcept from "../TrackScoring/TrackScoringConcept.ts";
import {
  computeSpotifyExpiration,
  getSpotifyConfig,
  normalizeSpotifyScopes,
  parseSpotifyScopes,
  requestSpotifyToken,
  getAllSavedTracks,
  getRecentlyPlayed,
  getUserPlaylists,
  getPlaylistTracks,
  getAudioFeatures,
  type SpotifyAudioFeaturesSnapshot,
  type SpotifyTokenRequest,
  type SpotifyTokenResult,
  type SpotifyConfig,
  type SavedTrackItem,
  type RecentlyPlayedItem,
  type UserPlaylistItem,
} from "@utils/spotify.ts";

// Generic types of this concept. User is an external, polymorphic type.
type User = ID;
type LinkId = ID;
type CapabilityId = ID;

const PREFIX = "PlatformLink.";
const SUPPORTED_PLATFORMS = ["spotify", "youtube_music"];
const TOKEN_LIFESPAN_MS = 3600 * 1000; // 1 hour dummy token lifespan

const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const DEFAULT_SPOTIFY_SCOPES = [
  "user-library-read",
  "user-read-recently-played",
  "playlist-read-private",
  "user-top-read",
];
const SPOTIFY_SAVED_TRACK_LIMIT = 500;
const SPOTIFY_RECENTLY_PLAYED_LIMIT = 50;
const SPOTIFY_PLAYLIST_LIMIT = 25;
const SPOTIFY_PLAYLIST_TRACK_LIMIT = 100;
const AUTH_SESSION_LIFESPAN_MS = 10 * 60 * 1000; // 10 minutes
const CODE_VERIFIER_LENGTH = 96;
const STATE_LENGTH = 48;

/**
 * State representation for a user known to this concept.
 * Corresponds to:
 *   A set of `Users` with
 *     - a `userId` of type `String` (mapped to `_id`)
 *     - a `createdAt` timestamp of type `Float`
 */
interface UserDoc {
  _id: User;
  createdAt: number;
}

/**
 * State representation for a platform link.
 * Corresponds to:
 *   A set of `Links` with
 *     - a `linkId` of type `String` (mapped to `_id`)
 *     - a `userId` of type `String`
 *     - a `platform` of type `String`
 *     - an `accessToken` of type `String`
 *     - an `tokenExpiration` timestamp of type `Float`
 */
interface LinkDoc {
  _id: LinkId;
  userId: User;
  platform: string;
  accessToken: string;
  tokenExpiration: number;
  refreshToken?: string;
  tokenType?: string;
  scopes?: string[];
  lastAuthorizedAt?: number;
}

interface AuthSessionDoc {
  _id: string; // state
  userId: User;
  platform: string;
  codeVerifier: string;
  redirectUri: string;
  scopes: string[];
  createdAt: number;
  expiresAt: number;
}

/**
 * State representation for a capability associated with a link.
 * Corresponds to:
 *   A set of `Capabilities` with
 *     - a `linkId` of type `String`
 *     - a `capability` of type `String`
 */
interface CapabilityDoc {
  _id: CapabilityId;
  linkId: LinkId;
  capability: string;
}

/**
 * concept: PlatformLink [User]
 * purpose: Provide authenthicated access to a streaming platform. Give other concepts a safe way of talking to the streaming platform without leaking tokens.
 * principle: When a user links their streaming platform account, the app can verify capabilities and renew tokens on their behalf without other concepts ever touching credentials.
 */
export default class PlatformLinkConcept {
  private readonly users: Collection<UserDoc>;
  private readonly links: Collection<LinkDoc>;
  private readonly capabilities: Collection<CapabilityDoc>;
  private readonly authSessions: Collection<AuthSessionDoc>;
  #spotifyConfigCache?: SpotifyConfig | { error: string };

  constructor(private readonly db: Db) {
    this.users = db.collection<UserDoc>(PREFIX + "users");
    this.links = db.collection<LinkDoc>(PREFIX + "links");
    this.capabilities = db.collection<CapabilityDoc>(PREFIX + "capabilities");
    this.authSessions = db.collection<AuthSessionDoc>(PREFIX + "authSessions");

    // Ensure state documents expire automatically in Mongo if supported.
    this.authSessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch((error) => {
      console.warn("PlatformLink.authSessions TTL index warning:", error);
    });
  }

  /**
   * Creates a new link to a streaming platform for a given user.
   *
   * requires: userId is valid, platform is supported, NO existing link for the user/platform combination.
   * effects: Creates and returns a new link record. Stores a new access token and expiration time. If the user is new to this concept, a corresponding user record is also created.
   */
  async link({ userId, platform }: { userId: User; platform: string }): Promise<{ linkId: LinkId } | { error: string }> {
    if (!SUPPORTED_PLATFORMS.includes(platform)) {
      return { error: `Platform '${platform}' is not supported.` };
    }

    const existingLink = await this.links.findOne({ userId, platform });
    if (existingLink) {
      return { error: `User already has a link for platform '${platform}'.` };
    }

    // This concept now "knows" about this user.
    await this.users.updateOne({ _id: userId }, { $setOnInsert: { createdAt: Date.now() } }, { upsert: true });

    const newLinkId = freshID() as LinkId;
    const newLink: LinkDoc = {
      _id: newLinkId,
      userId,
      platform,
      accessToken: `dummy_token_${freshID()}`, // In a real app, this comes from an OAuth flow
      tokenExpiration: Date.now() + TOKEN_LIFESPAN_MS,
    };

    await this.links.insertOne(newLink);

    return { linkId: newLinkId };
  }

  /**
   * Refreshes the access token for an existing link.
   *
   * requires: link exists.
   * effects: Updates accessToken, prolongs and returns new expiration time.
   */
  async refresh({ linkId }: { linkId: LinkId }): Promise<{ newExpiration: number } | { error: string }> {
    const link = await this.links.findOne({ _id: linkId });
    if (!link) {
      return { error: `Link with id '${linkId}' not found.` };
    }
    if (link.platform !== "spotify") {
      return { error: "Token refresh is only implemented for Spotify links." };
    }
    if (!link.refreshToken) {
      return { error: "Link is missing a refresh token. Re-authorize the account." };
    }

    const tokenResult = await this.#requestSpotifyTokens({
      type: "refresh_token",
      refreshToken: link.refreshToken,
    });
    if ("error" in tokenResult) {
      return tokenResult;
    }

    const tokenExpiration = computeSpotifyExpiration(tokenResult.expires_in);
    const update: Partial<LinkDoc> = {
      accessToken: tokenResult.access_token,
      tokenExpiration,
      tokenType: tokenResult.token_type,
      lastAuthorizedAt: Date.now(),
    };
    if (tokenResult.refresh_token) {
      update.refreshToken = tokenResult.refresh_token;
    }
    if (tokenResult.scope) {
      update.scopes = parseSpotifyScopes(tokenResult.scope);
    }

    await this.links.updateOne({ _id: linkId }, { $set: update });
    return { newExpiration: tokenExpiration };
  }

  /**
   * Revokes a user's link to a platform, deleting all associated data.
   *
   * requires: Link exists.
   * effects: Deletes the link and any associated capabilities.
   */
  async revoke({ linkId }: { linkId: LinkId }): Promise<{ removed: boolean } | { error: string }> {
    const link = await this.links.findOne({ _id: linkId });
    if (!link) {
      return { error: `Link with id '${linkId}' not found.` };
    }

    // Delete associated capabilities first
    await this.capabilities.deleteMany({ linkId });

    // Then delete the link itself
    const deleteResult = await this.links.deleteOne({ _id: linkId });

    return { removed: deleteResult.deletedCount > 0 };
  }

  /**
   * Checks if a link is active and possesses a specific capability.
   *
   * effects: returns whether a Link has the needed access and availability.
   *          Simply put, returns whether a capability exists for the link and the token is not expired.
   */
  async can({ linkId, capability }: { linkId: LinkId; capability: string }): Promise<{ ok: boolean }> {
    const link = await this.links.findOne({ _id: linkId });

    if (!link) {
      return { ok: false };
    }

    if (link.tokenExpiration < Date.now()) {
      return { ok: false };
    }

    const hasCapability = await this.capabilities.findOne({ linkId, capability });

    return { ok: !!hasCapability };
  }

  // ----- Integration helpers (wire PlatformLink → LibraryCache → TrackScoring) -----

  /**
   * Begins the Spotify OAuth linking flow by issuing a PKCE challenge and returning an authorize URL.
   */
  async startAuth({
    userId,
    platform,
    scopes,
    redirectUri,
  }: {
    userId: User;
    platform: string;
    scopes?: string[];
    redirectUri?: string;
  }): Promise<{ authorizeUrl: string; state: string; expiresAt: number } | { error: string }> {
    if (!SUPPORTED_PLATFORMS.includes(platform)) {
      return { error: `Platform '${platform}' is not supported.` };
    }
    if (platform !== "spotify") {
      return { error: "OAuth linking is currently only implemented for Spotify." };
    }

    const spotifyConfig = this.#getSpotifyConfig();
    if ("error" in spotifyConfig) {
      return spotifyConfig;
    }

    const effectiveRedirect = redirectUri ?? spotifyConfig.redirectUri;
    if (!effectiveRedirect) {
      return { error: "Spotify redirect URI is not configured." };
    }

    await this.users.updateOne({ _id: userId }, { $setOnInsert: { createdAt: Date.now() } }, { upsert: true });

    const state = randomString(STATE_LENGTH, STATE_ALPHABET);
    const codeVerifier = randomString(CODE_VERIFIER_LENGTH, CODE_VERIFIER_ALPHABET);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const scopeList = normalizeSpotifyScopes(scopes ?? spotifyConfig.defaultScopes ?? DEFAULT_SPOTIFY_SCOPES);
    const expiresAt = Date.now() + AUTH_SESSION_LIFESPAN_MS;

    await this.authSessions.insertOne({
      _id: state,
      userId,
      platform,
      codeVerifier,
      redirectUri: effectiveRedirect,
      scopes: scopeList,
      createdAt: Date.now(),
      expiresAt,
    });

    const authorizeUrl = new URL(SPOTIFY_AUTHORIZE_URL);
    authorizeUrl.searchParams.set("client_id", spotifyConfig.clientId);
    authorizeUrl.searchParams.set("response_type", "code");
    authorizeUrl.searchParams.set("redirect_uri", effectiveRedirect);
    authorizeUrl.searchParams.set("state", state);
    authorizeUrl.searchParams.set("scope", scopeList.join(" "));
    authorizeUrl.searchParams.set("code_challenge_method", "S256");
    authorizeUrl.searchParams.set("code_challenge", codeChallenge);

    return { authorizeUrl: authorizeUrl.toString(), state, expiresAt };
  }

  /**
   * Completes the Spotify OAuth flow with an authorization code and stores the resulting tokens on the link.
   */
  async completeAuth({ state, code }: { state: string; code: string }): Promise<
    { linkId: LinkId; userId: User; platform: string; tokenExpiration: number; scopes: string[] } | { error: string }
  > {
    const session = await this.authSessions.findOne({ _id: state });
    if (!session) {
      return { error: "Invalid or expired authorization state." };
    }
    if (session.expiresAt < Date.now()) {
      await this.authSessions.deleteOne({ _id: state });
      return { error: "Authorization session expired. Restart the connect flow." };
    }

    const spotifyConfig = this.#getSpotifyConfig();
    if ("error" in spotifyConfig) {
      return spotifyConfig;
    }

    const tokenResult = await this.#requestSpotifyTokens({
      type: "authorization_code",
      code,
      redirectUri: session.redirectUri,
      codeVerifier: session.codeVerifier,
    });
    if ("error" in tokenResult) {
      return tokenResult;
    }

    const tokenExpiration = computeSpotifyExpiration(tokenResult.expires_in);
    const scopes = tokenResult.scope ? parseSpotifyScopes(tokenResult.scope) : session.scopes;
    const update: Partial<LinkDoc> = {
      accessToken: tokenResult.access_token,
      tokenExpiration,
      tokenType: tokenResult.token_type,
      scopes,
      refreshToken: tokenResult.refresh_token ?? undefined,
      lastAuthorizedAt: Date.now(),
    };

    let linkId: LinkId;
    const existing = await this.links.findOne({ userId: session.userId, platform: session.platform });
    if (existing) {
      linkId = existing._id;
      await this.links.updateOne({ _id: existing._id }, { $set: update });
    } else {
      linkId = freshID() as LinkId;
      await this.links.insertOne({
        _id: linkId,
        userId: session.userId,
        platform: session.platform,
        accessToken: update.accessToken!,
        tokenExpiration,
        refreshToken: update.refreshToken,
        tokenType: update.tokenType,
        scopes,
        lastAuthorizedAt: update.lastAuthorizedAt,
      });
    }

    await this.authSessions.deleteOne({ _id: state });
    return { linkId, userId: session.userId, platform: session.platform, tokenExpiration, scopes };
  }

  /**
   * Lists links for a user to retrieve linkIds and platforms.
   */
  async listLinks({ userId }: { userId: User }): Promise<
    { links: Array<{ linkId: LinkId; platform: string; tokenExpiration: number; scopes?: string[]; lastAuthorizedAt?: number }> } | { error: string }
  > {
    if (!userId) return { error: "userId must be provided" };
    const docs = await this.links.find({ userId }).toArray();
    const links = docs.map((d) => ({
      linkId: d._id,
      platform: d.platform,
      tokenExpiration: d.tokenExpiration,
      scopes: d.scopes,
      lastAuthorizedAt: d.lastAuthorizedAt,
    }));
    return { links };
  }

  /**
   * Accepts a library payload (tracks, likes, plays, playlists) and syncs it into LibraryCache for the user behind the link.
   * This gives TrackScoring real data to work with without frontend calling LibraryCache directly.
   */
  async syncLibrary({ linkId, payload }: { linkId: LinkId; payload: {
    userId: User;
    tracks: Array<{ trackId: string; title: string; artist: string; available: boolean; tempo?: number; energy?: number; valence?: number }>;
    likes: Array<{ trackId: string; addedAt: number }>;
    plays: Array<{ trackId: string; lastPlayedAt: number }>;
    playlists: Array<{ playlistId: string; entries: { idx: number; trackId: string }[]; updatedAt: number }>;
  } }): Promise<{ synced: boolean } | { error: string }> {
    const link = await this.links.findOne({ _id: linkId });
    if (!link) return { error: `Link with id '${linkId}' not found.` };
    if (link.tokenExpiration < Date.now()) return { error: "Link token expired. Refresh and retry." };

    if (!payload || !payload.userId) return { error: "Invalid payload: userId required" };
    if (payload.userId !== link.userId) return { error: "Payload userId does not match link user" };

    const lc = new LibraryCacheConcept(this.db);
    const result = await lc.sync(payload);
    if (result && typeof result === "object" && "error" in result) {
      return { error: result.error };
    }
    return { synced: true };
  }

  /**
   * Fetches the user's Spotify library using the stored access token and synchronizes
   * it into LibraryCache. This is the backend-native way to refresh without the frontend
   * providing a payload.
   */
  async syncLibraryFromSpotify({ userId }: { userId: User }): Promise<
    { synced: true; counts: { tracks: number; likes: number; plays: number; playlists: number } } | { error: string }
  > {
    if (!userId) return { error: "userId must be provided" };

    const link = await this.links.findOne({ userId, platform: "spotify" });
    if (!link) return { error: `No Spotify link found for user ${userId}` };

    // Ensure we have a valid token
    if (link.tokenExpiration <= Date.now()) {
      if (!link.refreshToken) return { error: "Spotify access token expired and no refresh token available" };
      const refreshed = await this.refresh({ linkId: link._id });
      if ("error" in refreshed) return refreshed;
    }

    const effective = await this.links.findOne({ _id: link._id });
    if (!effective) return { error: "Link disappeared during refresh" };

    const accessToken = effective.accessToken;
    try {
      // Pull data from Spotify - wrap each call to identify which one fails
      let saved: SavedTrackItem[] = [];
      let recent: RecentlyPlayedItem[] = [];
      let playlists: UserPlaylistItem[] = [];

      try {
        saved = await getAllSavedTracks(accessToken, SPOTIFY_SAVED_TRACK_LIMIT);
      } catch (e) {
        console.warn("[PlatformLink] Failed to get saved tracks:", e instanceof Error ? e.message : e);
        // Continue with empty saved tracks
      }

      try {
        recent = await getRecentlyPlayed(accessToken, SPOTIFY_RECENTLY_PLAYED_LIMIT);
      } catch (e) {
        console.warn("[PlatformLink] Failed to get recently played:", e instanceof Error ? e.message : e);
        // Continue with empty recently played
      }

      try {
        playlists = await getUserPlaylists(accessToken, SPOTIFY_PLAYLIST_LIMIT);
      } catch (e) {
        console.warn("[PlatformLink] Failed to get playlists:", e instanceof Error ? e.message : e);
        // Continue with empty playlists
      }

      const trackMap = new Map<string, { trackId: string; rawId: string; title: string; artist: string }>();
      const rawTrackIds = new Set<string>();

      const ensureTrackMeta = (rawId: string, title?: string, artistNames?: string[]) => {
        const trackId = `spotify:track:${rawId}`;
        const existing = trackMap.get(trackId);
        const joinedArtists = artistNames?.filter((name) => !!name).join(", ") ?? existing?.artist ?? "Unknown Artist";
        const resolvedTitle = title ?? existing?.title ?? "Unknown Track";
        trackMap.set(trackId, {
          trackId,
          rawId,
          title: resolvedTitle,
          artist: joinedArtists,
        });
      };

      // Likes → LibraryCache.likes and ensure tracks
      const likes = saved.map((item) => {
        const track = item.track;
        const rawId = track?.id;
        if (!rawId) return null;
        rawTrackIds.add(rawId);
        ensureTrackMeta(rawId, track?.name, track?.artists?.map((a) => a.name));
        return { trackId: `spotify:track:${rawId}`, addedAt: Date.parse(item.added_at) };
      }).filter((v): v is { trackId: string; addedAt: number } => !!v);

      // Recently played → LibraryCache.plays and ensure tracks
      const plays = recent.map((item) => {
        const track = item.track;
        const rawId = track?.id;
        if (!rawId) return null;
        rawTrackIds.add(rawId);
        ensureTrackMeta(rawId, track?.name, track?.artists?.map((a) => a.name));
        return { trackId: `spotify:track:${rawId}`, lastPlayedAt: Date.parse(item.played_at) };
      }).filter((v): v is { trackId: string; lastPlayedAt: number } => !!v);

      // Playlists and entries (best-effort; skip on failures per playlist)
      const playlistEntries: { playlistId: string; entries: { idx: number; trackId: string }[]; updatedAt: number }[] = [];
      for (const playlist of playlists) {
        try {
          const per = await getPlaylistTracks(accessToken, playlist.id, SPOTIFY_PLAYLIST_TRACK_LIMIT);
          const entries: { idx: number; trackId: string }[] = [];
          let idx = 0;
          for (const item of per) {
            const track = item.track;
            const rawId = track?.id;
            if (!rawId) continue;
            rawTrackIds.add(rawId);
            ensureTrackMeta(rawId, track?.name, track?.artists?.map((a) => a.name));
            entries.push({ idx: idx++, trackId: `spotify:track:${rawId}` });
          }
          playlistEntries.push({ playlistId: `spotify:playlist:${playlist.id}`, entries, updatedAt: Date.now() });
        } catch (_e) {
          // ignore a failing playlist fetch
        }
      }

      const audioFeatures = rawTrackIds.size > 0
        ? await getAudioFeatures(accessToken, Array.from(rawTrackIds)).catch(() => {
          // Audio Features API deprecated Nov 2024 - gracefully degrade to no features
          console.warn("[PlatformLink] Audio Features API unavailable (deprecated Nov 2024), continuing without features");
          return new Map<string, SpotifyAudioFeaturesSnapshot>();
        })
        : new Map<string, SpotifyAudioFeaturesSnapshot>();

      // Build tracks array from map
      const tracks = Array.from(trackMap.values()).map((meta) => {
        const feature = audioFeatures.get(meta.rawId);
        return {
          trackId: meta.trackId,
          title: meta.title,
          artist: meta.artist,
          available: true,
          tempo: feature?.tempo ?? undefined,
          energy: feature?.energy ?? undefined,
          valence: feature?.valence ?? undefined,
        };
      });

      const lc = new LibraryCacheConcept(this.db);
      const res = await lc.sync({ userId, tracks, likes, plays, playlists: playlistEntries });
      if (res && typeof res === "object" && "error" in res) return { error: res.error };

      return { synced: true, counts: { tracks: tracks.length, likes: likes.length, plays: plays.length, playlists: playlistEntries.length } };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Failed to sync from Spotify" };
    }
  }

  /**
   * Convenience: ingest stats into TrackScoring from LibraryCache and prime scores.
   * Returns how many stats were ingested and whether default weights were set.
   */
  async bootstrapTrackScoring({ userId, size = 50 }: { userId: User; size?: number }): Promise<
    { ingested: number; ensuredWeights: boolean; previewCount: number; source: "scores" | "bootstrap" | "empty" } | { error: string }
  > {
    if (!userId) return { error: "userId must be provided" };
    const ts = new TrackScoringConcept(this.db);
    const ingest = await ts.ingestFromLibraryCache({ userId });
    if ("error" in ingest) return { error: ingest.error };

    const preview = await ts.preview({ userId, size });
    if ("error" in preview) return { error: preview.error };

    return { ingested: ingest.ingested, ensuredWeights: ingest.ensuredWeights, previewCount: preview.tracks.length, source: preview.source };
  }

  #getSpotifyConfig(): SpotifyConfig | { error: string } {
    if (!this.#spotifyConfigCache) {
      this.#spotifyConfigCache = getSpotifyConfig();
    }
    return this.#spotifyConfigCache;
  }

  async #requestSpotifyTokens(request: SpotifyTokenRequest): Promise<SpotifyTokenResult> {
    const config = this.#getSpotifyConfig();
    if ("error" in config) {
      return config;
    }
    return await requestSpotifyToken(config, request);
  }
}

// --- Spotify helpers -------------------------------------------------------

const STATE_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const CODE_VERIFIER_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";

function randomString(length: number, alphabet: string): string {
  const values = new Uint8Array(length);
  crypto.getRandomValues(values);
  let result = "";
  for (const value of values) {
    result += alphabet[value % alphabet.length]!;
  }
  return result;
}

function base64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64Url(digest);
}
