/**
 * Syncs for PlatformLink concept
 * 
 * Handles OAuth flow and library synchronization operations.
 */

import { Requesting, PlatformLink } from "@concepts";
import { actions, Sync } from "@engine";
import { validateSession } from "./auth_utils.ts";

/**
 * Sync: Start Auth Request
 * Forwards to PlatformLink.startAuth only if authentication succeeds
 */
export const StartAuthRequest: Sync = ({ request, sessionToken, userId, platform, scopes, redirectUri }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/startAuth", sessionToken, userId, platform, scopes, redirectUri },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([PlatformLink.startAuth, { userId, platform, scopes, redirectUri }]),
});

/**
 * Sync: Start Auth Auth Error
 * Immediately responds with error if authentication fails
 */
export const StartAuthAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/startAuth", sessionToken, userId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId === null || validUserId !== ($[userId] as string);
    }).map(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      const errorMsg = validUserId === null 
        ? "Unauthorized: Invalid or missing session token"
        : "Forbidden: Session userId does not match requested userId";
      return { ...$, [error]: errorMsg };
    });
  },
  then: actions([Requesting.respond, { request, error }]),
});

/**
 * Sync: Start Auth Response
 */
export const StartAuthResponse: Sync = ({ request, authorizeUrl, state, expiresAt }) => ({
  when: actions(
    [Requesting.request, { path: "/PlatformLink/startAuth" }, { request }],
    [PlatformLink.startAuth, {}, { authorizeUrl, state, expiresAt }],
  ),
  then: actions([Requesting.respond, { request, authorizeUrl, state, expiresAt }]),
});

/**
 * Sync: Complete Auth Request
 * Public endpoint - PKCE verification happens in the concept itself
 * No session token required since user is completing OAuth flow
 */
export const CompleteAuthRequest: Sync = ({ request, state, code }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/completeAuth", state, code },
    { request },
  ]),
  then: actions([PlatformLink.completeAuth, { state, code }]),
});

/**
 * Sync: Complete Auth Response
 */
export const CompleteAuthResponse: Sync = ({ request, linkId, platform, tokenExpiration, scopes }) => ({
  when: actions(
    [Requesting.request, { path: "/PlatformLink/completeAuth" }, { request }],
    [PlatformLink.completeAuth, {}, { linkId, platform, tokenExpiration, scopes }],
  ),
  then: actions([Requesting.respond, { request, linkId, platform, tokenExpiration, scopes }]),
});

/**
 * Sync: Sync Library From Spotify Request
 * Forwards to PlatformLink.syncLibraryFromSpotify only if authentication succeeds
 */
export const SyncLibraryFromSpotifyRequest: Sync = ({ request, sessionToken, userId }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/syncLibraryFromSpotify", sessionToken, userId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([PlatformLink.syncLibraryFromSpotify, { userId }]),
});

/**
 * Sync: Sync Library From Spotify Auth Error
 * Immediately responds with error if authentication fails
 */
export const SyncLibraryFromSpotifyAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/syncLibraryFromSpotify", sessionToken, userId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId === null || validUserId !== ($[userId] as string);
    }).map(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      const errorMsg = validUserId === null 
        ? "Unauthorized: Invalid or missing session token"
        : "Forbidden: Session userId does not match requested userId";
      return { ...$, [error]: errorMsg };
    });
  },
  then: actions([Requesting.respond, { request, error }]),
});

/**
 * Sync: Sync Library From Spotify Response
 */
export const SyncLibraryFromSpotifyResponse: Sync = ({ request, synced, counts }) => ({
  when: actions(
    [Requesting.request, { path: "/PlatformLink/syncLibraryFromSpotify" }, { request }],
    [PlatformLink.syncLibraryFromSpotify, {}, { synced, counts }],
  ),
  then: actions([Requesting.respond, { request, synced, counts }]),
});

/**
 * Sync: List Links Request
 * Forwards to PlatformLink.listLinks only if authentication succeeds
 */
export const ListLinksRequest: Sync = ({ request, sessionToken, userId }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/listLinks", sessionToken, userId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([PlatformLink.listLinks, { userId }]),
});

/**
 * Sync: List Links Auth Error
 * Immediately responds with error if authentication fails
 */
export const ListLinksAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/listLinks", sessionToken, userId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId === null || validUserId !== ($[userId] as string);
    }).map(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      const errorMsg = validUserId === null 
        ? "Unauthorized: Invalid or missing session token"
        : "Forbidden: Session userId does not match requested userId";
      return { ...$, [error]: errorMsg };
    });
  },
  then: actions([Requesting.respond, { request, error }]),
});

/**
 * Sync: List Links Response
 */
export const ListLinksResponse: Sync = ({ request, links }) => ({
  when: actions(
    [Requesting.request, { path: "/PlatformLink/listLinks" }, { request }],
    [PlatformLink.listLinks, {}, { links }],
  ),
  then: actions([Requesting.respond, { request, links }]),
});

/**
 * Sync: Refresh Token Request
 * Forwards to PlatformLink.refresh only if authentication succeeds
 * Note: In production, verify linkId belongs to validUserId
 */
export const RefreshRequest: Sync = ({ request, sessionToken, linkId }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/refresh", sessionToken, linkId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null;
    });
  },
  then: actions([PlatformLink.refresh, { linkId }]),
});

/**
 * Sync: Refresh Token Auth Error
 * Immediately responds with error if authentication fails
 */
export const RefreshAuthError: Sync = ({ request, sessionToken, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/refresh", sessionToken },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId === null;
    }).map(($) => {
      return { ...$, [error]: "Unauthorized: Invalid or missing session token" };
    });
  },
  then: actions([Requesting.respond, { request, error }]),
});

/**
 * Sync: Refresh Token Response
 */
export const RefreshResponse: Sync = ({ request, newExpiration }) => ({
  when: actions(
    [Requesting.request, { path: "/PlatformLink/refresh" }, { request }],
    [PlatformLink.refresh, {}, { newExpiration }],
  ),
  then: actions([Requesting.respond, { request, newExpiration }]),
});

/**
 * Sync: Revoke Link Request
 * Forwards to PlatformLink.revoke only if authentication succeeds
 * Note: In production, verify linkId belongs to validUserId
 */
export const RevokeRequest: Sync = ({ request, sessionToken, linkId }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/revoke", sessionToken, linkId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null;
    });
  },
  then: actions([PlatformLink.revoke, { linkId }]),
});

/**
 * Sync: Revoke Link Auth Error
 * Immediately responds with error if authentication fails
 */
export const RevokeAuthError: Sync = ({ request, sessionToken, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/revoke", sessionToken },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId === null;
    }).map(($) => {
      return { ...$, [error]: "Unauthorized: Invalid or missing session token" };
    });
  },
  then: actions([Requesting.respond, { request, error }]),
});

/**
 * Sync: Revoke Link Response
 */
export const RevokeResponse: Sync = ({ request, removed }) => ({
  when: actions(
    [Requesting.request, { path: "/PlatformLink/revoke" }, { request }],
    [PlatformLink.revoke, {}, { removed }],
  ),
  then: actions([Requesting.respond, { request, removed }]),
});

/**
 * Sync: Bootstrap Track Scoring Request
 * Forwards to PlatformLink.bootstrapTrackScoring only if authentication succeeds
 */
export const BootstrapTrackScoringRequest: Sync = ({ request, sessionToken, userId, size }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/bootstrapTrackScoring", sessionToken, userId, size },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([PlatformLink.bootstrapTrackScoring, { userId, size }]),
});

/**
 * Sync: Bootstrap Track Scoring Auth Error
 * Immediately responds with error if authentication fails
 */
export const BootstrapTrackScoringAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlatformLink/bootstrapTrackScoring", sessionToken, userId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId === null || validUserId !== ($[userId] as string);
    }).map(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      const errorMsg = validUserId === null 
        ? "Unauthorized: Invalid or missing session token"
        : "Forbidden: Session userId does not match requested userId";
      return { ...$, [error]: errorMsg };
    });
  },
  then: actions([Requesting.respond, { request, error }]),
});

/**
 * Sync: Bootstrap Track Scoring Response
 */
export const BootstrapTrackScoringResponse: Sync = ({ request, trackIds, tracks, source }) => ({
  when: actions(
    [Requesting.request, { path: "/PlatformLink/bootstrapTrackScoring" }, { request }],
    [PlatformLink.bootstrapTrackScoring, {}, { trackIds, tracks, source }],
  ),
  then: actions([Requesting.respond, { request, trackIds, tracks, source }]),
});
