/**
 * Syncs for LibraryCache concept
 * 
 * Handles library synchronization operations.
 */

import { Requesting, LibraryCache } from "@concepts";
import { actions, Sync } from "@engine";
import { validateSession } from "./auth_utils.ts";

/**
 * Sync: Sync Library Request
 * Forwards to LibraryCache.sync only if authentication succeeds
 */
export const SyncRequest: Sync = ({ request, sessionToken, userId, tracks, likes, plays, playlists }) => ({
  when: actions([
    Requesting.request,
    { path: "/LibraryCache/sync", sessionToken, userId, tracks, likes, plays, playlists },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([LibraryCache.sync, { userId, tracks, likes, plays, playlists }]),
});

/**
 * Sync: Sync Library Auth Error
 * Immediately responds with error if authentication fails
 */
export const SyncAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/LibraryCache/sync", sessionToken, userId },
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
 * Sync: Sync Library Response
 */
export const SyncResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/LibraryCache/sync" }, { request }],
    [LibraryCache.sync, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

/**
 * Sync: Ingest Request
 * Forwards to LibraryCache.ingest only if authentication succeeds
 */
export const IngestRequest: Sync = ({ request, sessionToken, userId, tracks }) => ({
  when: actions([
    Requesting.request,
    { path: "/LibraryCache/ingest", sessionToken, userId, tracks },
    { request },
  ]),
  where: (frames) => {
    return frames.filter(($) => {
      const validUserId = validateSession($[sessionToken] as string);
      return validUserId !== null && validUserId === ($[userId] as string);
    });
  },
  then: actions([LibraryCache.ingest, { userId, tracks }]),
});

/**
 * Sync: Ingest Auth Error
 * Immediately responds with error if authentication fails
 */
export const IngestAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([
    Requesting.request,
    { path: "/LibraryCache/ingest", sessionToken, userId },
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
 * Sync: Ingest Response
 */
export const IngestResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/LibraryCache/ingest" }, { request }],
    [LibraryCache.ingest, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});
