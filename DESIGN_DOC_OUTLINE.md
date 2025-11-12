# Design Document Outline - Resurfacer (Assignment 4c)

## 1. Introduction & Overview
- **Project Name:** Resurfacer - A Spotify library management and discovery app
- **Core Purpose:** Help users rediscover forgotten tracks from their Spotify library through intelligent scoring and swipe-based interaction
- **Key Innovation:** Sync-based architecture using 4c engine for declarative state management

## 2. Evolution from Assignment 2 (Concept Design)

### 2.1 Concept Changes & Refinements

#### **Concepts Preserved from A2:**
- **LibraryCache** - Stores user's Spotify library data (tracks, likes, plays, playlists)
  - *Refinement:* Added dual sync pattern from PlatformLink for fresh data
  - *Refinement:* Separated concerns - LibraryCache is read-only storage, PlatformLink handles OAuth
  
- **TrackScoring** - Calculates relevance scores based on user listening patterns
  - *Refinement:* Changed from simple formula to weighted scoring system
  - *Refinement:* Added Weights collection for per-user customization (lastPlayedW, likedWhenW, timesSkippedW)
  - *Refinement:* Separated Stats (user behavior data) from Scores (computed values)
  
- **SwipeSessions** - Tinder-like interface for track discovery
  - *Refinement:* Changed from persistent sessions to ephemeral sessions
  - *Refinement:* Added deck generation based on scores rather than random selection
  - *Refinement:* Moved verdict tracking into session state (keptTrackIds, snoozedTrackIds)

- **PlaylistHealth** - Analyzes playlist freshness and suggests improvements
  - *Refinement:* Simplified from A2 - focuses on playlist staleness detection
  - *Refinement:* Added snapshot+analysis two-step pattern for better caching

#### **Concepts Added Post-A2:**
- **PlatformLink** - OAuth integration with Spotify (NEW)
  - *Rationale:* Needed real data from Spotify API, not just mock data
  - *Implementation:* OAuth 2.0 PKCE flow, token management, API integration
  - *Key Challenge:* Handling token refresh, scope validation, API deprecations
  
- **Requesting** - Request/response pattern for 4c sync engine (NEW)
  - *Rationale:* Bridge between HTTP frontend and sync-based backend
  - *Implementation:* Request tracking with timeouts, response matching
  - *Key Feature:* Passthrough routes for read-only operations (performance optimization)

#### **Concepts Removed from A2:**
- **LikertSurvey** - Removed in favor of simpler swipe-based interaction
  - *Rationale:* Swipe sessions provide implicit feedback; explicit surveys felt redundant
  - *Trade-off:* Lost granular preference data, but gained simpler UX

### 2.2 Synergy Between Concepts

**Data Flow Pipeline:**
```
PlatformLink (OAuth) → LibraryCache (Storage) → TrackScoring (Analysis) → SwipeSessions (Interaction)
                                                                        ↓
                                              PlaylistHealth (Recommendations)
```

**Key Synergies:**
1. **PlatformLink ↔ LibraryCache:** Automatic sync when user connects Spotify
2. **LibraryCache → TrackScoring:** Stats ingestion from likes/plays data
3. **TrackScoring → SwipeSessions:** Score-based deck generation
4. **SwipeSessions → TrackScoring:** Feedback loop (keep/snooze actions update scores)
5. **LibraryCache → PlaylistHealth:** Playlist staleness analysis

## 3. Evolution from Assignment 4b (Visual Design)

### 3.1 UI/UX Changes

#### **Preserved Elements:**
- **Connect Page:** OAuth flow initiation (kept mostly as-designed in 4b)
- **Hub Page:** Central navigation dashboard
- **Swipe Page:** Tinder-style card interface with keep/snooze actions
- **Playlist Health Page:** Staleness visualization and recommendations

#### **Changed/Adapted Elements:**
- **Session Initialization:** Moved from automatic to manual "Start Session" button
  - *Reason:* Gives users control over when to generate new deck
  
- **Score Customization:** Added weight adjustment controls (not in 4b wireframes)
  - *Reason:* Users wanted to customize how scores are calculated
  
- **Error Handling:** Added comprehensive error states and fallbacks
  - *Reason:* Real Spotify API can fail; demo fallback prevents broken experience

#### **Technical Constraints That Shaped Design:**
- **Sync Engine Limitations:** 
  - All state changes must go through syncs (no direct DB mutations)
  - Required rethinking of real-time updates
  
- **Authentication Requirements:**
  - Dual-sync pattern for every authenticated endpoint
  - Session management became more complex than anticipated
  
- **API Limitations:**
  - Spotify Audio Features API deprecated Nov 2024
  - Had to gracefully degrade when features unavailable
  - Rate limits forced batching and caching strategies

### 3.2 Frontend Architecture Decisions

**Vue 3 Composition API:**
- Single-file components for modularity
- Reactive state management with `ref()` and `computed()`
- Service layer for API abstraction (`services/` directory)

**State Management Strategy:**
- Local component state for UI (loading, errors, stages)
- Session storage for OAuth flow state
- LocalStorage for session tokens
- Backend as source of truth for all library/score data

**Styling Approach:**
- Tailwind CSS for utility-first styling
- Custom components for swipe cards, progress bars, health indicators
- Responsive design for mobile/desktop

## 4. Key Technical Decisions & Trade-offs

### 4.1 Sync-Based Architecture

**Decision:** Use 4c sync engine for all backend state management

**Rationale:**
- Declarative logic: Syncs express "when X happens, then Y"
- Automatic conflict resolution through frame matching
- Clear separation of concerns (concepts vs syncs)

**Trade-offs:**
- ✅ **Pros:** Clean, testable, composable logic
- ❌ **Cons:** Learning curve, debugging challenges, performance concerns for high-throughput

**Key Pattern: Dual-Sync Authentication**
```typescript
// For EVERY authenticated endpoint, we need TWO syncs:

// 1. Request Sync (auth succeeds → call concept action)
export const MyActionRequest: Sync = ({ request, sessionToken, userId, ...params }) => ({
  when: actions([Requesting.request, { path: "/...", sessionToken, userId, ...params }, { request }]),
  where: (frames) => frames.filter(($) => {
    const validUserId = validateSession($[sessionToken] as string);
    return validUserId !== null && validUserId === ($[userId] as string);
  }),
  then: actions([MyConcept.myAction, { userId, ...params }]),
});

// 2. Auth Error Sync (auth fails → immediate error response)
export const MyActionAuthError: Sync = ({ request, sessionToken, userId, error }) => ({
  when: actions([Requesting.request, { path: "/...", sessionToken, userId }, { request }]),
  where: (frames) => frames.filter(($) => {
    const validUserId = validateSession($[sessionToken] as string);
    return validUserId === null || validUserId !== ($[userId] as string);
  }).map(($) => {
    const validUserId = validateSession($[sessionToken] as string);
    const errorMsg = validUserId === null 
      ? "Unauthorized: Invalid or missing session token"
      : "Forbidden: Session userId does not match requested userId";
    return { ...$, [error]: errorMsg };
  }),
  then: actions([Requesting.respond, { request, error }]),
});
```

**Why This Pattern:**
- Without auth error sync: Invalid requests timeout after 10 seconds (504 error)
- With auth error sync: Invalid requests get immediate error response
- Total syncs: 23 authenticated endpoints × 2 syncs = 46 authentication syncs

### 4.2 Error Handling Evolution

**Problem 1:** Errors thrown in `where` clauses broke sync engine
- **Solution:** Use frame filtering instead of throwing errors

**Problem 2:** Missing error response syncs caused 504 timeouts
- **Example:** `TrackScoring.ingestFromLibraryCache` could return `{ error: "..." }`, but only success response sync existed
- **Solution:** Add error response sync for EVERY concept action that can return errors

**Problem 3:** Spotify API failures broke entire library sync
- **Original:** `Promise.all([getSaved, getRecent, getPlaylists])` - any failure = total failure
- **Solution:** Individual try-catch blocks with graceful degradation
```typescript
let saved: SavedTrackItem[] = [];
try { saved = await getAllSavedTracks(...); }
catch (e) { console.warn("[PlatformLink] Failed to get saved tracks:", e.message); }
// Continue with empty array rather than failing completely
```

### 4.3 Performance Optimizations

**Requesting Passthrough Routes:**
- **Problem:** Every request going through sync engine adds latency
- **Solution:** Passthrough routes for read-only operations bypass syncs
- **Implementation:** 8 routes whitelisted for direct concept access
- **Result:** ~50-100ms faster response for preview/getTracks/etc.

**LibraryCache Sync Strategy:**
- **Problem:** Re-syncing entire Spotify library on every page load is slow
- **Solution:** Cache in MongoDB, only re-sync on user-initiated refresh
- **Trade-off:** Stale data possible, but acceptable for this use case

**Score Calculation:**
- **Problem:** Recalculating scores for 1000+ tracks on every swipe is expensive
- **Solution:** Pre-compute scores during ingestion, cache in Scores collection
- **Incremental Updates:** Only recalculate affected tracks when weights change

### 4.4 Multi-User Isolation

**Critical Bug Fixed:**
- **Problem:** All users were using hardcoded `userId: 'demo-user'`
- **Root Cause:** Frontend session initialization hardcoded userId, backend `completeAuth` didn't return userId
- **Solution:** 
  1. Backend: Return `userId` from `PlatformLink.completeAuth()`
  2. Frontend: Call `updateSession(link.userId)` after OAuth
- **Impact:** Each Spotify account now gets isolated data storage

## 5. Testing & Validation

### 5.1 Test Coverage

**Concept Tests (Unit):**
- PlatformLink: OAuth flow, token refresh, API integration
- LibraryCache: Data storage, retrieval, sync operations
- TrackScoring: Score calculation, weight updates, ingestion
- SwipeSessions: Deck generation, verdict tracking, completion
- PlaylistHealth: Staleness detection, recommendation generation

**Sync Tests (Integration):**
- Authentication syncs: Valid tokens succeed, invalid tokens fail immediately
- Error response syncs: Concept errors return immediately (no timeout)
- Dual-sync pattern: Both request and auth error syncs trigger correctly

**End-to-End Tests:**
- OAuth flow: startAuth → Spotify authorization → completeAuth → session updated
- Library sync: syncLibraryFromSpotify → LibraryCache populated → TrackScoring ingested
- Swipe session: Start → Swipe through deck → Keep/snooze actions recorded
- Multi-user: Different Spotify accounts get isolated data

### 5.2 Known Issues & Limitations

**Spotify API Deprecations:**
- Audio Features API deprecated Nov 2024
- Gracefully degrades: tempo/energy/valence fields return `null`
- Future fix: Use alternative recommendation API

**Spotify API 403 Errors on New Accounts:**
- Some new Spotify accounts return 403 Forbidden on library endpoints
- May be permissions issue or account setup delay
- Graceful fallback: Empty library data rather than crash

**Session Token Security:**
- Current implementation: Simple `"session:userId"` format
- **PRODUCTION TODO:** Use signed JWTs with expiration
- **PRODUCTION TODO:** Add refresh token flow for long-lived sessions

**Rate Limiting:**
- No rate limiting implemented (should add for production)
- Spotify API has rate limits we don't currently track
- Could cause 429 errors under heavy load

## 6. Deployment Architecture

### 6.1 Infrastructure

**Backend:**
- **Platform:** Render Web Service
- **URL:** `https://resurfacer-backend.onrender.com`
- **Runtime:** Deno 2.0
- **Database:** MongoDB Atlas (shared cluster)

**Frontend:**
- **Platform:** Render Static Site
- **URL:** `https://resurfacer.onrender.com`
- **Build:** Vite (Vue 3 + TypeScript)
- **CDN:** Render's edge network

**Environment Variables:**
```bash
# Backend (.env)
MONGODB_URL=mongodb+srv://...
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REDIRECT_URI=https://resurfacer.onrender.com/callback
REQUESTING_ALLOWED_DOMAIN=https://resurfacer.onrender.com
REQUESTING_TIMEOUT_MS=10000

# Frontend (.env)
VITE_API_BASE_URL=https://resurfacer-backend.onrender.com
```

### 6.2 CORS Configuration

**Challenge:** Frontend on different domain than backend
**Solution:** REQUESTING_ALLOWED_DOMAIN environment variable
**Implementation:** Requesting concept validates origin header on every request

### 6.3 Deployment Issues Encountered & Fixed

**Issue 1: Double `/api/` in URLs**
- **Symptom:** Requests going to `/api/api/PlatformLink/...`
- **Cause:** Frontend hardcoded `/api/` prefix + env var included `/api`
- **Fix:** Change `VITE_API_BASE_URL` to just domain (no `/api`)

**Issue 2: 504 Timeouts on Errors**
- **Symptom:** Any error response waited 10 seconds then timed out
- **Cause:** Missing error response syncs
- **Fix:** Added error response sync for every concept action that can fail

**Issue 3: Multi-User Data Mixing**
- **Symptom:** All users saw same demo-user's library
- **Cause:** `completeAuth` didn't return userId
- **Fix:** Return userId from backend, update session in frontend

## 7. Future Enhancements

### 7.1 Short-Term Improvements
- [ ] Add proper JWT-based authentication
- [ ] Implement refresh token flow for expired sessions
- [ ] Add rate limiting and request throttling
- [ ] Improve error messages and user feedback
- [ ] Add loading skeletons for better UX
- [ ] Implement playlist export (save kept tracks to new playlist)

### 7.2 Long-Term Vision
- [ ] Machine learning for better score prediction
- [ ] Social features: Share swipe sessions with friends
- [ ] Integration with other platforms (Apple Music, YouTube Music)
- [ ] Advanced filters: Mood-based sorting, genre filtering
- [ ] Listening history visualization (heatmaps, timelines)
- [ ] Collaborative playlists with voting

## 8. Conclusion

**Key Achievements:**
- ✅ Full-stack sync-based architecture with 5 core concepts
- ✅ Real Spotify OAuth integration with PKCE flow
- ✅ 23 authenticated endpoints with dual-sync authentication
- ✅ Multi-user isolation with session management
- ✅ Graceful error handling and API failure degradation
- ✅ Deployed to production (Render)

**Lessons Learned:**
- Sync engine requires careful error handling (dual-sync pattern essential)
- Real-world API integrations are messy (deprecations, rate limits, 403s)
- Frontend-backend separation requires thoughtful session management
- Testing with real users reveals issues local testing misses
- Production deployment is 50% of the work (CORS, env vars, debugging)

**Design Philosophy:**
- **Declarative over Imperative:** Syncs express "what" not "how"
- **Fail Gracefully:** Partial data > no data > crash
- **User Control:** Manual actions (start session, refresh) > automatic magic
- **Separation of Concerns:** Each concept does one thing well
