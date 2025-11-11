/**
 * Syncs for PlaylistHealth concept
 * 
 * Handles playlist analysis operations.
 */

import { Requesting, PlaylistHealth } from "@concepts";
import { actions, Sync } from "@engine";
import { validateSession } from "./auth_utils.ts";

/**
 * Sync: Snapshot Request
 * Forwards to PlaylistHealth.snapshot only if authentication succeeds
 */
export const SnapshotRequest: Sync = ({ request, sessionToken, playlistId, userId, trackIds }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlaylistHealth/snapshot", sessionToken, playlistId, userId, trackIds },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([PlaylistHealth.snapshot, { playlistId, userId, trackIds }]),
});

/**
 * Sync: Snapshot Auth Error
 * Immediately responds with error if authentication fails
 */
export const SnapshotAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlaylistHealth/snapshot", sessionToken, userId },
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
 * Sync: Snapshot Response
 */
export const SnapshotResponse: Sync = ({ request, snapshotId }) => ({
  when: actions(
    [Requesting.request, { path: "/PlaylistHealth/snapshot" }, { request }],
    [PlaylistHealth.snapshot, {}, { snapshotId }],
  ),
  then: actions([Requesting.respond, { request, snapshotId }]),
});

/**
 * Sync: Analyze Request
 * Forwards to PlaylistHealth.analyze only if authentication succeeds
 * Note: Playlist owner verification happens in concept
 */
export const AnalyzeRequest: Sync = ({ request, sessionToken, playlistId, snapshotId }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlaylistHealth/analyze", sessionToken, playlistId, snapshotId },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null;
    });
  },
  then: actions([PlaylistHealth.analyze, { playlistId, snapshotId }]),
});

/**
 * Sync: Analyze Auth Error
 * Immediately responds with error if authentication fails
 */
export const AnalyzeAuthError: Sync = ({ request, sessionToken, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/PlaylistHealth/analyze", sessionToken },
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
 * Sync: Analyze Response
 */
export const AnalyzeResponse: Sync = ({ request, reportId }) => ({
  when: actions(
    [Requesting.request, { path: "/PlaylistHealth/analyze" }, { request }],
    [PlaylistHealth.analyze, {}, { reportId }],
  ),
  then: actions([Requesting.respond, { request, reportId }]),
});
