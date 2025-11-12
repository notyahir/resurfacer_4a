# Reflection on Resurfacer Development

## What Went Well

**Frontend Design & User Experience**
- Creating the visual design study, user journey, and walkthroughs was very interesting and provided valuable perspective on designing for users beyond myself, which required thinking about design choices beyond my personal aesthetics!
- Learning HTML, CSS, and how to work with a frontend was pretty cool and helpful! I thought it was fun playing the games too and it helped really stabilize the visual
parts of my apps

**Early Concept Design**
- The modular concept approach was honestly really helpful and provided clear structure for thinking about the application implementation.
- I actually really liked breaking down my problem into concepts: PlatformLink, LibraryCache, TrackScoring, PlaylistHealth, & SwipeSessions. It helped organize complexity but also is elegant that it can support additional concepts in the feature since there is no dependency.

### Skills acquired (not extensive)
- How to work with music streaming API such as Spotify
- OAuth 2.0 PKCE flow implementation
- Clean API error handling and fallback strategies
- Modular design

## What Was Hard

**Implementation Complexity**
- Concepts appeared SUPER simple on paper but required significantly more code, functions/actions, prompting, edge case handlng, and testing in practice
-   Simply put, the gap between conceptual design and "production" code was larger than anticipated
- Implementing syncs (I had like 46 syncs) was A LOT more intricate than expected

**External Dependencies**
- Spotify API deprecated critical features (Audio Features API) in November 2024, which... I didn't really know about. This ended up requiring significant workarounds
- CLEAN fallbacks became essential when expected data sources became unavailable such as Spotify syncing failing


### Further development
This application definitely has a lot of room to do so much more. 
- Since Spotify deprecated some of its features, I know I could definitely integrate my own music processing analysis functions to actually get useful music features for scoring.
- Extending and testing with other streaming platform API would be sick!

## LLM Usage 
- Context was super useful in creating concepts and the API spec! This was awesome and made things so much easier. I have never used Github Copilot/Cursor prior to the front-end so having something like Context to develop concepts was awesome
- Using Github Copilot for the front-end development was super nice and it was great being able to work alongside the LLM and smooth out any bugs it made in the HTML/CSS with the knowledge I learned
- Updating the backend, it came in handy in considering how certain concepts should be modified or what should be included/excluded

## What I Would Do Differently

**Upfront Validation**
- Assess third-party API stability and feature availability before committing to dependencies
- Create a feasibility prototype early to identify implementation complexity gaps

**Development Approach**
- Use Context earlier in the design phase to validate concept feasibility before full implementation
