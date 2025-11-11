/**
 * The Requesting concept exposes passthrough routes by default,
 * which allow POSTs to the route:
 *
 * /{REQUESTING_BASE_URL}/{Concept name}/{action or query}
 *
 * to passthrough directly to the concept action or query.
 * This is a convenient and natural way to expose concepts to
 * the world, but should only be done intentionally for public
 * actions and queries.
 *
 * This file allows you to explicitly set inclusions and exclusions
 * for passthrough routes:
 * - inclusions: those that you can justify their inclusion
 * - exclusions: those to exclude, using Requesting routes instead
 */

/**
 * INCLUSIONS
 *
 * Each inclusion must include a justification for why you think
 * the passthrough is appropriate (e.g. public query).
 *
 * inclusions = {"route": "justification"}
 */

export const inclusions: Record<string, string> = {
  // LibraryCache - Read-only queries that don't modify state
  "/api/LibraryCache/getLiked": "public read-only query for liked tracks",
  "/api/LibraryCache/getTracks": "public read-only query for track metadata",
  "/api/LibraryCache/_getLiked": "internal helper for getting liked tracks",
  "/api/LibraryCache/_getPlaylist": "internal helper for playlist retrieval",

  // TrackScoring - Read operations and previews
  "/api/TrackScoring/preview": "public query to preview stale tracks, no auth needed for demo",
  "/api/TrackScoring/calculateScore": "stateless calculation helper",
  "/api/TrackScoring/normaliseSize": "utility function for normalizing queue size",

  // PlaylistHealth - Analysis queries (read-only)
  "/api/PlaylistHealth/getReport": "public query to retrieve analysis reports",
};

/**
 * EXCLUSIONS
 *
 * Excluded routes fall back to the Requesting concept, and will
 * instead trigger the normal Requesting.request action. As this
 * is the intended behavior, no justification is necessary.
 *
 * exclusions = ["route"]
 */

export const exclusions: Array<string> = [
  // PlatformLink - ALL OAuth and sync operations require authentication
  "/api/PlatformLink/link",
  "/api/PlatformLink/refresh",
  "/api/PlatformLink/revoke",
  "/api/PlatformLink/can",
  "/api/PlatformLink/startAuth",
  "/api/PlatformLink/completeAuth",
  "/api/PlatformLink/listLinks",
  "/api/PlatformLink/syncLibrary",
  "/api/PlatformLink/syncLibraryFromSpotify",
  "/api/PlatformLink/bootstrapTrackScoring",

  // LibraryCache - Write operations that modify state
  "/api/LibraryCache/ingest",
  "/api/LibraryCache/sync",

  // TrackScoring - State-modifying operations
  "/api/TrackScoring/updateWeights",
  "/api/TrackScoring/updateStats",
  "/api/TrackScoring/score",
  "/api/TrackScoring/keep",
  "/api/TrackScoring/snooze",
  "/api/TrackScoring/fetchPreviewFromScores",
  "/api/TrackScoring/bootstrapScores",
  "/api/TrackScoring/ingestFromLibraryCache",

  // SwipeSessions - ALL session operations require user authentication
  "/api/SwipeSessions/start",
  "/api/SwipeSessions/next",
  "/api/SwipeSessions/decideKeep",
  "/api/SwipeSessions/decideSnooze",
  "/api/SwipeSessions/decideAddToPlaylist",
  "/api/SwipeSessions/decideCreatePlaylist",
  "/api/SwipeSessions/end",
  "/api/SwipeSessions/_makeDecision",

  // PlaylistHealth - State-modifying operations
  "/api/PlaylistHealth/snapshot",
  "/api/PlaylistHealth/analyze",
];
