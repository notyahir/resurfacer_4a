/**
 * Syncs for SwipeSessions concept
 * 
 * All SwipeSessions operations require authentication as they manage user-specific
 * session state and trigger downstream effects in TrackScoring.
 */

import { Requesting, SwipeSessions } from "@concepts";
import { actions, Sync } from "@engine";
import { validateSession } from "./auth_utils.ts";

/**
 * Sync: Start Swipe Session Request
 * Forwards to SwipeSessions.start only if authentication succeeds
 */
export const StartSwipeSessionRequest: Sync = ({ request, sessionToken, userId, queueTracks }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/start", sessionToken, userId, queueTracks },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([SwipeSessions.start, { userId, queueTracks }]),
});

/**
 * Sync: Start Swipe Session Auth Error
 * Immediately responds with error if authentication fails
 */
export const StartSwipeSessionAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/start", sessionToken, userId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      // Only match frames where auth FAILS
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
 * Sync: Start Swipe Session Response
 * Captures the sessionId and responds through Requesting
 */
export const StartSwipeSessionResponse: Sync = ({ request, sessionId }) => ({
  when: actions(
    [Requesting.request, { path: "/SwipeSessions/start" }, { request }],
    [SwipeSessions.start, {}, { sessionId }],
  ),
  then: actions([Requesting.respond, { request, sessionId }]),
});

/**
 * Sync: Next Track Request
 * Forwards to SwipeSessions.next only if authentication succeeds
 */
export const NextTrackRequest: Sync = ({ request, sessionToken, sessionId }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/next", sessionToken, sessionId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null;
    });
  },
  then: actions([SwipeSessions.next, { sessionId }]),
});

/**
 * Sync: Next Track Auth Error
 * Immediately responds with error if authentication fails
 */
export const NextTrackAuthError: Sync = ({ request, sessionToken, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/next", sessionToken },
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
 * Sync: Next Track Response
 */
export const NextTrackResponse: Sync = ({ request, trackId }) => ({
  when: actions(
    [Requesting.request, { path: "/SwipeSessions/next" }, { request }],
    [SwipeSessions.next, {}, { trackId }],
  ),
  then: actions([Requesting.respond, { request, trackId }]),
});

/**
 * Sync: Decide Keep Request
 * Forwards to SwipeSessions.decideKeep only if authentication succeeds
 */
export const DecideKeepRequest: Sync = ({ request, sessionToken, sessionId, trackId }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/decideKeep", sessionToken, sessionId, trackId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null;
    });
  },
  then: actions([SwipeSessions.decideKeep, { sessionId, trackId }]),
});

/**
 * Sync: Decide Keep Auth Error
 * Immediately responds with error if authentication fails
 */
export const DecideKeepAuthError: Sync = ({ request, sessionToken, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/decideKeep", sessionToken },
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
 * Sync: Decide Keep Response
 */
export const DecideKeepResponse: Sync = ({ request, decisionId }) => ({
  when: actions(
    [Requesting.request, { path: "/SwipeSessions/decideKeep" }, { request }],
    [SwipeSessions.decideKeep, {}, { decisionId }],
  ),
  then: actions([Requesting.respond, { request, decisionId }]),
});

/**
 * Sync: Decide Snooze Request
 * Forwards to SwipeSessions.decideSnooze only if authentication succeeds
 */
export const DecideSnoozeRequest: Sync = ({ request, sessionToken, sessionId, trackId }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/decideSnooze", sessionToken, sessionId, trackId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null;
    });
  },
  then: actions([SwipeSessions.decideSnooze, { sessionId, trackId }]),
});

/**
 * Sync: Decide Snooze Auth Error
 * Immediately responds with error if authentication fails
 */
export const DecideSnoozeAuthError: Sync = ({ request, sessionToken, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/decideSnooze", sessionToken },
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
 * Sync: Decide Snooze Response
 */
export const DecideSnoozeResponse: Sync = ({ request, decisionId }) => ({
  when: actions(
    [Requesting.request, { path: "/SwipeSessions/decideSnooze" }, { request }],
    [SwipeSessions.decideSnooze, {}, { decisionId }],
  ),
  then: actions([Requesting.respond, { request, decisionId }]),
});

/**
 * Sync: Decide Add to Playlist Request
 * Forwards to SwipeSessions.decideAddToPlaylist only if authentication succeeds
 */
export const DecideAddToPlaylistRequest: Sync = ({ request, sessionToken, sessionId, trackId, playlistId }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/decideAddToPlaylist", sessionToken, sessionId, trackId, playlistId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null;
    });
  },
  then: actions([SwipeSessions.decideAddToPlaylist, { sessionId, trackId, playlistId }]),
});

/**
 * Sync: Decide Add to Playlist Auth Error
 * Immediately responds with error if authentication fails
 */
export const DecideAddToPlaylistAuthError: Sync = ({ request, sessionToken, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/decideAddToPlaylist", sessionToken },
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
 * Sync: Decide Add to Playlist Response
 */
export const DecideAddToPlaylistResponse: Sync = ({ request, decisionId }) => ({
  when: actions(
    [Requesting.request, { path: "/SwipeSessions/decideAddToPlaylist" }, { request }],
    [SwipeSessions.decideAddToPlaylist, {}, { decisionId }],
  ),
  then: actions([Requesting.respond, { request, decisionId }]),
});

/**
 * Sync: Decide Create Playlist Request
 * Forwards to SwipeSessions.decideCreatePlaylist only if authentication succeeds
 */
export const DecideCreatePlaylistRequest: Sync = ({ request, sessionToken, sessionId, trackId, playlistTitle }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/decideCreatePlaylist", sessionToken, sessionId, trackId, playlistTitle },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null;
    });
  },
  then: actions([SwipeSessions.decideCreatePlaylist, { sessionId, trackId, playlistTitle }]),
});

/**
 * Sync: Decide Create Playlist Auth Error
 * Immediately responds with error if authentication fails
 */
export const DecideCreatePlaylistAuthError: Sync = ({ request, sessionToken, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/decideCreatePlaylist", sessionToken },
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
 * Sync: Decide Create Playlist Response
 */
export const DecideCreatePlaylistResponse: Sync = ({ request, decisionId }) => ({
  when: actions(
    [Requesting.request, { path: "/SwipeSessions/decideCreatePlaylist" }, { request }],
    [SwipeSessions.decideCreatePlaylist, {}, { decisionId }],
  ),
  then: actions([Requesting.respond, { request, decisionId }]),
});

/**
 * Sync: End Session Request
 * Forwards to SwipeSessions.end only if authentication succeeds
 */
export const EndSessionRequest: Sync = ({ request, sessionToken, sessionId }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/endSession", sessionToken, sessionId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null;
    });
  },
  then: actions([SwipeSessions.end, { sessionId }]),
});

/**
 * Sync: End Session Auth Error
 * Immediately responds with error if authentication fails
 */
export const EndSessionAuthError: Sync = ({ request, sessionToken, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/SwipeSessions/endSession", sessionToken },
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
 * Sync: End Session Response
 */
export const EndSessionResponse: Sync = ({ request, ended }) => ({
  when: actions(
    [Requesting.request, { path: "/SwipeSessions/end" }, { request }],
    [SwipeSessions.end, {}, { ended }],
  ),
  then: actions([Requesting.respond, { request, ended }]),
});
