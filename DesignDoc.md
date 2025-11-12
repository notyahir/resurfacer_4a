# Design Document - Resurfacer
## Project Overview
**Resurfacer** helps users rediscover forgotten tracks from their Spotify library. As your liked songs grow (mine has 2500+!), great tracks get buried. Resurfacer uses scoring and a swipe-based interface to resurface these hidden gems.

This document tracks backend progress across two major development phases of Assignment 4. There were tons of code updates and API rewrites :-( 

## Evolution from Assignment 2 (Concept Design)

**TrackScoring**: Calculates track "staleness" based on listening patterns  
- Simple scoring formula became a weighted system where users can customize how much weight to give to different factors (lastPlayedW, likedWhenW, timesSkippedW).

**SwipeSessions**: Tinder-esque interface for rediscovering tracks
- Changed from persistent sessions (that would save between app visits) to ephemeral sessions that start fresh each time.

**PlaylistHealth**: Analyzes playlist freshness
- Simplified this a lot from A2, now it just focuses on finding stale tracks rather than trying to be a comprehensive health checker
- Uses a two step snapshot + analysis pattern which helps with caching

**PlatformLink** - OAuth 2.0 integration with Spotify
- This wasn't in A2 because I was working with mock data. Adding real Spotify integration turned out to be WAY more work than expected since I had to handle token refresh, scope validation, and all those fun API deprecations!!!!!

## Some visual/front-end changes
**Session Management**
- Originally planned for sessions to auto-generate when you loaded the page, but that felt too pushy. Changed it to a manual "Start Session" button so users have control over when they want to dive into their music

**Error Handling & Fallbacks**
- Assumed everything would just work, but real Spotify API calls fail ALL THE TIME (So many forbidden 403 errors). Had to add comprehensive error states when debugging and a demo fallback mode so the app doesn't break when Spotify is having a bad day

### Technical Constraints from 4c
**Spotify API Deprecations Killed My Original Vision** (UGH!)
- Right when I started implementing 4b, I ended up running into a ton of different API forbdden calls. I did so much debugging and testing only to find out that Spotify deprecated their Audio Features API in November 2024. This was supposed to give me tempo, energy, and valence data for better scoring. I had to build a quick fallback so the app would work without those features, but it definitely limited what I could do.

**Rate Limits lol**
- Spotify's rate limits are INTENSEEEEE. I had to add batching and caching strategies that weren't in the original 4b design just to prevent hitting their limits. Their limits are harsh: 500 liked songs, 50 recently played, 25 playlists.

## Major Implementation Challenges

### OAuth Implementation (4b Phase 2)
Getting OAuth to work was A STRUGGLE! Had to coordinate closely with frontend for Spotify flow. Redirect URI caused issues—localhost no longer supported by Spotify so switched to `127.0.0.1:5173` for compatibility.

### Library Sync Complexity (4b Phase 2)
Fetching from multiple Spotify endpoints (saved tracks, recently played, playlists) and consolidating was SO difficult. Spotify's rate limits are harshhhhh. Many features deprecated, making original vision basically impossible without 3x the time to implement those deprecated features like music processing analysis.

### Scoring Algorithm Bug (4b Phase 2)
Staleness scores showed all old tracks as 100% stale. Found `ingestFromLibraryCache` was conflating "when liked" with "when last played." Fixed by prioritizing actual play history, falling back to like timestamps only when no play data exists.

### Multi-User Isolation Bug (4c Production)
This one was ANNOYING and brutal for last minute polishing. Deployed to production and discovered ALL users were stuck using the same 'demo-user' as their userId, so everyone was seeing the same tracks!

The debugging process took HOURS! The issue here wasn't necessarily bad coding but it was that I never tested with multiple real Spotify accounts until "production". Testing with just one user completely hid this isolation bug. Lesson learned!!

More changes for 4b found in [new_changes](new_changes.md) and a guided write up of 4c in [new_changes_4c](new_changes_4c.md).

## Future Extensions

If I had more time:
- Custom music analysis (build my own since Spotify deprecated theirs)
- Multi-platform support (Apple Music, YouTube Music)
- Playlist export directly to Spotify
- Social features (share rediscovered tracks)

## Conclusion

Resurfacer went from simple concept design to full-stack production app with real OAuth, API integration, and multi-user support. While WAY more complex than anticipated (46 syncs!), the modular concept architecture held up well. 

Hardest parts: Implementing the concepts to the vision I had them initially since I ran into issues with Spotify API limitations that involved deprecation of music analysis features but also made grabbing tracks pretty difficult. Working with the Spotify authentication system was also another beast! Working through these issues taught me important lessons about system design and testing early/ensuring features are feasible earlier on!

