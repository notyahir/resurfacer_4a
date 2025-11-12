/**
 * Syncs for TrackScoring concept
 * 
 * Handles track scoring operations that modify user preferences and stats.
 */

import { Requesting, TrackScoring } from "@concepts";
import { actions, Sync } from "@engine";
import { validateSession } from "./auth_utils.ts";

/**
 * Sync: Ingest From Library Cache Request
 * Forwards to TrackScoring.ingestFromLibraryCache only if authentication succeeds
 */
export const IngestFromLibraryCacheRequest: Sync = ({ request, sessionToken, userId }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/ingestFromLibraryCache", sessionToken, userId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([TrackScoring.ingestFromLibraryCache, { userId }]),
});

/**
 * Sync: Ingest From Library Cache Auth Error
 * Immediately responds with error if authentication fails
 */
export const IngestFromLibraryCacheAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/ingestFromLibraryCache", sessionToken, userId },
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
 * Sync: Ingest From Library Cache Response
 */
export const IngestFromLibraryCacheResponse: Sync = ({ request, ingested, ensuredWeights }) => ({
  when: actions(
    [Requesting.request, { path: "/TrackScoring/ingestFromLibraryCache" }, { request }],
    [TrackScoring.ingestFromLibraryCache, {}, { ingested, ensuredWeights }],
  ),
  then: actions([Requesting.respond, { request, ingested, ensuredWeights }]),
});

/**
 * Sync: Ingest From Library Cache Error Response
 * Handles when TrackScoring.ingestFromLibraryCache returns an error
 */
export const IngestFromLibraryCacheErrorResponse: Sync = ({ request, error }) => ({
  when: actions(
    [Requesting.request, { path: "/TrackScoring/ingestFromLibraryCache" }, { request }],
    [TrackScoring.ingestFromLibraryCache, {}, { error }],
  ),
  then: actions([Requesting.respond, { request, error }]),
});

/**
 * Sync: Update Weights Request
 * Forwards to TrackScoring.updateWeights only if authentication succeeds
 */
export const UpdateWeightsRequest: Sync = ({ request, sessionToken, userId, lastPlayedW, likedWhenW, timesSkippedW }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/updateWeights", sessionToken, userId, lastPlayedW, likedWhenW, timesSkippedW },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([TrackScoring.updateWeights, { userId, lastPlayedW, likedWhenW, timesSkippedW }]),
});

/**
 * Sync: Update Weights Auth Error
 * Immediately responds with error if authentication fails
 */
export const UpdateWeightsAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/updateWeights", sessionToken, userId },
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
 * Sync: Update Weights Response
 */
export const UpdateWeightsResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/TrackScoring/updateWeights" }, { request }],
    [TrackScoring.updateWeights, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

/**
 * Sync: Keep Track Request
 * Forwards to TrackScoring.keep only if authentication succeeds
 */
export const KeepRequest: Sync = ({ request, sessionToken, userId, trackId }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/keep", sessionToken, userId, trackId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([TrackScoring.keep, { userId, trackId }]),
});

/**
 * Sync: Keep Track Auth Error
 * Immediately responds with error if authentication fails
 */
export const KeepAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/keep", sessionToken, userId },
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
 * Sync: Keep Track Response
 */
export const KeepResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/TrackScoring/keep" }, { request }],
    [TrackScoring.keep, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

/**
 * Sync: Snooze Track Request
 * Forwards to TrackScoring.snooze only if authentication succeeds
 */
export const SnoozeRequest: Sync = ({ request, sessionToken, userId, trackId, until }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/snooze", sessionToken, userId, trackId, until },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([TrackScoring.snooze, { userId, trackId, until }]),
});

/**
 * Sync: Snooze Track Auth Error
 * Immediately responds with error if authentication fails
 */
export const SnoozeAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/snooze", sessionToken, userId },
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
 * Sync: Snooze Track Response
 */
export const SnoozeResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/TrackScoring/snooze" }, { request }],
    [TrackScoring.snooze, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

/**
 * Sync: Update Stats Request
 * Forwards to TrackScoring.updateStats only if authentication succeeds
 */
export const UpdateStatsRequest: Sync = ({ request, sessionToken, userId, trackId, timesSkipped }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/updateStats", sessionToken, userId, trackId, timesSkipped },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([TrackScoring.updateStats, { userId, trackId, timesSkipped }]),
});

/**
 * Sync: Update Stats Auth Error
 * Immediately responds with error if authentication fails
 */
export const UpdateStatsAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/updateStats", sessionToken, userId },
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
 * Sync: Update Stats Response
 */
export const UpdateStatsResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/TrackScoring/updateStats" }, { request }],
    [TrackScoring.updateStats, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

/**
 * Sync: Score Track Request
 * Forwards to TrackScoring.score only if authentication succeeds
 */
export const ScoreRequest: Sync = ({ request, sessionToken, userId, size }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/score", sessionToken, userId, size },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([TrackScoring.score, { userId, size }]),
});

/**
 * Sync: Score Track Auth Error
 * Immediately responds with error if authentication fails
 */
export const ScoreAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/TrackScoring/score", sessionToken, userId },
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
 * Sync: Score Track Response
 */
export const ScoreResponse: Sync = ({ request, trackIds }) => ({
  when: actions(
    [Requesting.request, { path: "/TrackScoring/score" }, { request }],
    [TrackScoring.score, {}, { trackIds }],
  ),
  then: actions([Requesting.respond, { request, trackIds }]),
});

