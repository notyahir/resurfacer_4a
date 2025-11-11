/**
 * Authentication utilities for syncs
 * 
 * Provides session token validation and authenticated sync wrapper helpers.
 * 
 * AUTHENTICATION PATTERN FOR SYNCS:
 * ==================================
 * For each authenticated endpoint, create TWO syncs:
 * 
 * 1. REQUEST SYNC (fires when auth succeeds):
 *    - `where` clause filters to keep only frames with valid auth
 *    - `then` clause calls the concept action
 * 
 * 2. AUTH ERROR SYNC (fires when auth fails):
 *    - `where` clause filters to keep only frames with INVALID auth
 *    - `where` clause enriches frames with error message
 *    - `then` clause calls Requesting.respond with the error
 * 
 * This pattern ensures:
 * - Valid requests get processed immediately
 * - Invalid requests get immediate error responses (no 10s timeout)
 * - Clear separation between auth logic and business logic
 * 
 * Example:
 *   export const MyActionRequest: Sync = ({ request, sessionToken, userId, ...params }) => ({
 *     when: actions([Requesting.request, { path: "/...", sessionToken, userId, ...params }, { request }]),
 *     where: (frames) => frames.filter(($) => {
 *       const validUserId = validateSession($[sessionToken] as string);
 *       return validUserId !== null && validUserId === ($[userId] as string);
 *     }),
 *     then: actions([MyConcept.myAction, { userId, ...params }]),
 *   });
 *   
 *   export const MyActionAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
 *     when: actions([Requesting.request, { path: "/...", sessionToken, userId }, { request }]),
 *     where: (frames) => frames.filter(($) => {
 *       const validUserId = validateSession($[sessionToken] as string);
 *       return validUserId === null || validUserId !== ($[userId] as string);
 *     }).map(($) => {
 *       const validUserId = validateSession($[sessionToken] as string);
 *       const errorMsg = validUserId === null 
 *         ? "Unauthorized: Invalid or missing session token"
 *         : "Forbidden: Session userId does not match requested userId";
 *       return { ...$, [error]: errorMsg };
 *     }),
 *     then: actions([Requesting.respond, { request, error }]),
 *   });
 */

import { Requesting } from "@concepts";
import { actions } from "@engine";

/**
 * Validates a session token and extracts the userId.
 * 
 * For the demo/assignment, we use a simple format: "session:userId"
 * In production, this would verify JWT tokens with signatures.
 * 
 * @param sessionToken - The token to validate
 * @returns The userId if valid, null otherwise
 */
export function validateSession(sessionToken: string | undefined): string | null {
  if (!sessionToken || typeof sessionToken !== "string") {
    return null;
  }

  // Demo format: "session:userId" or "session:user:123"
  if (sessionToken.startsWith("session:")) {
    const userId = sessionToken.replace("session:", "");
    return userId.length > 0 ? userId : null;
  }

  return null;
}

/**
 * Creates an authenticated sync wrapper for a concept action.
 * 
 * This helper reduces boilerplate by:
 * 1. Intercepting Requesting.request for the given path
 * 2. Validating the session token
 * 3. Extracting and transforming parameters
 * 4. Calling the concept action
 * 5. Responding through Requesting.respond
 * 
 * @param path - The request path (e.g., "/SwipeSessions/start")
 * @param conceptAction - The concept method to call
 * @param extractParams - Function to extract/transform params, receives { userId, ...inputs }
 * @returns A Sync function
 */
export function createAuthSync(
  path: string,
  conceptAction: (params: Record<string, unknown>) => Promise<Record<string, unknown>>,
  extractParams: (inputs: Record<string, unknown>) => Record<string, unknown>
) {
  return ({ request, sessionToken, ...inputs }: Record<string, unknown>) => ({
    when: actions([
      Requesting.request,
      { path, sessionToken, ...inputs },
      { request },
    ]),
    then: async () => {
      // Validate authentication
      const userId = validateSession(sessionToken as string);
      if (!userId) {
        throw new Error("Unauthorized: Invalid or missing session token");
      }

      // Extract parameters and inject validated userId
      const params = extractParams({ userId, ...inputs });

      // Execute the concept action
      const result = await conceptAction(params);

      // Respond through Requesting
      return actions([Requesting.respond, { request, ...result }]);
    },
  });
}

/**
 * Creates a sync that doesn't require authentication but still goes through Requesting.
 * Useful for public operations that were excluded for other reasons (logging, rate limiting, etc.)
 */
export function createPublicSync(
  path: string,
  conceptAction: (params: Record<string, unknown>) => Promise<Record<string, unknown>>,
  extractParams: (inputs: Record<string, unknown>) => Record<string, unknown>
) {
  return ({ request, ...inputs }: Record<string, unknown>) => ({
    when: actions([
      Requesting.request,
      { path, ...inputs },
      { request },
    ]),
    then: async () => {
      const params = extractParams(inputs);
      const result = await conceptAction(params);
      return actions([Requesting.respond, { request, ...result }]);
    },
  });
}
