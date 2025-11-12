# Traced Actions
## Second User
### This shows authentication works for a different user and is capable of grabbing tracks using the Spotify API.

Second user is first because the main user (me) has 2.5k songs and it clutters the entire console which could be handled better in the future, but hey, it is a good thing that it is working! Here is the output of the second user:

    [Requesting] Received request for path: /PlatformLink/listLinks
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912957282",
    userId: "temp-1762912957282",
    path: "/PlatformLink/listLinks"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912957282',
    userId: 'temp-1762912957282',
    path: '/PlatformLink/listLinks'
    } => { request: '019a75cc-f540-7877-8984-a852dfbc935f' }
    PlatformLink.listLinks { userId: 'temp-1762912957282' } => { links: [] }
    Requesting.respond { request: '019a75cc-f540-7877-8984-a852dfbc935f', links: [] } => { request: '019a75cc-f540-7877-8984-a852dfbc935f' }
    [Requesting] Received request for path: /PlatformLink/startAuth
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912957282",
    userId: "temp-1762912957282",
    platform: "spotify",
    scopes: [
        "user-library-read",
        "user-top-read",
        "user-read-recently-played",
        "playlist-read-private",
        "playlist-read-collaborative"
    ],
    redirectUri: "https://resurfacer.onrender.com/callback",
    path: "/PlatformLink/startAuth"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912957282',
    userId: 'temp-1762912957282',
    platform: 'spotify',
    scopes: [
        'user-library-read',
        'user-top-read',
        'user-read-recently-played',
        'playlist-read-private',
        'playlist-read-collaborative'
    ],
    redirectUri: 'https://resurfacer.onrender.com/callback',
    path: '/PlatformLink/startAuth'
    } => { request: '019a75cc-fced-7224-b790-138abca9ab40' }
    PlatformLink.startAuth {
    userId: 'temp-1762912957282',
    platform: 'spotify',
    scopes: [
        'user-library-read',
        'user-top-read',
        'user-read-recently-played',
        'playlist-read-private',
        'playlist-read-collaborative'
    ],
    redirectUri: 'https://resurfacer.onrender.com/callback'
    } => {
    authorizeUrl: 'https://accounts.spotify.com/authorize?client_id=f872e46d737f4cb1bc66450018d3968b&response_type=code&redirect_uri=https%3A%2F%2Fresurfacer.onrender.com%2Fcallback&state=Ut55SEOUYFWkvFlT2xuDRWLENAl1DDCrM4MC2Nboxth4cGje&scope=user-library-read+user-top-read+user-read-recently-played+playlist-read-private+playlist-read-collaborative&code_challenge_method=S256&code_challenge=Q-FRZFgF3whGp6hU3z4zxM4Q7JasSGAEbXZq3Wf2_M0',
    state: 'Ut55SEOUYFWkvFlT2xuDRWLENAl1DDCrM4MC2Nboxth4cGje',
    expiresAt: 1762913559862
    }
    Requesting.respond {
    request: '019a75cc-fced-7224-b790-138abca9ab40',
    authorizeUrl: 'https://accounts.spotify.com/authorize?client_id=f872e46d737f4cb1bc66450018d3968b&response_type=code&redirect_uri=https%3A%2F%2Fresurfacer.onrender.com%2Fcallback&state=Ut55SEOUYFWkvFlT2xuDRWLENAl1DDCrM4MC2Nboxth4cGje&scope=user-library-read+user-top-read+user-read-recently-played+playlist-read-private+playlist-read-collaborative&code_challenge_method=S256&code_challenge=Q-FRZFgF3whGp6hU3z4zxM4Q7JasSGAEbXZq3Wf2_M0',
    state: 'Ut55SEOUYFWkvFlT2xuDRWLENAl1DDCrM4MC2Nboxth4cGje',
    expiresAt: 1762913559862
    } => { request: '019a75cc-fced-7224-b790-138abca9ab40' }

    [Requesting] Received request for path: /PlatformLink/syncLibraryFromSpotify
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912957282",
    userId: "temp-1762912957282",
    path: "/PlatformLink/syncLibraryFromSpotify"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912957282',
    userId: 'temp-1762912957282',
    path: '/PlatformLink/syncLibraryFromSpotify'
    } => { request: '019a75cd-b8e6-7be4-9a16-6cef259df6a8' }

    [PlatformLink] Audio Features API unavailable (deprecated Nov 2024), continuing without features
    PlatformLink.syncLibraryFromSpotify { userId: 'temp-1762912957282' } => {
    synced: true,
    counts: { tracks: 13, likes: 13, plays: 0, playlists: 0 }
    }
    Requesting.respond {
    request: '019a75cd-b8e6-7be4-9a16-6cef259df6a8',
    synced: true,
    counts: { tracks: 13, likes: 13, plays: 0, playlists: 0 }
    } => { request: '019a75cd-b8e6-7be4-9a16-6cef259df6a8' }
    [Requesting] Received request for path: /TrackScoring/ingestFromLibraryCache
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912957282",
    userId: "temp-1762912957282",
    path: "/TrackScoring/ingestFromLibraryCache"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912957282',
    userId: 'temp-1762912957282',
    path: '/TrackScoring/ingestFromLibraryCache'
    } => { request: '019a75cd-bf26-78e3-867a-99ef4a04d27a' }
    TrackScoring.ingestFromLibraryCache { userId: 'temp-1762912957282' } => { ingested: 13, ensuredWeights: true }
    Requesting.respond {
    request: '019a75cd-bf26-78e3-867a-99ef4a04d27a',
    ingested: 13,
    ensuredWeights: true
    } => { request: '019a75cd-bf26-78e3-867a-99ef4a04d27a' }
    LibraryCache.getLiked {
    sessionToken: 'session:temp-1762912957282',
    userId: 'temp-1762912957282'
    } => {
    trackIds: [
        'spotify:track:4ymD0FxX1fnWszSu9rMAtD',
        'spotify:track:75iJMOH4oBobiRiBJVdw2m',
        'spotify:track:2xql0pid3EUwW38AsywxhV',
        'spotify:track:3BQbwXb8lMLLRBeLl6HTu8',
        'spotify:track:7zwn1eykZtZ5LODrf7c0tS',
        'spotify:track:1zkXUXNHpYQTcXZAaZbeEp',
        'spotify:track:6wbbeA1FcbqXiJs7aIA8x7',
        'spotify:track:2wXioTynVwrEWYRv6R6vEj',
        'spotify:track:2K7xn816oNHJZ0aVqdQsha',
        'spotify:track:6TA5aymvVrtiPVbuAwmPIc',
        'spotify:track:4Cdb1dE3pfiWlqnAIcImyQ',
        'spotify:track:2DBxhQbwnuXDioUVdL33S2',
        'spotify:track:7inCfDM4S3xsVzgOUqSJOH'
    ]
    }
    [Requesting] Received request for path: /PlaylistHealth/snapshot
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912957282",
    userId: "temp-1762912957282",
    playlistId: "liked:temp-1762912957282",
    trackIds: [
        "spotify:track:4ymD0FxX1fnWszSu9rMAtD",
        "spotify:track:75iJMOH4oBobiRiBJVdw2m",
        "spotify:track:2xql0pid3EUwW38AsywxhV",
        "spotify:track:3BQbwXb8lMLLRBeLl6HTu8",
        "spotify:track:7zwn1eykZtZ5LODrf7c0tS",
        "spotify:track:1zkXUXNHpYQTcXZAaZbeEp",
        "spotify:track:6wbbeA1FcbqXiJs7aIA8x7",
        "spotify:track:2wXioTynVwrEWYRv6R6vEj",
        "spotify:track:2K7xn816oNHJZ0aVqdQsha",
        "spotify:track:6TA5aymvVrtiPVbuAwmPIc",
        "spotify:track:4Cdb1dE3pfiWlqnAIcImyQ",
        "spotify:track:2DBxhQbwnuXDioUVdL33S2",
        "spotify:track:7inCfDM4S3xsVzgOUqSJOH"
    ],
    path: "/PlaylistHealth/snapshot"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912957282',
    userId: 'temp-1762912957282',
    playlistId: 'liked:temp-1762912957282',
    trackIds: [
        'spotify:track:4ymD0FxX1fnWszSu9rMAtD',
        'spotify:track:75iJMOH4oBobiRiBJVdw2m',
        'spotify:track:2xql0pid3EUwW38AsywxhV',
        'spotify:track:3BQbwXb8lMLLRBeLl6HTu8',
        'spotify:track:7zwn1eykZtZ5LODrf7c0tS',
        'spotify:track:1zkXUXNHpYQTcXZAaZbeEp',
        'spotify:track:6wbbeA1FcbqXiJs7aIA8x7',
        'spotify:track:2wXioTynVwrEWYRv6R6vEj',
        'spotify:track:2K7xn816oNHJZ0aVqdQsha',
        'spotify:track:6TA5aymvVrtiPVbuAwmPIc',
        'spotify:track:4Cdb1dE3pfiWlqnAIcImyQ',
        'spotify:track:2DBxhQbwnuXDioUVdL33S2',
        'spotify:track:7inCfDM4S3xsVzgOUqSJOH'
    ],
    path: '/PlaylistHealth/snapshot'
    } => { request: '019a75cd-c301-7860-9023-876fc561fe5c' }
    PlaylistHealth.snapshot {
    playlistId: 'liked:temp-1762912957282',
    userId: 'temp-1762912957282',
    trackIds: [
        'spotify:track:4ymD0FxX1fnWszSu9rMAtD',
        'spotify:track:75iJMOH4oBobiRiBJVdw2m',
        'spotify:track:2xql0pid3EUwW38AsywxhV',
        'spotify:track:3BQbwXb8lMLLRBeLl6HTu8',
        'spotify:track:7zwn1eykZtZ5LODrf7c0tS',
        'spotify:track:1zkXUXNHpYQTcXZAaZbeEp',
        'spotify:track:6wbbeA1FcbqXiJs7aIA8x7',
        'spotify:track:2wXioTynVwrEWYRv6R6vEj',
        'spotify:track:2K7xn816oNHJZ0aVqdQsha',
        'spotify:track:6TA5aymvVrtiPVbuAwmPIc',
        'spotify:track:4Cdb1dE3pfiWlqnAIcImyQ',
        'spotify:track:2DBxhQbwnuXDioUVdL33S2',
        'spotify:track:7inCfDM4S3xsVzgOUqSJOH'
    ]
    } => { snapshotId: '019a75cd-c346-77a3-af1d-ce7392e3b9bd' }
    Requesting.respond {
    request: '019a75cd-c301-7860-9023-876fc561fe5c',
    snapshotId: '019a75cd-c346-77a3-af1d-ce7392e3b9bd'
    } => { request: '019a75cd-c301-7860-9023-876fc561fe5c' }
    TrackScoring.preview {
    sessionToken: 'session:temp-1762912957282',
    userId: 'temp-1762912957282',
    size: 500
    } => {
    trackIds: [
        'spotify:track:7inCfDM4S3xsVzgOUqSJOH',
        'spotify:track:2DBxhQbwnuXDioUVdL33S2',
        'spotify:track:4Cdb1dE3pfiWlqnAIcImyQ',
        'spotify:track:2K7xn816oNHJZ0aVqdQsha',
        'spotify:track:6TA5aymvVrtiPVbuAwmPIc',
        'spotify:track:2wXioTynVwrEWYRv6R6vEj',
        'spotify:track:1zkXUXNHpYQTcXZAaZbeEp',
        'spotify:track:6wbbeA1FcbqXiJs7aIA8x7',
        'spotify:track:7zwn1eykZtZ5LODrf7c0tS',
        'spotify:track:2xql0pid3EUwW38AsywxhV',
        'spotify:track:3BQbwXb8lMLLRBeLl6HTu8',
        'spotify:track:75iJMOH4oBobiRiBJVdw2m',
        'spotify:track:4ymD0FxX1fnWszSu9rMAtD'
    ],
    tracks: [
        {
        trackId: 'spotify:track:7inCfDM4S3xsVzgOUqSJOH',
        lastPlayedAt: 1762904561000,
        score: 12
        },
        {
        trackId: 'spotify:track:2DBxhQbwnuXDioUVdL33S2',
        lastPlayedAt: 1762904562000,
        score: 12
        },
        {
        trackId: 'spotify:track:4Cdb1dE3pfiWlqnAIcImyQ',
        lastPlayedAt: 1762904563000,
        score: 12
        },
        {
        trackId: 'spotify:track:2K7xn816oNHJZ0aVqdQsha',
        lastPlayedAt: 1762904565000,
        score: 12
        },
        {
        trackId: 'spotify:track:6TA5aymvVrtiPVbuAwmPIc',
        lastPlayedAt: 1762904565000,
        score: 12
        },
        {
        trackId: 'spotify:track:2wXioTynVwrEWYRv6R6vEj',
        lastPlayedAt: 1762904567000,
        score: 12
        },
        {
        trackId: 'spotify:track:1zkXUXNHpYQTcXZAaZbeEp',
        lastPlayedAt: 1762904568000,
        score: 12
        },
        {
        trackId: 'spotify:track:6wbbeA1FcbqXiJs7aIA8x7',
        lastPlayedAt: 1762904568000,
        score: 12
        },
        {
        trackId: 'spotify:track:7zwn1eykZtZ5LODrf7c0tS',
        lastPlayedAt: 1762904569000,
        score: 12
        },
        {
        trackId: 'spotify:track:2xql0pid3EUwW38AsywxhV',
        lastPlayedAt: 1762904570000,
        score: 12
        },
        {
        trackId: 'spotify:track:3BQbwXb8lMLLRBeLl6HTu8',
        lastPlayedAt: 1762904570000,
        score: 12
        },
        {
        trackId: 'spotify:track:75iJMOH4oBobiRiBJVdw2m',
        lastPlayedAt: 1762904572000,
        score: 12
        },
        {
        trackId: 'spotify:track:4ymD0FxX1fnWszSu9rMAtD',
        lastPlayedAt: 1762904573000,
        score: 12
        }
    ],
    source: 'bootstrap'
    }
    [Requesting] Received request for path: /PlaylistHealth/analyze
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912957282",
    playlistId: "liked:temp-1762912957282",
    snapshotId: "019a75cd-c346-77a3-af1d-ce7392e3b9bd",
    path: "/PlaylistHealth/analyze"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912957282',
    playlistId: 'liked:temp-1762912957282',
    snapshotId: '019a75cd-c346-77a3-af1d-ce7392e3b9bd',
    path: '/PlaylistHealth/analyze'
    } => { request: '019a75cd-c4ab-7d7b-8d61-cae2021ed24f' }
    PlaylistHealth.analyze {
    playlistId: 'liked:temp-1762912957282',
    snapshotId: '019a75cd-c346-77a3-af1d-ce7392e3b9bd'
    } => { reportId: '019a75cd-c531-75aa-acc7-056059251328' }
    Requesting.respond {
    request: '019a75cd-c4ab-7d7b-8d61-cae2021ed24f',
    reportId: '019a75cd-c531-75aa-acc7-056059251328'
    } => { request: '019a75cd-c4ab-7d7b-8d61-cae2021ed24f' }
    PlaylistHealth.getReport {
    sessionToken: 'session:temp-1762912957282',
    userId: 'temp-1762912957282',
    reportId: '019a75cd-c531-75aa-acc7-056059251328'
    } => {
    playlistId: 'liked:temp-1762912957282',
    snapshotId: '019a75cd-c346-77a3-af1d-ce7392e3b9bd',
    findings: [
        {
        idx: 6,
        trackId: 'spotify:track:6wbbeA1FcbqXiJs7aIA8x7',
        kind: 'Outlier'
        }
    ]
    }
    LibraryCache.getTracks {
    sessionToken: 'session:temp-1762912957282',
    userId: 'temp-1762912957282',
    trackIds: [
        'spotify:track:7inCfDM4S3xsVzgOUqSJOH',
        'spotify:track:2DBxhQbwnuXDioUVdL33S2',
        'spotify:track:4Cdb1dE3pfiWlqnAIcImyQ',
        'spotify:track:2K7xn816oNHJZ0aVqdQsha',
        'spotify:track:6TA5aymvVrtiPVbuAwmPIc',
        'spotify:track:2wXioTynVwrEWYRv6R6vEj',
        'spotify:track:1zkXUXNHpYQTcXZAaZbeEp',
        'spotify:track:6wbbeA1FcbqXiJs7aIA8x7',
        'spotify:track:7zwn1eykZtZ5LODrf7c0tS',
        'spotify:track:2xql0pid3EUwW38AsywxhV',
        'spotify:track:3BQbwXb8lMLLRBeLl6HTu8',
        'spotify:track:75iJMOH4oBobiRiBJVdw2m',
        'spotify:track:4ymD0FxX1fnWszSu9rMAtD'
    ]
    } => {
    tracks: [
        {
        trackId: 'spotify:track:1zkXUXNHpYQTcXZAaZbeEp',
        title: 'Roll Call',
        artist: 'The Neighbourhood',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:2DBxhQbwnuXDioUVdL33S2',
        title: 'Kill Us All (feat. Denzel Curry)',
        artist: 'The Neighbourhood, Denzel Curry',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:2K7xn816oNHJZ0aVqdQsha',
        title: 'Softcore',
        artist: 'The Neighbourhood',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:2wXioTynVwrEWYRv6R6vEj',
        title: 'Void',
        artist: 'The Neighbourhood',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:2xql0pid3EUwW38AsywxhV',
        title: 'Reflections',
        artist: 'The Neighbourhood',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:3BQbwXb8lMLLRBeLl6HTu8',
        title: 'Blue',
        artist: 'The Neighbourhood',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:4Cdb1dE3pfiWlqnAIcImyQ',
        title: '24/7',
        artist: 'The Neighbourhood',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:4ymD0FxX1fnWszSu9rMAtD',
        title: 'Beat Take 1 (feat. Ghostface Killah)',
        artist: 'The Neighbourhood, Ghostface Killah',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:6TA5aymvVrtiPVbuAwmPIc',
        title: 'Scary Love',
        artist: 'The Neighbourhood',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:6wbbeA1FcbqXiJs7aIA8x7',
        title: "Livin' In a Dream (feat. Nipsey Hussle)",
        artist: 'The Neighbourhood, Nipsey Hussle',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:75iJMOH4oBobiRiBJVdw2m',
        title: 'Paradise',
        artist: 'The Neighbourhood',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:7inCfDM4S3xsVzgOUqSJOH',
        title: 'Dust',
        artist: 'The Neighbourhood',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:7zwn1eykZtZ5LODrf7c0tS',
        title: 'You Get Me So High',
        artist: 'The Neighbourhood',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        }
    ]
    }
    LibraryCache.getTracks {
    sessionToken: 'session:temp-1762912957282',
    userId: 'temp-1762912957282',
    trackIds: [ 'spotify:track:6wbbeA1FcbqXiJs7aIA8x7' ]
    } => {
    tracks: [
        {
        trackId: 'spotify:track:6wbbeA1FcbqXiJs7aIA8x7',
        title: "Livin' In a Dream (feat. Nipsey Hussle)",
        artist: 'The Neighbourhood, Nipsey Hussle',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        }
    ]
    }

## Main User

First user output:

    [Requesting] Received request for path: /PlatformLink/startAuth
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912312498",
    userId: "temp-1762912312498",
    platform: "spotify",
    scopes: [
        "user-library-read",
        "user-top-read",
        "user-read-recently-played",
        "playlist-read-private",
        "playlist-read-collaborative"
    ],
    redirectUri: "https://resurfacer.onrender.com/callback",
    path: "/PlatformLink/startAuth"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912312498',
    userId: 'temp-1762912312498',
    platform: 'spotify',
    scopes: [
        'user-library-read',
        'user-top-read',
        'user-read-recently-played',
        'playlist-read-private',
        'playlist-read-collaborative'
    ],
    redirectUri: 'https://resurfacer.onrender.com/callback',
    path: '/PlatformLink/startAuth'
    } => { request: '019a75cf-96ba-7e07-aa04-b718f7fe67df' }
    PlatformLink.startAuth {
    userId: 'temp-1762912312498',
    platform: 'spotify',
    scopes: [
        'user-library-read',
        'user-top-read',
        'user-read-recently-played',
        'playlist-read-private',
        'playlist-read-collaborative'
    ],
    redirectUri: 'https://resurfacer.onrender.com/callback'
    } => {
    authorizeUrl: 'https://accounts.spotify.com/authorize?client_id=f872e46d737f4cb1bc66450018d3968b&response_type=code&redirect_uri=https%3A%2F%2Fresurfacer.onrender.com%2Fcallback&state=3cDTQlkzTiyj8N3d5bWO3mtKlGpzF1PM8euc9H2wzInyjSXp&scope=user-library-read+user-top-read+user-read-recently-played+playlist-read-private+playlist-read-collaborative&code_challenge_method=S256&code_challenge=KFpar3SPlV45s2O9RloMcp1ShkL-IoSkoS14eYS-c_c',
    state: '3cDTQlkzTiyj8N3d5bWO3mtKlGpzF1PM8euc9H2wzInyjSXp',
    expiresAt: 1762913730314
    }
    Requesting.respond {
    request: '019a75cf-96ba-7e07-aa04-b718f7fe67df',
    authorizeUrl: 'https://accounts.spotify.com/authorize?client_id=f872e46d737f4cb1bc66450018d3968b&response_type=code&redirect_uri=https%3A%2F%2Fresurfacer.onrender.com%2Fcallback&state=3cDTQlkzTiyj8N3d5bWO3mtKlGpzF1PM8euc9H2wzInyjSXp&scope=user-library-read+user-top-read+user-read-recently-played+playlist-read-private+playlist-read-collaborative&code_challenge_method=S256&code_challenge=KFpar3SPlV45s2O9RloMcp1ShkL-IoSkoS14eYS-c_c',
    state: '3cDTQlkzTiyj8N3d5bWO3mtKlGpzF1PM8euc9H2wzInyjSXp',
    expiresAt: 1762913730314
    } => { request: '019a75cf-96ba-7e07-aa04-b718f7fe67df' }

    [Requesting] Received request for path: /PlatformLink/completeAuth
    [Requesting] Full inputs: {
    state: "3cDTQlkzTiyj8N3d5bWO3mtKlGpzF1PM8euc9H2wzInyjSXp",
    code: "AQBfBAticMPwOhEpXa5KOKDgWOCCI7ZMNXm-5pST1BQ-T5NnTrEv0cINmrNAZi8sx20Y-BrsEEdeY6KqJbgjx3DV58v9GqPjoc5UX0uI2sVviNsdAVRanGFOUUkNnxkLJQjk8f-6k80oWBJXyySrBAw8fLUmALe1kSDS8czOn6SsxKMuYPEYc4uKucRIqdSxK9xiOScL7r0j0ptx1J430JsUynSeQz2uTOVBgs3W2_lcXCy8cBM9NgJZceOtYIDXziKBWP5GbCILHO4nnFdFmbWWMTPW4ALOsll-Rv4tTbezPyDXE2475ineQiZRglC_vVcbNCg_kki7kSczFI2Or56p-NSoI_xUcWlEt5GmsG4Bzkcn6AdUSc5vz4DuwrHjKfnORPjqvJk7QGjy-R8k1w",
    path: "/PlatformLink/completeAuth"
    }
    Requesting.request {
    state: '3cDTQlkzTiyj8N3d5bWO3mtKlGpzF1PM8euc9H2wzInyjSXp',
    code: 'AQBfBAticMPwOhEpXa5KOKDgWOCCI7ZMNXm-5pST1BQ-T5NnTrEv0cINmrNAZi8sx20Y-BrsEEdeY6KqJbgjx3DV58v9GqPjoc5UX0uI2sVviNsdAVRanGFOUUkNnxkLJQjk8f-6k80oWBJXyySrBAw8fLUmALe1kSDS8czOn6SsxKMuYPEYc4uKucRIqdSxK9xiOScL7r0j0ptx1J430JsUynSeQz2uTOVBgs3W2_lcXCy8cBM9NgJZceOtYIDXziKBWP5GbCILHO4nnFdFmbWWMTPW4ALOsll-Rv4tTbezPyDXE2475ineQiZRglC_vVcbNCg_kki7kSczFI2Or56p-NSoI_xUcWlEt5GmsG4Bzkcn6AdUSc5vz4DuwrHjKfnORPjqvJk7QGjy-R8k1w',
    path: '/PlatformLink/completeAuth'
    } => { request: '019a75d0-2318-7f17-8a6f-424845fa0080' }
    PlatformLink.completeAuth {
    state: '3cDTQlkzTiyj8N3d5bWO3mtKlGpzF1PM8euc9H2wzInyjSXp',
    code: 'AQBfBAticMPwOhEpXa5KOKDgWOCCI7ZMNXm-5pST1BQ-T5NnTrEv0cINmrNAZi8sx20Y-BrsEEdeY6KqJbgjx3DV58v9GqPjoc5UX0uI2sVviNsdAVRanGFOUUkNnxkLJQjk8f-6k80oWBJXyySrBAw8fLUmALe1kSDS8czOn6SsxKMuYPEYc4uKucRIqdSxK9xiOScL7r0j0ptx1J430JsUynSeQz2uTOVBgs3W2_lcXCy8cBM9NgJZceOtYIDXziKBWP5GbCILHO4nnFdFmbWWMTPW4ALOsll-Rv4tTbezPyDXE2475ineQiZRglC_vVcbNCg_kki7kSczFI2Or56p-NSoI_xUcWlEt5GmsG4Bzkcn6AdUSc5vz4DuwrHjKfnORPjqvJk7QGjy-R8k1w'
    } => {
    linkId: '019a75d0-245d-786d-9e97-de4043238b27',
    userId: 'temp-1762912312498',
    platform: 'spotify',
    tokenExpiration: 1762916706366,
    scopes: [
        'playlist-read-private',
        'playlist-read-collaborative',
        'user-library-read',
        'user-read-recently-played',
        'user-top-read'
    ]
    }
    Requesting.respond {
    request: '019a75d0-2318-7f17-8a6f-424845fa0080',
    linkId: '019a75d0-245d-786d-9e97-de4043238b27',
    userId: 'temp-1762912312498',
    platform: 'spotify',
    tokenExpiration: 1762916706366,
    scopes: [
        'playlist-read-private',
        'playlist-read-collaborative',
        'user-library-read',
        'user-read-recently-played',
        'user-top-read'
    ]
    } => { request: '019a75d0-2318-7f17-8a6f-424845fa0080' }
    [Requesting] Received request for path: /PlatformLink/listLinks
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912312498",
    userId: "temp-1762912312498",
    path: "/PlatformLink/listLinks"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912312498',
    userId: 'temp-1762912312498',
    path: '/PlatformLink/listLinks'
    } => { request: '019a75d0-2602-71ea-af51-c97577b6127e' }
    PlatformLink.listLinks { userId: 'temp-1762912312498' } => {
    links: [
        {
        linkId: '019a75d0-245d-786d-9e97-de4043238b27',
        platform: 'spotify',
        tokenExpiration: 1762916706366,
        scopes: [Array],
        lastAuthorizedAt: 1762913166366
        }
    ]
    }
    Requesting.respond {
    request: '019a75d0-2602-71ea-af51-c97577b6127e',
    links: [
        {
        linkId: '019a75d0-245d-786d-9e97-de4043238b27',
        platform: 'spotify',
        tokenExpiration: 1762916706366,
        scopes: [Array],
        lastAuthorizedAt: 1762913166366
        }
    ]
    } => { request: '019a75d0-2602-71ea-af51-c97577b6127e' }
    [Requesting] Received request for path: /PlatformLink/syncLibraryFromSpotify
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912312498",
    userId: "temp-1762912312498",
    path: "/PlatformLink/syncLibraryFromSpotify"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912312498',
    userId: 'temp-1762912312498',
    path: '/PlatformLink/syncLibraryFromSpotify'
    } => { request: '019a75d0-27bb-720d-b25f-8fe90ee086c2' }

    [PlatformLink] Audio Features API unavailable (deprecated Nov 2024), continuing without features
    PlatformLink.syncLibraryFromSpotify { userId: 'temp-1762912312498' } => {
    error: 'E11000 duplicate key error collection: ClusterRV0.LibraryCache.playlists index: _id_ dup key: { _id: "spotify:playlist:1VriY9yKPo8348ToiaQyYc" }'
    }
    Requesting.respond {
    request: '019a75d0-27bb-720d-b25f-8fe90ee086c2',
    error: 'E11000 duplicate key error collection: ClusterRV0.LibraryCache.playlists index: _id_ dup key: { _id: "spotify:playlist:1VriY9yKPo8348ToiaQyYc" }'
    } => { request: '019a75d0-27bb-720d-b25f-8fe90ee086c2' }
    [Requesting] Received request for path: /TrackScoring/ingestFromLibraryCache
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912312498",
    userId: "temp-1762912312498",
    path: "/TrackScoring/ingestFromLibraryCache"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912312498',
    userId: 'temp-1762912312498',
    path: '/TrackScoring/ingestFromLibraryCache'
    } => { request: '019a75d0-6e1e-7b6a-bf36-aabc4d507053' }
    TrackScoring.ingestFromLibraryCache { userId: 'temp-1762912312498' } => { ingested: 500, ensuredWeights: false }
    Requesting.respond {
    request: '019a75d0-6e1e-7b6a-bf36-aabc4d507053',
    ingested: 500,
    ensuredWeights: false
    } => { request: '019a75d0-6e1e-7b6a-bf36-aabc4d507053' }
    LibraryCache.getLiked {
    sessionToken: 'session:temp-1762912312498',
    userId: 'temp-1762912312498'
    } => {
    trackIds: [
        'spotify:track:3BIf974vl0lIEo3EY1XvD1',
        'spotify:track:6nlA47UV0BoOcFlPmUVCzY',
        'spotify:track:3i2EosJO51CRWzwUtb5xL5',
        'spotify:track:0FZudqJD6BHgy6ZQgtAA8p',
        'spotify:track:1W3oSYAjCFHNgFpmQAb7i1',
        'spotify:track:1vgFHoxGDoXzrpSnOI0RWY',
        'spotify:track:4fNfxPVjg1tSkvhd6wFX3k',
        'spotify:track:5qygbDXJ98ex13tP94WMxF',
        'spotify:track:5inqbGqSc2i7iBOrgOlIaA',
        'spotify:track:1nzuxI1V5mXGylN4Kvcoy6',
        'spotify:track:5UpeJ6WZJdbX2ucwsYIRua',
        'spotify:track:5tG9KCkEnWc75cREtb4ffB',
        'spotify:track:1MrSbSu9UNo7Aucwrf32WJ',
        'spotify:track:0iYMs1WihZBLEhQFiFbtkh',
        'spotify:track:76v8yYCzBkuv7efXLQTU5A',
        'spotify:track:712mHItgQNT9VSMLmNoM5y',
        'spotify:track:2bV5EJ8UpgpEq5mOaVJ9lt',
        'spotify:track:4ACs7pxDMiMbgBSC2xTdJS',
        'spotify:track:6N4bA5VmWdgNDuHyqGgWnU',
        'spotify:track:2pwk3aSUyE602tthh8Dxw3',
        'spotify:track:4V6GNeAV0Fz7bjjZydoeWV',
        'spotify:track:1SiTJWmO416vuOw3nUl1jw',
        'spotify:track:3vHDpXZiNmcOIDdyWzKNUm',
        'spotify:track:4u0DoPznclokUxTm9s6VJs',
        'spotify:track:4jnFqNWeJCeCRHc4HCdxfd',
        'spotify:track:35YlMiY002IqF3XrqZ0O2d',
        'spotify:track:7HNVTbfyLcwDskK0Rp2ZZ6',
        'spotify:track:2aThMnWpZS5MxB98740WcS',
        'spotify:track:4a9axdtH9qFx0nMiKjwChd',
        'spotify:track:1kaCCZoEljyOfNDXq4YqfY',
        'spotify:track:2LGza1aF9jcAKGqCJAgSBL',
        'spotify:track:1Clcv7tRrcpxWVMdieibkd',
        'spotify:track:5t2YCndohBmO0SKgiYqwt9',
        'spotify:track:2JNfB0GUiq2lnhurSqPdrb',
        'spotify:track:0ha7Pj6IrFFzrwOHl2uD31',
        'spotify:track:0jusmtq0ujs5erCM4JvRS7',
        'spotify:track:6YoMrhmFK1x3qdDrpCMNtp',
        'spotify:track:6atptFSO0uK34oWZB9sevI',
        'spotify:track:6IAuH3hgTRpUUdmOGubXGS',
        'spotify:track:2ojVBeQ5Zv3xTB0TYciwbU',
        'spotify:track:03ou4i9pkjF38ku9rDKx6H',
        'spotify:track:1ohvvpAVuay6BM7UHfk6kS',
        'spotify:track:0jhgOpwjx6TgKmiUkuV3ba',
        'spotify:track:4whkhyXTrTgHKZzkUvdwoq',
        'spotify:track:2s0skXthOtkbPfyiwBf7a0',
        'spotify:track:3a3dQOO19moXPeTt2PomoT',
        'spotify:track:52wlhIULOeaxZpzuTYrVlt',
        'spotify:track:3Ox7FJrgNNBfctIGPgj40s',
        'spotify:track:7BY2h0RUgeenWrnbwPr0Kt',
        'spotify:track:0tkJrvooVHw5r7MrUaCWjh',
        'spotify:track:0QyJXG36Q3Kta662XS8GhY',
        'spotify:track:2tdDlP8w9wFp7m41KimBf1',
        'spotify:track:3detfCDz7x2G34sKD1XzA6',
        'spotify:track:2wgiJddOedrZCNyeV1vBuF',
        'spotify:track:1735xgk2J8CHCGY2LS1HM6',
        'spotify:track:259op6g3A12uwePehZntdk',
        'spotify:track:4zMbUp4WDZxVeEeBpdgtH4',
        'spotify:track:47rCs1JJXC6AG20WKbyOUR',
        'spotify:track:2OZVskV28xxJjjhQqKTLSg',
        'spotify:track:3Vd4fHzwS6pBS3muymjiDi',
        'spotify:track:6sGIMrtIzQjdzNndVxe397',
        'spotify:track:5AKfkVoqjbksuQ7OBcK7eo',
        'spotify:track:6e6ngB70V7X4NFGP7vN1ic',
        'spotify:track:29ZBUEAIGJUfutb7YCkOiO',
        'spotify:track:3gnWvEHvlaNb3DecldAs33',
        'spotify:track:2uWyRgo5ILEKxozm92t2ob',
        'spotify:track:0Z8Deaa7KsxIqWOEWoTFo1',
        'spotify:track:7xzqgS9xNlvZi2AZvGBa7m',
        'spotify:track:6F8R48yp2MwKOCONQgEMzw',
        'spotify:track:6WnWNaP97gqu4Zr1bPZeE7',
        'spotify:track:3Pafvx9caYw7m4e0lyWgBl',
        'spotify:track:7bvkBpcJnYHCuiyoDk9t3l',
        'spotify:track:0jr6tT2vc4cIFPHb6wufG3',
        'spotify:track:0PWtb8aCf6vVudatSVUSst',
        'spotify:track:7ms6jXUWNRbmZzTBlJwZef',
        'spotify:track:0jXiHFeSflfTiQtezpFMwn',
        'spotify:track:5mSoqzA0VoYLfXZ1FDo36S',
        'spotify:track:3R8IbTKkaFHqK2AE1CJmQu',
        'spotify:track:2HsRSiAFubcJaeQJ9pttC9',
        'spotify:track:278ppB9nzHsAAazgjAT313',
        'spotify:track:43jjp5s4gbwoCmBQQczKbo',
        'spotify:track:7IerUPqxU6Fp69S9UDCOQm',
        'spotify:track:709ZIqPHyFOpx2QdjmeWAM',
        'spotify:track:3KH7W2zKlPHeLc2dS9UQe4',
        'spotify:track:5Pxw4MqAFpXufdGhnAmYgI',
        'spotify:track:1dyA1Re4QEQQWGDDT7h9TK',
        'spotify:track:128I36bDgYHU9l2QcgEGcd',
        'spotify:track:3Q3kB5uskRw5o1ffwFO3G0',
        'spotify:track:45QBDwd7BCdqCpxSj4N9tm',
        'spotify:track:7C2uY2KCfOW3PzCCfWDERA',
        'spotify:track:119MQfBVx1XVcB4q9PlnJW',
        'spotify:track:5RHhmGMV3FKxRa63AIfIgZ',
        'spotify:track:3dSZcr7SWwFdOmY0r3Ryih',
        'spotify:track:7dfjkwagedO9FLbjUXRAZE',
        'spotify:track:3WL8kYh2pIdT0C0h2drfPf',
        'spotify:track:0RyekuZ6N0SkpokVwkVnbg',
        'spotify:track:6KafcmIAnIcYOA1Qppfurb',
        'spotify:track:02A70z86yAU41b21L516v7',
        'spotify:track:77lKjGkhvWuimTzQxA4STK',
        'spotify:track:2K6Nk2bR9xPE39EY9mARVa',
        ... 400 more items
    ]
    }
    [Requesting] Received request for path: /PlaylistHealth/snapshot
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912312498",
    userId: "temp-1762912312498",
    playlistId: "liked:temp-1762912312498",
    trackIds: [
        "spotify:track:4fNfxPVjg1tSkvhd6wFX3k",
        "spotify:track:78HEzDEs1QUnHB2DbxgC1s",
        "spotify:track:77lKjGkhvWuimTzQxA4STK",
        "spotify:track:4u0DoPznclokUxTm9s6VJs",
        "spotify:track:4A48ckONJNoXU5smWT9CeG",
        "spotify:track:1ztPf79mbGpktO7TjB7tWW",
        "spotify:track:7GkZ2cx7i74zu1piQy3i6T",
        "spotify:track:0nifVdzF4R6WT2qITFJKeu",
        "spotify:track:7tHr0ZuignrPodrXZWhcJc",
        "spotify:track:5a3bAmljP7mXiOyovGJeJ7",
        "spotify:track:0Qp66EJS2DalnLkRKmu7mX",
        "spotify:track:1Ms8SsQJiTJ3zEMosUWkUR",
        "spotify:track:1CqcGbXZrpJJygqUM8PW05",
        "spotify:track:5RnT0WKKGAt6eOmd7SQRJ6",
        "spotify:track:3PU3neC9XmWz7ZjUn5rYIw",
        "spotify:track:35RSbRERNm6g8ba2wXx8AN",
        "spotify:track:057rZ21MDp8Ld0TgQndNcv",
        "spotify:track:7wpWeXk1PrTI6MyNGA4fHC",
        "spotify:track:4a9axdtH9qFx0nMiKjwChd",
        "spotify:track:4V6GNeAV0Fz7bjjZydoeWV",
        "spotify:track:4gtIYSYu8u2ItBqrhCaChL",
        "spotify:track:6PKoUpo9sis5LWkMXSck6f",
        "spotify:track:7BgyWwbbybJr2IbQoI1gzH",
        "spotify:track:1735xgk2J8CHCGY2LS1HM6",
        "spotify:track:6lRJqlbbsSAyoN67hVsF8A",
        "spotify:track:2ao4kVf8DsGghi3mUGaVEr",
        "spotify:track:6nlA47UV0BoOcFlPmUVCzY",
        "spotify:track:5P6ByN1elQzHH66vKlAB9a",
        "spotify:track:3P7Ul4isMJgb33TGqZ09W5",
        "spotify:track:2tdDlP8w9wFp7m41KimBf1",
        "spotify:track:0sTBOp1hdayTjw6UOyPyi6",
        "spotify:track:5inqbGqSc2i7iBOrgOlIaA",
        "spotify:track:3zGIPuryCGrewaMUNPTqUh",
        "spotify:track:2Xs3MaK9AzV48lZa7PIKCh",
        "spotify:track:30hwT0deSgqiaBMxijn35R",
        "spotify:track:3CDVMejYHnB1SkEEx0T1N4",
        "spotify:track:52wlhIULOeaxZpzuTYrVlt",
        "spotify:track:3SsJ17EnPIu1B4GZshqjIS",
        "spotify:track:1MhXchY126AX5Iuv4Odbe8",
        "spotify:track:0ZFQxmNIOj03o7OMaiPcVX",
        "spotify:track:3w1h7uNU1Dfk2tOaHiIGat",
        "spotify:track:0NZwAPRO1DqSAprpZHnBiE",
        "spotify:track:4JV3BjszeEUD1bTTcx9hdx",
        "spotify:track:6iN5Ce3HlPPLEHjqdMZJU8",
        "spotify:track:3RvLAm0ESbUOUZOD7sF4xn",
        "spotify:track:0og2U8tsBAR7NJysRR6uBU",
        "spotify:track:1bp0MQlKJNTgiOLd9hAwWG",
        "spotify:track:7whZdZMFCIe4d790dDjqnS",
        "spotify:track:3Vd4fHzwS6pBS3muymjiDi",
        "spotify:track:6xpZW6bnDbfce8qBRu7M9x",
        "spotify:track:7Bczytfc62eccD7kSqSnFh",
        "spotify:track:3Nchp5FIgnabzgM1BMoOVT",
        "spotify:track:6IAuH3hgTRpUUdmOGubXGS",
        "spotify:track:1ohvvpAVuay6BM7UHfk6kS",
        "spotify:track:45jWNNpTqJ4gSty54msOLx",
        "spotify:track:3yIGWpmhul23xz9C3PXPQ2",
        "spotify:track:70L6nHORQsblY813yNqUR3",
        "spotify:track:2OxidMKQ4V3V9XIofZIm7L",
        "spotify:track:6ieWL5CLN9WdC875guWtMe",
        "spotify:track:6R6MEAGzdsb1rXEWlJelYY",
        "spotify:track:2b7zdV4i5vEaRlZAkiIAR5",
        "spotify:track:0D6gnSZM9Moq7qiCgWDlEI",
        "spotify:track:0QyJXG36Q3Kta662XS8GhY",
        "spotify:track:3X04hhGLUCz86UwEAKSVAB",
        "spotify:track:44sQXptPXVOrYvcvf9TSUk",
        "spotify:track:7H8OA9WJOxluxbG4gGjeJv",
        "spotify:track:1HJU78CRk4vxvjE5Cs1BCt",
        "spotify:track:0fztzFDKMUYWTP8sFDGcTd",
        "spotify:track:37xM5UFUHSVBISEJWTYwvn",
        "spotify:track:4zMbUp4WDZxVeEeBpdgtH4",
        "spotify:track:7dHFW99s5f6dnyrboYTAq8",
        "spotify:track:2uWyRgo5ILEKxozm92t2ob",
        "spotify:track:2s0skXthOtkbPfyiwBf7a0",
        "spotify:track:3txlvthoUa9vWvG1zr2Lnr",
        "spotify:track:07WWAnpW4RVPY4D2lmlClG",
        "spotify:track:3mU588Di5vqL2w3d3J2dJd",
        "spotify:track:3wfpQiQ19leVsNQifDXVam",
        "spotify:track:1584BGfWzDiIu2OdSd7zhQ",
        "spotify:track:06cqIVC8kRAT02qfHQT65v",
        "spotify:track:7GZDDVbMYL6oFlmJMULaMo",
        "spotify:track:5dQoiKWoAxqIkVzHZsyOTN",
        "spotify:track:47yngLaqEr3z1lnk7ok0OV",
        "spotify:track:2ezF8mcfJ6CEkxbzgzkApX",
        "spotify:track:20tAOmUzziDG8IPe0mamhH",
        "spotify:track:07o9fWRO0t6x5yafPR6bnp",
        "spotify:track:0iYMs1WihZBLEhQFiFbtkh",
        "spotify:track:6LCGD2bl7itBHHayQ4ltPc",
        "spotify:track:6ScJ1JGzXBU9wuvMueNLN8",
        "spotify:track:11m6UgxZF4ZfDQ50eN9bYs",
        "spotify:track:7ibRB2S2WOfPKSvYkhcYtj",
        "spotify:track:3ICYxVhwVsp8FYI3IT2dDV",
        "spotify:track:35YlMiY002IqF3XrqZ0O2d",
        "spotify:track:3vHDpXZiNmcOIDdyWzKNUm",
        "spotify:track:1ULnQ2yn5LeQX4LrROm1RD",
        "spotify:track:2Bhoq5h6nYowuskNUzE9gn",
        "spotify:track:153F2kIE5hnCTBFblgmWkk",
        "spotify:track:2YrZqTyToiN4oBYHAVae7F",
        "spotify:track:2ClFwxCrSbg472DuKbCpej",
        "spotify:track:5OVVWBjDB3TPhLyt44A37k",
        "spotify:track:1MrSbSu9UNo7Aucwrf32WJ",
        ... 100 more items
    ],
    path: "/PlaylistHealth/snapshot"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912312498',
    userId: 'temp-1762912312498',
    playlistId: 'liked:temp-1762912312498',
    trackIds: [
        'spotify:track:4fNfxPVjg1tSkvhd6wFX3k',
        'spotify:track:78HEzDEs1QUnHB2DbxgC1s',
        'spotify:track:77lKjGkhvWuimTzQxA4STK',
        'spotify:track:4u0DoPznclokUxTm9s6VJs',
        'spotify:track:4A48ckONJNoXU5smWT9CeG',
        'spotify:track:1ztPf79mbGpktO7TjB7tWW',
        'spotify:track:7GkZ2cx7i74zu1piQy3i6T',
        'spotify:track:0nifVdzF4R6WT2qITFJKeu',
        'spotify:track:7tHr0ZuignrPodrXZWhcJc',
        'spotify:track:5a3bAmljP7mXiOyovGJeJ7',
        'spotify:track:0Qp66EJS2DalnLkRKmu7mX',
        'spotify:track:1Ms8SsQJiTJ3zEMosUWkUR',
        'spotify:track:1CqcGbXZrpJJygqUM8PW05',
        'spotify:track:5RnT0WKKGAt6eOmd7SQRJ6',
        'spotify:track:3PU3neC9XmWz7ZjUn5rYIw',
        'spotify:track:35RSbRERNm6g8ba2wXx8AN',
        'spotify:track:057rZ21MDp8Ld0TgQndNcv',
        'spotify:track:7wpWeXk1PrTI6MyNGA4fHC',
        'spotify:track:4a9axdtH9qFx0nMiKjwChd',
        'spotify:track:4V6GNeAV0Fz7bjjZydoeWV',
        'spotify:track:4gtIYSYu8u2ItBqrhCaChL',
        'spotify:track:6PKoUpo9sis5LWkMXSck6f',
        'spotify:track:7BgyWwbbybJr2IbQoI1gzH',
        'spotify:track:1735xgk2J8CHCGY2LS1HM6',
        'spotify:track:6lRJqlbbsSAyoN67hVsF8A',
        'spotify:track:2ao4kVf8DsGghi3mUGaVEr',
        'spotify:track:6nlA47UV0BoOcFlPmUVCzY',
        'spotify:track:5P6ByN1elQzHH66vKlAB9a',
        'spotify:track:3P7Ul4isMJgb33TGqZ09W5',
        'spotify:track:2tdDlP8w9wFp7m41KimBf1',
        'spotify:track:0sTBOp1hdayTjw6UOyPyi6',
        'spotify:track:5inqbGqSc2i7iBOrgOlIaA',
        'spotify:track:3zGIPuryCGrewaMUNPTqUh',
        'spotify:track:2Xs3MaK9AzV48lZa7PIKCh',
        'spotify:track:30hwT0deSgqiaBMxijn35R',
        'spotify:track:3CDVMejYHnB1SkEEx0T1N4',
        'spotify:track:52wlhIULOeaxZpzuTYrVlt',
        'spotify:track:3SsJ17EnPIu1B4GZshqjIS',
        'spotify:track:1MhXchY126AX5Iuv4Odbe8',
        'spotify:track:0ZFQxmNIOj03o7OMaiPcVX',
        'spotify:track:3w1h7uNU1Dfk2tOaHiIGat',
        'spotify:track:0NZwAPRO1DqSAprpZHnBiE',
        'spotify:track:4JV3BjszeEUD1bTTcx9hdx',
        'spotify:track:6iN5Ce3HlPPLEHjqdMZJU8',
        'spotify:track:3RvLAm0ESbUOUZOD7sF4xn',
        'spotify:track:0og2U8tsBAR7NJysRR6uBU',
        'spotify:track:1bp0MQlKJNTgiOLd9hAwWG',
        'spotify:track:7whZdZMFCIe4d790dDjqnS',
        'spotify:track:3Vd4fHzwS6pBS3muymjiDi',
        'spotify:track:6xpZW6bnDbfce8qBRu7M9x',
        'spotify:track:7Bczytfc62eccD7kSqSnFh',
        'spotify:track:3Nchp5FIgnabzgM1BMoOVT',
        'spotify:track:6IAuH3hgTRpUUdmOGubXGS',
        'spotify:track:1ohvvpAVuay6BM7UHfk6kS',
        'spotify:track:45jWNNpTqJ4gSty54msOLx',
        'spotify:track:3yIGWpmhul23xz9C3PXPQ2',
        'spotify:track:70L6nHORQsblY813yNqUR3',
        'spotify:track:2OxidMKQ4V3V9XIofZIm7L',
        'spotify:track:6ieWL5CLN9WdC875guWtMe',
        'spotify:track:6R6MEAGzdsb1rXEWlJelYY',
        'spotify:track:2b7zdV4i5vEaRlZAkiIAR5',
        'spotify:track:0D6gnSZM9Moq7qiCgWDlEI',
        'spotify:track:0QyJXG36Q3Kta662XS8GhY',
        'spotify:track:3X04hhGLUCz86UwEAKSVAB',
        'spotify:track:44sQXptPXVOrYvcvf9TSUk',
        'spotify:track:7H8OA9WJOxluxbG4gGjeJv',
        'spotify:track:1HJU78CRk4vxvjE5Cs1BCt',
        'spotify:track:0fztzFDKMUYWTP8sFDGcTd',
        'spotify:track:37xM5UFUHSVBISEJWTYwvn',
        'spotify:track:4zMbUp4WDZxVeEeBpdgtH4',
        'spotify:track:7dHFW99s5f6dnyrboYTAq8',
        'spotify:track:2uWyRgo5ILEKxozm92t2ob',
        'spotify:track:2s0skXthOtkbPfyiwBf7a0',
        'spotify:track:3txlvthoUa9vWvG1zr2Lnr',
        'spotify:track:07WWAnpW4RVPY4D2lmlClG',
        'spotify:track:3mU588Di5vqL2w3d3J2dJd',
        'spotify:track:3wfpQiQ19leVsNQifDXVam',
        'spotify:track:1584BGfWzDiIu2OdSd7zhQ',
        'spotify:track:06cqIVC8kRAT02qfHQT65v',
        'spotify:track:7GZDDVbMYL6oFlmJMULaMo',
        'spotify:track:5dQoiKWoAxqIkVzHZsyOTN',
        'spotify:track:47yngLaqEr3z1lnk7ok0OV',
        'spotify:track:2ezF8mcfJ6CEkxbzgzkApX',
        'spotify:track:20tAOmUzziDG8IPe0mamhH',
        'spotify:track:07o9fWRO0t6x5yafPR6bnp',
        'spotify:track:0iYMs1WihZBLEhQFiFbtkh',
        'spotify:track:6LCGD2bl7itBHHayQ4ltPc',
        'spotify:track:6ScJ1JGzXBU9wuvMueNLN8',
        'spotify:track:11m6UgxZF4ZfDQ50eN9bYs',
        'spotify:track:7ibRB2S2WOfPKSvYkhcYtj',
        'spotify:track:3ICYxVhwVsp8FYI3IT2dDV',
        'spotify:track:35YlMiY002IqF3XrqZ0O2d',
        'spotify:track:3vHDpXZiNmcOIDdyWzKNUm',
        'spotify:track:1ULnQ2yn5LeQX4LrROm1RD',
        'spotify:track:2Bhoq5h6nYowuskNUzE9gn',
        'spotify:track:153F2kIE5hnCTBFblgmWkk',
        'spotify:track:2YrZqTyToiN4oBYHAVae7F',
        'spotify:track:2ClFwxCrSbg472DuKbCpej',
        'spotify:track:5OVVWBjDB3TPhLyt44A37k',
        'spotify:track:1MrSbSu9UNo7Aucwrf32WJ',
        ... 100 more items
    ],
    path: '/PlaylistHealth/snapshot'
    } => { request: '019a75d0-80bc-7df8-8b4b-c84eff163437' }
    PlaylistHealth.snapshot {
    playlistId: 'liked:temp-1762912312498',
    userId: 'temp-1762912312498',
    trackIds: [
        'spotify:track:4fNfxPVjg1tSkvhd6wFX3k',
        'spotify:track:78HEzDEs1QUnHB2DbxgC1s',
        'spotify:track:77lKjGkhvWuimTzQxA4STK',
        'spotify:track:4u0DoPznclokUxTm9s6VJs',
        'spotify:track:4A48ckONJNoXU5smWT9CeG',
        'spotify:track:1ztPf79mbGpktO7TjB7tWW',
        'spotify:track:7GkZ2cx7i74zu1piQy3i6T',
        'spotify:track:0nifVdzF4R6WT2qITFJKeu',
        'spotify:track:7tHr0ZuignrPodrXZWhcJc',
        'spotify:track:5a3bAmljP7mXiOyovGJeJ7',
        'spotify:track:0Qp66EJS2DalnLkRKmu7mX',
        'spotify:track:1Ms8SsQJiTJ3zEMosUWkUR',
        'spotify:track:1CqcGbXZrpJJygqUM8PW05',
        'spotify:track:5RnT0WKKGAt6eOmd7SQRJ6',
        'spotify:track:3PU3neC9XmWz7ZjUn5rYIw',
        'spotify:track:35RSbRERNm6g8ba2wXx8AN',
        'spotify:track:057rZ21MDp8Ld0TgQndNcv',
        'spotify:track:7wpWeXk1PrTI6MyNGA4fHC',
        'spotify:track:4a9axdtH9qFx0nMiKjwChd',
        'spotify:track:4V6GNeAV0Fz7bjjZydoeWV',
        'spotify:track:4gtIYSYu8u2ItBqrhCaChL',
        'spotify:track:6PKoUpo9sis5LWkMXSck6f',
        'spotify:track:7BgyWwbbybJr2IbQoI1gzH',
        'spotify:track:1735xgk2J8CHCGY2LS1HM6',
        'spotify:track:6lRJqlbbsSAyoN67hVsF8A',
        'spotify:track:2ao4kVf8DsGghi3mUGaVEr',
        'spotify:track:6nlA47UV0BoOcFlPmUVCzY',
        'spotify:track:5P6ByN1elQzHH66vKlAB9a',
        'spotify:track:3P7Ul4isMJgb33TGqZ09W5',
        'spotify:track:2tdDlP8w9wFp7m41KimBf1',
        'spotify:track:0sTBOp1hdayTjw6UOyPyi6',
        'spotify:track:5inqbGqSc2i7iBOrgOlIaA',
        'spotify:track:3zGIPuryCGrewaMUNPTqUh',
        'spotify:track:2Xs3MaK9AzV48lZa7PIKCh',
        'spotify:track:30hwT0deSgqiaBMxijn35R',
        'spotify:track:3CDVMejYHnB1SkEEx0T1N4',
        'spotify:track:52wlhIULOeaxZpzuTYrVlt',
        'spotify:track:3SsJ17EnPIu1B4GZshqjIS',
        'spotify:track:1MhXchY126AX5Iuv4Odbe8',
        'spotify:track:0ZFQxmNIOj03o7OMaiPcVX',
        'spotify:track:3w1h7uNU1Dfk2tOaHiIGat',
        'spotify:track:0NZwAPRO1DqSAprpZHnBiE',
        'spotify:track:4JV3BjszeEUD1bTTcx9hdx',
        'spotify:track:6iN5Ce3HlPPLEHjqdMZJU8',
        'spotify:track:3RvLAm0ESbUOUZOD7sF4xn',
        'spotify:track:0og2U8tsBAR7NJysRR6uBU',
        'spotify:track:1bp0MQlKJNTgiOLd9hAwWG',
        'spotify:track:7whZdZMFCIe4d790dDjqnS',
        'spotify:track:3Vd4fHzwS6pBS3muymjiDi',
        'spotify:track:6xpZW6bnDbfce8qBRu7M9x',
        'spotify:track:7Bczytfc62eccD7kSqSnFh',
        'spotify:track:3Nchp5FIgnabzgM1BMoOVT',
        'spotify:track:6IAuH3hgTRpUUdmOGubXGS',
        'spotify:track:1ohvvpAVuay6BM7UHfk6kS',
        'spotify:track:45jWNNpTqJ4gSty54msOLx',
        'spotify:track:3yIGWpmhul23xz9C3PXPQ2',
        'spotify:track:70L6nHORQsblY813yNqUR3',
        'spotify:track:2OxidMKQ4V3V9XIofZIm7L',
        'spotify:track:6ieWL5CLN9WdC875guWtMe',
        'spotify:track:6R6MEAGzdsb1rXEWlJelYY',
        'spotify:track:2b7zdV4i5vEaRlZAkiIAR5',
        'spotify:track:0D6gnSZM9Moq7qiCgWDlEI',
        'spotify:track:0QyJXG36Q3Kta662XS8GhY',
        'spotify:track:3X04hhGLUCz86UwEAKSVAB',
        'spotify:track:44sQXptPXVOrYvcvf9TSUk',
        'spotify:track:7H8OA9WJOxluxbG4gGjeJv',
        'spotify:track:1HJU78CRk4vxvjE5Cs1BCt',
        'spotify:track:0fztzFDKMUYWTP8sFDGcTd',
        'spotify:track:37xM5UFUHSVBISEJWTYwvn',
        'spotify:track:4zMbUp4WDZxVeEeBpdgtH4',
        'spotify:track:7dHFW99s5f6dnyrboYTAq8',
        'spotify:track:2uWyRgo5ILEKxozm92t2ob',
        'spotify:track:2s0skXthOtkbPfyiwBf7a0',
        'spotify:track:3txlvthoUa9vWvG1zr2Lnr',
        'spotify:track:07WWAnpW4RVPY4D2lmlClG',
        'spotify:track:3mU588Di5vqL2w3d3J2dJd',
        'spotify:track:3wfpQiQ19leVsNQifDXVam',
        'spotify:track:1584BGfWzDiIu2OdSd7zhQ',
        'spotify:track:06cqIVC8kRAT02qfHQT65v',
        'spotify:track:7GZDDVbMYL6oFlmJMULaMo',
        'spotify:track:5dQoiKWoAxqIkVzHZsyOTN',
        'spotify:track:47yngLaqEr3z1lnk7ok0OV',
        'spotify:track:2ezF8mcfJ6CEkxbzgzkApX',
        'spotify:track:20tAOmUzziDG8IPe0mamhH',
        'spotify:track:07o9fWRO0t6x5yafPR6bnp',
        'spotify:track:0iYMs1WihZBLEhQFiFbtkh',
        'spotify:track:6LCGD2bl7itBHHayQ4ltPc',
        'spotify:track:6ScJ1JGzXBU9wuvMueNLN8',
        'spotify:track:11m6UgxZF4ZfDQ50eN9bYs',
        'spotify:track:7ibRB2S2WOfPKSvYkhcYtj',
        'spotify:track:3ICYxVhwVsp8FYI3IT2dDV',
        'spotify:track:35YlMiY002IqF3XrqZ0O2d',
        'spotify:track:3vHDpXZiNmcOIDdyWzKNUm',
        'spotify:track:1ULnQ2yn5LeQX4LrROm1RD',
        'spotify:track:2Bhoq5h6nYowuskNUzE9gn',
        'spotify:track:153F2kIE5hnCTBFblgmWkk',
        'spotify:track:2YrZqTyToiN4oBYHAVae7F',
        'spotify:track:2ClFwxCrSbg472DuKbCpej',
        'spotify:track:5OVVWBjDB3TPhLyt44A37k',
        'spotify:track:1MrSbSu9UNo7Aucwrf32WJ',
        ... 100 more items
    ]
    } => { snapshotId: '019a75d0-8102-70fb-ab6b-88d0ee16ee08' }
    Requesting.respond {
    request: '019a75d0-80bc-7df8-8b4b-c84eff163437',
    snapshotId: '019a75d0-8102-70fb-ab6b-88d0ee16ee08'
    } => { request: '019a75d0-80bc-7df8-8b4b-c84eff163437' }
    TrackScoring.preview {
    sessionToken: 'session:temp-1762912312498',
    userId: 'temp-1762912312498',
    size: 500
    } => {
    trackIds: [
        'spotify:track:3QLjDkgLh9AOEHlhQtDuhs',
        'spotify:track:6LxSe8YmdPxy095Ux6znaQ',
        'spotify:track:1CcorUngVSo7k2GX8GLB53',
        'spotify:track:3zGIPuryCGrewaMUNPTqUh',
        'spotify:track:2CABxnXYCFFA4x4RaPjYZJ',
        'spotify:track:2iksjpqL3eraxCBKqNHuqd',
        'spotify:track:1eEg6c3d5l9MpOznu25AQM',
        'spotify:track:5RnT0WKKGAt6eOmd7SQRJ6',
        'spotify:track:0JlMHfblsmG89Nfd12dc1L',
        'spotify:track:0rl0hD52ClPrE2240sTRRM',
        'spotify:track:278TErqSFSh7yLpL9bZlcU',
        'spotify:track:0vZOaZ8s8e9z4Lh8Rxq1xJ',
        'spotify:track:7JbMsR4rZh6J77LNafur8U',
        'spotify:track:0IugXCCPq78mj3YJXswNKn',
        'spotify:track:7dHFW99s5f6dnyrboYTAq8',
        'spotify:track:06cqIVC8kRAT02qfHQT65v',
        'spotify:track:24bzJwjGBWtGCs7xKIKQsB',
        'spotify:track:5d7NvMz2SgyEkvRow7us99',
        'spotify:track:4omurqpm7aWH9VVz2Ii4yO',
        'spotify:track:1cKfbgfOojLCCBTYvH6J57',
        'spotify:track:7EWDXdu3BzLLCuAGrAx4RT',
        'spotify:track:3HwXUvdZXDxmvABSsxhGmO',
        'spotify:track:0ZFQxmNIOj03o7OMaiPcVX',
        'spotify:track:6IyoLWzljeR3ldQo4KWHT6',
        'spotify:track:2c7sRekhMGlj7u1WIIzoQu',
        'spotify:track:2kn0fLwt9QRorHuGdmk6ze',
        'spotify:track:4Ar3oSp4bAw5gz22F70GM7',
        'spotify:track:057rZ21MDp8Ld0TgQndNcv',
        'spotify:track:7BgyWwbbybJr2IbQoI1gzH',
        'spotify:track:2Bhoq5h6nYowuskNUzE9gn',
        'spotify:track:6hLjcgRbZcbs1eYT2MODJJ',
        'spotify:track:2FvmykOV9mwzkCxEWWj1vO',
        'spotify:track:2cTvZSCqzjkTMkIypLxUFH',
        'spotify:track:2HwEwrqS0YeeJ0EKx15Yz1',
        'spotify:track:0oYGloL7eVBTt1at9I8tcM',
        'spotify:track:0AyA2lHB4YnQUNa8Y6NNjm',
        'spotify:track:7ibRB2S2WOfPKSvYkhcYtj',
        'spotify:track:26QJuQfM8PVAWkIm1JRyqq',
        'spotify:track:46DQgCLYUqsrfLmvN5Ymre',
        'spotify:track:3LT1EIJv0UMGSmzBDk5TaH',
        'spotify:track:6luBKkFUt5wTwz7hpLhp12',
        'spotify:track:0KdEx2ETCXYZeEVAZS4sJ4',
        'spotify:track:2iVlrw3jdHD0popF0iImnW',
        'spotify:track:4ihiiVAhf3Ta9h7IytC74L',
        'spotify:track:153F2kIE5hnCTBFblgmWkk',
        'spotify:track:1Hv1VTm8zeOeybub15mA2R',
        'spotify:track:7acjLOXbxtLthMU8Yy55hS',
        'spotify:track:78FkoRYVvEH2iBQut4thyI',
        'spotify:track:12DYYBuq5IphSL7T4HUZ06',
        'spotify:track:0wyzyF8LRP7JBa2mchvuWM',
        'spotify:track:1JdbcZqBjvOBmdS3YD6SSI',
        'spotify:track:4fF2nOsPektn8js9fG5Cdr',
        'spotify:track:3uriNy9YJCNQvOpBPQPTL6',
        'spotify:track:0YQznyH9mJn6UTwWFHqy4b',
        'spotify:track:78HEzDEs1QUnHB2DbxgC1s',
        'spotify:track:1YkI4EAlpLsHUmWWGdh6b6',
        'spotify:track:1fASxizDXuywMFIKNnVWec',
        'spotify:track:5OVVWBjDB3TPhLyt44A37k',
        'spotify:track:1OxNBuk83EeS1Nj0k8mfPZ',
        'spotify:track:5dQoiKWoAxqIkVzHZsyOTN',
        'spotify:track:0XxXIiZP0rJBS8S841UVdu',
        'spotify:track:0eaVIYo2zeOaGJeqZ5TwYz',
        'spotify:track:1Rgb55W0TNZThWOW7Qby8a',
        'spotify:track:2ClFwxCrSbg472DuKbCpej',
        'spotify:track:2FE7j7hucyydvufXGAJCju',
        'spotify:track:35XQC70WCJHUi52mIdxXw2',
        'spotify:track:7tHr0ZuignrPodrXZWhcJc',
        'spotify:track:5JG2UkenJbKghnQiX4b22m',
        'spotify:track:4cTKHVuc2qInyxZTo7UP0J',
        'spotify:track:39AAohgvtgo3xJlypPoLho',
        'spotify:track:4sCCZW0ezEPAexAidFsoVm',
        'spotify:track:5QQEPd2wDrDiR4LEbzHHMh',
        'spotify:track:2sIbHjfJ3nbMXNz4w03fWv',
        'spotify:track:0pUVeEgZuNyFzIMKp67RbS',
        'spotify:track:6xE6ZWzK1YDDSYzqOCoQlz',
        'spotify:track:0aDIb4saqLfTcssyqaKEqz',
        'spotify:track:2XfWWZqfTpNmZdmVgsmqKZ',
        'spotify:track:6ScJ1JGzXBU9wuvMueNLN8',
        'spotify:track:3Ps8agjwIXiLN5ipfxDklk',
        'spotify:track:3YrUiyXE71EVecEWoRoK9L',
        'spotify:track:1GAp4csnsbCBncT2v5yfuw',
        'spotify:track:7rOVsANP5pEfUfCMBnqXGb',
        'spotify:track:43U7HI83dsrYiS7AMDwkqC',
        'spotify:track:4zyHmSSneytuFEdU2TbU7w',
        'spotify:track:02ABJ3VDKP4ymfgoFCoczy',
        'spotify:track:2kkvB3RNRzwjFdGhaUA0tz',
        'spotify:track:11m6UgxZF4ZfDQ50eN9bYs',
        'spotify:track:7EW7Yivb93qKAtp5qEm5of',
        'spotify:track:75n9WHWZAzhB59xSjIHly4',
        'spotify:track:0PccUXFHLQRoxB32a7fENH',
        'spotify:track:3id4YOaR7JBKJUPOE9VgaE',
        'spotify:track:4j8n7cA99r729g1nAtA6qV',
        'spotify:track:6cvbYMdlVhoAXIpQDmrcIf',
        'spotify:track:30hwT0deSgqiaBMxijn35R',
        'spotify:track:0ItgotO5txriRAp6lXMHJ7',
        'spotify:track:2LYFCSYptjtZLVPzVJEUnm',
        'spotify:track:25cJX61SWZCOlgNuvHf20c',
        'spotify:track:2Cl4HCBmPddQNZEncdoXp0',
        'spotify:track:5M4yti0QxgqJieUYaEXcpw',
        'spotify:track:1M04RE8vg8M2vsVnVaTJBN'
    ],
    tracks: [
        {
        trackId: 'spotify:track:3QLjDkgLh9AOEHlhQtDuhs',
        score: 81,
        lastPlayedAt: 1762912789283
        },
        {
        trackId: 'spotify:track:6LxSe8YmdPxy095Ux6znaQ',
        score: 81,
        lastPlayedAt: 1732923639000
        },
        {
        trackId: 'spotify:track:1CcorUngVSo7k2GX8GLB53',
        score: 80,
        lastPlayedAt: 1733628124000
        },
        {
        trackId: 'spotify:track:3zGIPuryCGrewaMUNPTqUh',
        score: 79,
        lastPlayedAt: 1734313980000
        },
        {
        trackId: 'spotify:track:2CABxnXYCFFA4x4RaPjYZJ',
        score: 78,
        lastPlayedAt: 1734537321000
        },
        {
        trackId: 'spotify:track:2iksjpqL3eraxCBKqNHuqd',
        score: 78,
        lastPlayedAt: 1734857935000
        },
        {
        trackId: 'spotify:track:1eEg6c3d5l9MpOznu25AQM',
        score: 74,
        lastPlayedAt: 1736720248000
        },
        {
        trackId: 'spotify:track:5RnT0WKKGAt6eOmd7SQRJ6',
        score: 73,
        lastPlayedAt: 1737080870000
        },
        {
        trackId: 'spotify:track:0JlMHfblsmG89Nfd12dc1L',
        score: 73,
        lastPlayedAt: 1737228144000
        },
        {
        trackId: 'spotify:track:0rl0hD52ClPrE2240sTRRM',
        score: 73,
        lastPlayedAt: 1737232029000
        },
        {
        trackId: 'spotify:track:278TErqSFSh7yLpL9bZlcU',
        score: 73,
        lastPlayedAt: 1737229935000
        },
        {
        trackId: 'spotify:track:0vZOaZ8s8e9z4Lh8Rxq1xJ',
        score: 73,
        lastPlayedAt: 1737255398000
        },
        {
        trackId: 'spotify:track:7JbMsR4rZh6J77LNafur8U',
        score: 73,
        lastPlayedAt: 1737229938000
        },
        {
        trackId: 'spotify:track:0IugXCCPq78mj3YJXswNKn',
        score: 73,
        lastPlayedAt: 1737233133000
        },
        {
        trackId: 'spotify:track:7dHFW99s5f6dnyrboYTAq8',
        score: 73,
        lastPlayedAt: 1736922429000
        },
        {
        trackId: 'spotify:track:06cqIVC8kRAT02qfHQT65v',
        score: 71,
        lastPlayedAt: 1737959955000
        },
        {
        trackId: 'spotify:track:24bzJwjGBWtGCs7xKIKQsB',
        score: 71,
        lastPlayedAt: 1737959957000
        },
        {
        trackId: 'spotify:track:5d7NvMz2SgyEkvRow7us99',
        score: 71,
        lastPlayedAt: 1737959960000
        },
        {
        trackId: 'spotify:track:4omurqpm7aWH9VVz2Ii4yO',
        score: 71,
        lastPlayedAt: 1737959971000
        },
        {
        trackId: 'spotify:track:1cKfbgfOojLCCBTYvH6J57',
        score: 71,
        lastPlayedAt: 1737963717000
        },
        {
        trackId: 'spotify:track:7EWDXdu3BzLLCuAGrAx4RT',
        score: 71,
        lastPlayedAt: 1737996990000
        },
        {
        trackId: 'spotify:track:3HwXUvdZXDxmvABSsxhGmO',
        score: 71,
        lastPlayedAt: 1738075825000
        },
        {
        trackId: 'spotify:track:0ZFQxmNIOj03o7OMaiPcVX',
        score: 71,
        lastPlayedAt: 1738075832000
        },
        {
        trackId: 'spotify:track:6IyoLWzljeR3ldQo4KWHT6',
        score: 71,
        lastPlayedAt: 1738075842000
        },
        {
        trackId: 'spotify:track:2c7sRekhMGlj7u1WIIzoQu',
        score: 71,
        lastPlayedAt: 1737924434000
        },
        {
        trackId: 'spotify:track:2kn0fLwt9QRorHuGdmk6ze',
        score: 70,
        lastPlayedAt: 1738161713000
        },
        {
        trackId: 'spotify:track:4Ar3oSp4bAw5gz22F70GM7',
        score: 70,
        lastPlayedAt: 1738210222000
        },
        {
        trackId: 'spotify:track:057rZ21MDp8Ld0TgQndNcv',
        score: 70,
        lastPlayedAt: 1738338572000
        },
        {
        trackId: 'spotify:track:7BgyWwbbybJr2IbQoI1gzH',
        score: 70,
        lastPlayedAt: 1738429173000
        },
        {
        trackId: 'spotify:track:2Bhoq5h6nYowuskNUzE9gn',
        score: 70,
        lastPlayedAt: 1738448254000
        },
        {
        trackId: 'spotify:track:6hLjcgRbZcbs1eYT2MODJJ',
        score: 70,
        lastPlayedAt: 1738448850000
        },
        {
        trackId: 'spotify:track:2FvmykOV9mwzkCxEWWj1vO',
        score: 69,
        lastPlayedAt: 1738732410000
        },
        {
        trackId: 'spotify:track:2cTvZSCqzjkTMkIypLxUFH',
        score: 67,
        lastPlayedAt: 1739568263000
        },
        {
        trackId: 'spotify:track:2HwEwrqS0YeeJ0EKx15Yz1',
        score: 67,
        lastPlayedAt: 1739568266000
        },
        {
        trackId: 'spotify:track:0oYGloL7eVBTt1at9I8tcM',
        score: 67,
        lastPlayedAt: 1739569975000
        },
        {
        trackId: 'spotify:track:0AyA2lHB4YnQUNa8Y6NNjm',
        score: 66,
        lastPlayedAt: 1739831916000
        },
        {
        trackId: 'spotify:track:7ibRB2S2WOfPKSvYkhcYtj',
        score: 66,
        lastPlayedAt: 1739831919000
        },
        {
        trackId: 'spotify:track:26QJuQfM8PVAWkIm1JRyqq',
        score: 66,
        lastPlayedAt: 1739832186000
        },
        {
        trackId: 'spotify:track:46DQgCLYUqsrfLmvN5Ymre',
        score: 66,
        lastPlayedAt: 1739929774000
        },
        {
        trackId: 'spotify:track:3LT1EIJv0UMGSmzBDk5TaH',
        score: 66,
        lastPlayedAt: 1739942193000
        },
        {
        trackId: 'spotify:track:6luBKkFUt5wTwz7hpLhp12',
        score: 65,
        lastPlayedAt: 1740358772000
        },
        {
        trackId: 'spotify:track:0KdEx2ETCXYZeEVAZS4sJ4',
        score: 64,
        lastPlayedAt: 1740729428000
        },
        {
        trackId: 'spotify:track:2iVlrw3jdHD0popF0iImnW',
        score: 64,
        lastPlayedAt: 1740729438000
        },
        {
        trackId: 'spotify:track:4ihiiVAhf3Ta9h7IytC74L',
        score: 64,
        lastPlayedAt: 1740775877000
        },
        {
        trackId: 'spotify:track:153F2kIE5hnCTBFblgmWkk',
        score: 64,
        lastPlayedAt: 1740535625000
        },
        {
        trackId: 'spotify:track:1Hv1VTm8zeOeybub15mA2R',
        score: 64,
        lastPlayedAt: 1740538072000
        },
        {
        trackId: 'spotify:track:7acjLOXbxtLthMU8Yy55hS',
        score: 64,
        lastPlayedAt: 1740553937000
        },
        {
        trackId: 'spotify:track:78FkoRYVvEH2iBQut4thyI',
        score: 64,
        lastPlayedAt: 1740562780000
        },
        {
        trackId: 'spotify:track:12DYYBuq5IphSL7T4HUZ06',
        score: 64,
        lastPlayedAt: 1740563125000
        },
        {
        trackId: 'spotify:track:0wyzyF8LRP7JBa2mchvuWM',
        score: 64,
        lastPlayedAt: 1740563343000
        },
        {
        trackId: 'spotify:track:1JdbcZqBjvOBmdS3YD6SSI',
        score: 64,
        lastPlayedAt: 1740589634000
        },
        {
        trackId: 'spotify:track:4fF2nOsPektn8js9fG5Cdr',
        score: 64,
        lastPlayedAt: 1740611341000
        },
        {
        trackId: 'spotify:track:3uriNy9YJCNQvOpBPQPTL6',
        score: 64,
        'spotify:track:7Bczytfc62eccD7kSqSnFh',
        'spotify:track:3Nchp5FIgnabzgM1BMoOVT',
        'spotify:track:6IAuH3hgTRpUUdmOGubXGS',
        'spotify:track:1ohvvpAVuay6BM7UHfk6kS',
        'spotify:track:45jWNNpTqJ4gSty54msOLx',
        'spotify:track:3yIGWpmhul23xz9C3PXPQ2',
        'spotify:track:70L6nHORQsblY813yNqUR3',
        'spotify:track:2OxidMKQ4V3V9XIofZIm7L',
        'spotify:track:6ieWL5CLN9WdC875guWtMe',
        'spotify:track:6R6MEAGzdsb1rXEWlJelYY',
        'spotify:track:2b7zdV4i5vEaRlZAkiIAR5',
        'spotify:track:0D6gnSZM9Moq7qiCgWDlEI',
        'spotify:track:0QyJXG36Q3Kta662XS8GhY',
        'spotify:track:3X04hhGLUCz86UwEAKSVAB',
        'spotify:track:44sQXptPXVOrYvcvf9TSUk',
        'spotify:track:7H8OA9WJOxluxbG4gGjeJv',
        'spotify:track:1HJU78CRk4vxvjE5Cs1BCt',
        'spotify:track:0fztzFDKMUYWTP8sFDGcTd',
        'spotify:track:37xM5UFUHSVBISEJWTYwvn',
        'spotify:track:4zMbUp4WDZxVeEeBpdgtH4',
        'spotify:track:7dHFW99s5f6dnyrboYTAq8',
        'spotify:track:2uWyRgo5ILEKxozm92t2ob',
        'spotify:track:2s0skXthOtkbPfyiwBf7a0',
        'spotify:track:3txlvthoUa9vWvG1zr2Lnr',
        'spotify:track:07WWAnpW4RVPY4D2lmlClG',
        'spotify:track:3mU588Di5vqL2w3d3J2dJd',
        'spotify:track:3wfpQiQ19leVsNQifDXVam',
        'spotify:track:1584BGfWzDiIu2OdSd7zhQ',
        'spotify:track:06cqIVC8kRAT02qfHQT65v',
        'spotify:track:7GZDDVbMYL6oFlmJMULaMo',
        'spotify:track:5dQoiKWoAxqIkVzHZsyOTN',
        'spotify:track:47yngLaqEr3z1lnk7ok0OV',
        'spotify:track:2ezF8mcfJ6CEkxbzgzkApX',
        'spotify:track:20tAOmUzziDG8IPe0mamhH',
        'spotify:track:07o9fWRO0t6x5yafPR6bnp',
        'spotify:track:0iYMs1WihZBLEhQFiFbtkh',
        'spotify:track:6LCGD2bl7itBHHayQ4ltPc',
        'spotify:track:6ScJ1JGzXBU9wuvMueNLN8',
        'spotify:track:11m6UgxZF4ZfDQ50eN9bYs',
        'spotify:track:7ibRB2S2WOfPKSvYkhcYtj',
        'spotify:track:3ICYxVhwVsp8FYI3IT2dDV',
        'spotify:track:35YlMiY002IqF3XrqZ0O2d',
        'spotify:track:3vHDpXZiNmcOIDdyWzKNUm',
        'spotify:track:1ULnQ2yn5LeQX4LrROm1RD',
        'spotify:track:2Bhoq5h6nYowuskNUzE9gn',
        'spotify:track:153F2kIE5hnCTBFblgmWkk',
        'spotify:track:2YrZqTyToiN4oBYHAVae7F',
        'spotify:track:2ClFwxCrSbg472DuKbCpej',
        'spotify:track:5OVVWBjDB3TPhLyt44A37k',
        'spotify:track:1MrSbSu9UNo7Aucwrf32WJ',
        ... 100 more items
    ]
    } => { snapshotId: '019a75d0-8102-70fb-ab6b-88d0ee16ee08' }
    Requesting.respond {
    request: '019a75d0-80bc-7df8-8b4b-c84eff163437',
    snapshotId: '019a75d0-8102-70fb-ab6b-88d0ee16ee08'
    } => { request: '019a75d0-80bc-7df8-8b4b-c84eff163437' }
    TrackScoring.preview {
    sessionToken: 'session:temp-1762912312498',
    userId: 'temp-1762912312498',
    size: 500
    } => {
    trackIds: [
        'spotify:track:3QLjDkgLh9AOEHlhQtDuhs',
        'spotify:track:6LxSe8YmdPxy095Ux6znaQ',
        'spotify:track:1CcorUngVSo7k2GX8GLB53',
        'spotify:track:3zGIPuryCGrewaMUNPTqUh',
        'spotify:track:2CABxnXYCFFA4x4RaPjYZJ',
        'spotify:track:2iksjpqL3eraxCBKqNHuqd',
        'spotify:track:1eEg6c3d5l9MpOznu25AQM',
        'spotify:track:5RnT0WKKGAt6eOmd7SQRJ6',
        'spotify:track:0JlMHfblsmG89Nfd12dc1L',
        'spotify:track:0rl0hD52ClPrE2240sTRRM',
        'spotify:track:278TErqSFSh7yLpL9bZlcU',
        'spotify:track:0vZOaZ8s8e9z4Lh8Rxq1xJ',
        'spotify:track:7JbMsR4rZh6J77LNafur8U',
        'spotify:track:0IugXCCPq78mj3YJXswNKn',
        'spotify:track:7dHFW99s5f6dnyrboYTAq8',
        'spotify:track:06cqIVC8kRAT02qfHQT65v',
        'spotify:track:24bzJwjGBWtGCs7xKIKQsB',
        'spotify:track:5d7NvMz2SgyEkvRow7us99',
        'spotify:track:4omurqpm7aWH9VVz2Ii4yO',
        'spotify:track:1cKfbgfOojLCCBTYvH6J57',
        'spotify:track:7EWDXdu3BzLLCuAGrAx4RT',
        'spotify:track:3HwXUvdZXDxmvABSsxhGmO',
        'spotify:track:0ZFQxmNIOj03o7OMaiPcVX',
        'spotify:track:6IyoLWzljeR3ldQo4KWHT6',
        'spotify:track:2c7sRekhMGlj7u1WIIzoQu',
        'spotify:track:2kn0fLwt9QRorHuGdmk6ze',
        'spotify:track:4Ar3oSp4bAw5gz22F70GM7',
        'spotify:track:057rZ21MDp8Ld0TgQndNcv',
        'spotify:track:7BgyWwbbybJr2IbQoI1gzH',
        'spotify:track:2Bhoq5h6nYowuskNUzE9gn',
        'spotify:track:6hLjcgRbZcbs1eYT2MODJJ',
        'spotify:track:2FvmykOV9mwzkCxEWWj1vO',
        'spotify:track:2cTvZSCqzjkTMkIypLxUFH',
        'spotify:track:2HwEwrqS0YeeJ0EKx15Yz1',
        'spotify:track:0oYGloL7eVBTt1at9I8tcM',
        'spotify:track:0AyA2lHB4YnQUNa8Y6NNjm',
        'spotify:track:7ibRB2S2WOfPKSvYkhcYtj',
        'spotify:track:26QJuQfM8PVAWkIm1JRyqq',
        'spotify:track:46DQgCLYUqsrfLmvN5Ymre',
        'spotify:track:3LT1EIJv0UMGSmzBDk5TaH',
        'spotify:track:6luBKkFUt5wTwz7hpLhp12',
        'spotify:track:0KdEx2ETCXYZeEVAZS4sJ4',
        'spotify:track:2iVlrw3jdHD0popF0iImnW',
        'spotify:track:4ihiiVAhf3Ta9h7IytC74L',
        'spotify:track:153F2kIE5hnCTBFblgmWkk',
        'spotify:track:1Hv1VTm8zeOeybub15mA2R',
        'spotify:track:7acjLOXbxtLthMU8Yy55hS',
        'spotify:track:78FkoRYVvEH2iBQut4thyI',
        'spotify:track:12DYYBuq5IphSL7T4HUZ06',
        'spotify:track:0wyzyF8LRP7JBa2mchvuWM',
        'spotify:track:1JdbcZqBjvOBmdS3YD6SSI',
        'spotify:track:4fF2nOsPektn8js9fG5Cdr',
        'spotify:track:3uriNy9YJCNQvOpBPQPTL6',
        'spotify:track:0YQznyH9mJn6UTwWFHqy4b',
        'spotify:track:78HEzDEs1QUnHB2DbxgC1s',
        'spotify:track:1YkI4EAlpLsHUmWWGdh6b6',
        'spotify:track:1fASxizDXuywMFIKNnVWec',
        'spotify:track:5OVVWBjDB3TPhLyt44A37k',
        'spotify:track:1OxNBuk83EeS1Nj0k8mfPZ',
        'spotify:track:5dQoiKWoAxqIkVzHZsyOTN',
        'spotify:track:0XxXIiZP0rJBS8S841UVdu',
        'spotify:track:0eaVIYo2zeOaGJeqZ5TwYz',
        'spotify:track:1Rgb55W0TNZThWOW7Qby8a',
        'spotify:track:2ClFwxCrSbg472DuKbCpej',
        'spotify:track:2FE7j7hucyydvufXGAJCju',
        'spotify:track:35XQC70WCJHUi52mIdxXw2',
        'spotify:track:7tHr0ZuignrPodrXZWhcJc',
        'spotify:track:5JG2UkenJbKghnQiX4b22m',
        'spotify:track:4cTKHVuc2qInyxZTo7UP0J',
        'spotify:track:39AAohgvtgo3xJlypPoLho',
        'spotify:track:4sCCZW0ezEPAexAidFsoVm',
        'spotify:track:5QQEPd2wDrDiR4LEbzHHMh',
        'spotify:track:2sIbHjfJ3nbMXNz4w03fWv',
        'spotify:track:0pUVeEgZuNyFzIMKp67RbS',
        'spotify:track:6xE6ZWzK1YDDSYzqOCoQlz',
        'spotify:track:0aDIb4saqLfTcssyqaKEqz',
        'spotify:track:2XfWWZqfTpNmZdmVgsmqKZ',
        'spotify:track:6ScJ1JGzXBU9wuvMueNLN8',
        'spotify:track:3Ps8agjwIXiLN5ipfxDklk',
        'spotify:track:3YrUiyXE71EVecEWoRoK9L',
        'spotify:track:1GAp4csnsbCBncT2v5yfuw',
        'spotify:track:7rOVsANP5pEfUfCMBnqXGb',
        'spotify:track:43U7HI83dsrYiS7AMDwkqC',
        'spotify:track:4zyHmSSneytuFEdU2TbU7w',
        'spotify:track:02ABJ3VDKP4ymfgoFCoczy',
        'spotify:track:2kkvB3RNRzwjFdGhaUA0tz',
        'spotify:track:11m6UgxZF4ZfDQ50eN9bYs',
        'spotify:track:7EW7Yivb93qKAtp5qEm5of',
        'spotify:track:75n9WHWZAzhB59xSjIHly4',
        'spotify:track:0PccUXFHLQRoxB32a7fENH',
        'spotify:track:3id4YOaR7JBKJUPOE9VgaE',
        'spotify:track:4j8n7cA99r729g1nAtA6qV',
        'spotify:track:6cvbYMdlVhoAXIpQDmrcIf',
        'spotify:track:30hwT0deSgqiaBMxijn35R',
        'spotify:track:0ItgotO5txriRAp6lXMHJ7',
        'spotify:track:2LYFCSYptjtZLVPzVJEUnm',
        'spotify:track:25cJX61SWZCOlgNuvHf20c',
        'spotify:track:2Cl4HCBmPddQNZEncdoXp0',
        'spotify:track:5M4yti0QxgqJieUYaEXcpw',
        'spotify:track:1M04RE8vg8M2vsVnVaTJBN'
    ],
    tracks: [
        {
        trackId: 'spotify:track:3QLjDkgLh9AOEHlhQtDuhs',
        score: 81,
        lastPlayedAt: 1762912789283
        },
        {
        trackId: 'spotify:track:6LxSe8YmdPxy095Ux6znaQ',
        score: 81,
        lastPlayedAt: 1732923639000
        },
        {
        trackId: 'spotify:track:1CcorUngVSo7k2GX8GLB53',
        score: 80,
        lastPlayedAt: 1733628124000
        },
        {
        trackId: 'spotify:track:3zGIPuryCGrewaMUNPTqUh',
        score: 79,
        lastPlayedAt: 1734313980000
        },
        {
        trackId: 'spotify:track:2CABxnXYCFFA4x4RaPjYZJ',
        score: 78,
        lastPlayedAt: 1734537321000
        },
        {
        trackId: 'spotify:track:2iksjpqL3eraxCBKqNHuqd',
        score: 78,
        lastPlayedAt: 1734857935000
        },
        {
        trackId: 'spotify:track:1eEg6c3d5l9MpOznu25AQM',
        score: 74,
        lastPlayedAt: 1736720248000
        },
        {
        trackId: 'spotify:track:5RnT0WKKGAt6eOmd7SQRJ6',
        score: 73,
        lastPlayedAt: 1737080870000
        },
        {
        trackId: 'spotify:track:0JlMHfblsmG89Nfd12dc1L',
        score: 73,
        lastPlayedAt: 1737228144000
        },
        {
        trackId: 'spotify:track:0rl0hD52ClPrE2240sTRRM',
        score: 73,
        lastPlayedAt: 1737232029000
        },
        {
        trackId: 'spotify:track:278TErqSFSh7yLpL9bZlcU',
        score: 73,
        lastPlayedAt: 1737229935000
        },
        {
        trackId: 'spotify:track:0vZOaZ8s8e9z4Lh8Rxq1xJ',
        score: 73,
        lastPlayedAt: 1737255398000
        },
        {
        trackId: 'spotify:track:7JbMsR4rZh6J77LNafur8U',
        score: 73,
        lastPlayedAt: 1737229938000
        },
        {
        trackId: 'spotify:track:0IugXCCPq78mj3YJXswNKn',
        score: 73,
        lastPlayedAt: 1737233133000
        },
        {
        trackId: 'spotify:track:7dHFW99s5f6dnyrboYTAq8',
        score: 73,
        lastPlayedAt: 1736922429000
        },
        {
        trackId: 'spotify:track:06cqIVC8kRAT02qfHQT65v',
        score: 71,
        lastPlayedAt: 1737959955000
        },
        {
        trackId: 'spotify:track:24bzJwjGBWtGCs7xKIKQsB',
        score: 71,
        lastPlayedAt: 1737959957000
        },
        {
        trackId: 'spotify:track:5d7NvMz2SgyEkvRow7us99',
        score: 71,
        lastPlayedAt: 1737959960000
        },
        {
        trackId: 'spotify:track:4omurqpm7aWH9VVz2Ii4yO',
        score: 71,
        lastPlayedAt: 1737959971000
        },
        {
        trackId: 'spotify:track:1cKfbgfOojLCCBTYvH6J57',
        score: 71,
        lastPlayedAt: 1737963717000
        },
        {
        trackId: 'spotify:track:7EWDXdu3BzLLCuAGrAx4RT',
        score: 71,
        lastPlayedAt: 1737996990000
        },
        {
        trackId: 'spotify:track:3HwXUvdZXDxmvABSsxhGmO',
        score: 71,
        lastPlayedAt: 1738075825000
        },
        {
        trackId: 'spotify:track:0ZFQxmNIOj03o7OMaiPcVX',
        score: 71,
        lastPlayedAt: 1738075832000
        },
        {
        trackId: 'spotify:track:6IyoLWzljeR3ldQo4KWHT6',
        score: 71,
        lastPlayedAt: 1738075842000
        },
        {
        trackId: 'spotify:track:2c7sRekhMGlj7u1WIIzoQu',
        score: 71,
        lastPlayedAt: 1737924434000
        },
        {
        trackId: 'spotify:track:2kn0fLwt9QRorHuGdmk6ze',
        score: 70,
        lastPlayedAt: 1738161713000
        },
        {
        trackId: 'spotify:track:4Ar3oSp4bAw5gz22F70GM7',
        score: 70,
        lastPlayedAt: 1738210222000
        },
        {
        trackId: 'spotify:track:057rZ21MDp8Ld0TgQndNcv',
        score: 70,
        lastPlayedAt: 1738338572000
        },
        {
        trackId: 'spotify:track:7BgyWwbbybJr2IbQoI1gzH',
        score: 70,
        lastPlayedAt: 1738429173000
        },
        {
        trackId: 'spotify:track:2Bhoq5h6nYowuskNUzE9gn',
        score: 70,
        lastPlayedAt: 1738448254000
        },
        {
        trackId: 'spotify:track:6hLjcgRbZcbs1eYT2MODJJ',
        score: 70,
        lastPlayedAt: 1738448850000
        },
        {
        trackId: 'spotify:track:2FvmykOV9mwzkCxEWWj1vO',
        score: 69,
        lastPlayedAt: 1738732410000
        },
        {
        trackId: 'spotify:track:2cTvZSCqzjkTMkIypLxUFH',
        score: 67,
        lastPlayedAt: 1739568263000
        },
        {
        trackId: 'spotify:track:2HwEwrqS0YeeJ0EKx15Yz1',
        score: 67,
        lastPlayedAt: 1739568266000
        },
        {
        trackId: 'spotify:track:0oYGloL7eVBTt1at9I8tcM',
        score: 67,
        lastPlayedAt: 1739569975000
        },
        {
        trackId: 'spotify:track:0AyA2lHB4YnQUNa8Y6NNjm',
        score: 66,
        lastPlayedAt: 1739831916000
        },
        {
        trackId: 'spotify:track:7ibRB2S2WOfPKSvYkhcYtj',
        score: 66,
        lastPlayedAt: 1739831919000
        },
        {
        trackId: 'spotify:track:26QJuQfM8PVAWkIm1JRyqq',
        score: 66,
        lastPlayedAt: 1739832186000
        },
        {
        trackId: 'spotify:track:46DQgCLYUqsrfLmvN5Ymre',
        score: 66,
        lastPlayedAt: 1739929774000
        },
        {
        trackId: 'spotify:track:3LT1EIJv0UMGSmzBDk5TaH',
        score: 66,
        lastPlayedAt: 1739942193000
        },
        {
        trackId: 'spotify:track:6luBKkFUt5wTwz7hpLhp12',
        score: 65,
        lastPlayedAt: 1740358772000
        },
        {
        trackId: 'spotify:track:0KdEx2ETCXYZeEVAZS4sJ4',
        score: 64,
        lastPlayedAt: 1740729428000
        },
        {
        trackId: 'spotify:track:2iVlrw3jdHD0popF0iImnW',
        score: 64,
        lastPlayedAt: 1740729438000
        },
        {
        trackId: 'spotify:track:4ihiiVAhf3Ta9h7IytC74L',
        score: 64,
        lastPlayedAt: 1740775877000
        },
        {
        trackId: 'spotify:track:153F2kIE5hnCTBFblgmWkk',
        score: 64,
        lastPlayedAt: 1740535625000
        },
        {
        trackId: 'spotify:track:1Hv1VTm8zeOeybub15mA2R',
        score: 64,
        lastPlayedAt: 1740538072000
        },
        {
        trackId: 'spotify:track:7acjLOXbxtLthMU8Yy55hS',
        score: 64,
        lastPlayedAt: 1740553937000
        },
        {
        trackId: 'spotify:track:78FkoRYVvEH2iBQut4thyI',
        score: 64,
        lastPlayedAt: 1740562780000
        },
        {
        trackId: 'spotify:track:12DYYBuq5IphSL7T4HUZ06',
        score: 64,
        lastPlayedAt: 1740563125000
        },
        {
        trackId: 'spotify:track:0wyzyF8LRP7JBa2mchvuWM',
        score: 64,
        lastPlayedAt: 1740563343000
        },
        {
        trackId: 'spotify:track:1JdbcZqBjvOBmdS3YD6SSI',
        score: 64,
        lastPlayedAt: 1740589634000
        },
        {
        trackId: 'spotify:track:4fF2nOsPektn8js9fG5Cdr',
        score: 64,
        lastPlayedAt: 1740611341000
        },
        {
        trackId: 'spotify:track:3uriNy9YJCNQvOpBPQPTL6',
        score: 64,
        lastPlayedAt: 1740633147000
        },
        {
        trackId: 'spotify:track:0YQznyH9mJn6UTwWFHqy4b',
        score: 64,
        lastPlayedAt: 1740633206000
        },
        {
        trackId: 'spotify:track:78HEzDEs1QUnHB2DbxgC1s',
        score: 64,
        lastPlayedAt: 1740640118000
        },
        {
        trackId: 'spotify:track:1YkI4EAlpLsHUmWWGdh6b6',
        score: 64,
        lastPlayedAt: 1740643160000
        },
        {
        trackId: 'spotify:track:1fASxizDXuywMFIKNnVWec',
        score: 64,
        lastPlayedAt: 1740705904000
        },
        {
        trackId: 'spotify:track:5OVVWBjDB3TPhLyt44A37k',
        score: 64,
        lastPlayedAt: 1740705908000
        },
        {
        trackId: 'spotify:track:1OxNBuk83EeS1Nj0k8mfPZ',
        score: 64,
        lastPlayedAt: 1740706019000
        },
        {
        trackId: 'spotify:track:5dQoiKWoAxqIkVzHZsyOTN',
        score: 64,
        lastPlayedAt: 1740706308000
        },
        {
        trackId: 'spotify:track:0XxXIiZP0rJBS8S841UVdu',
        score: 64,
        lastPlayedAt: 1740710978000
        },
        {
        trackId: 'spotify:track:0eaVIYo2zeOaGJeqZ5TwYz',
        score: 64,
        lastPlayedAt: 1740711763000
        },
        {
        trackId: 'spotify:track:1Rgb55W0TNZThWOW7Qby8a',
        score: 64,
        lastPlayedAt: 1740729399000
        },
        {
        trackId: 'spotify:track:2ClFwxCrSbg472DuKbCpej',
        score: 64,
        lastPlayedAt: 1740729404000
        },
        {
        trackId: 'spotify:track:2FE7j7hucyydvufXGAJCju',
        score: 64,
        lastPlayedAt: 1740729411000
        },
        {
        trackId: 'spotify:track:35XQC70WCJHUi52mIdxXw2',
        score: 64,
        lastPlayedAt: 1740729423000
        },
        {
        trackId: 'spotify:track:7tHr0ZuignrPodrXZWhcJc',
        score: 63,
        lastPlayedAt: 1740878679000
        },
        {
        trackId: 'spotify:track:5JG2UkenJbKghnQiX4b22m',
        score: 63,
        lastPlayedAt: 1740878681000
        },
        {
        trackId: 'spotify:track:4cTKHVuc2qInyxZTo7UP0J',
        score: 63,
        lastPlayedAt: 1740883982000
        },
        {
        trackId: 'spotify:track:39AAohgvtgo3xJlypPoLho',
        score: 63,
        lastPlayedAt: 1740883988000
        },
        {
        trackId: 'spotify:track:4sCCZW0ezEPAexAidFsoVm',
        score: 63,
        lastPlayedAt: 1740883989000
        },
        {
        trackId: 'spotify:track:5QQEPd2wDrDiR4LEbzHHMh',
        score: 63,
        lastPlayedAt: 1740883991000
        },
        {
        trackId: 'spotify:track:2sIbHjfJ3nbMXNz4w03fWv',
        score: 63,
        lastPlayedAt: 1740884263000
        },
        {
        trackId: 'spotify:track:0pUVeEgZuNyFzIMKp67RbS',
        score: 63,
        lastPlayedAt: 1740884865000
        },
        {
        trackId: 'spotify:track:6xE6ZWzK1YDDSYzqOCoQlz',
        score: 63,
        lastPlayedAt: 1740884869000
        },
        {
        trackId: 'spotify:track:0aDIb4saqLfTcssyqaKEqz',
        score: 63,
        lastPlayedAt: 1740981508000
        },
        {
        trackId: 'spotify:track:2XfWWZqfTpNmZdmVgsmqKZ',
        score: 63,
        lastPlayedAt: 1740983724000
        },
        {
        trackId: 'spotify:track:6ScJ1JGzXBU9wuvMueNLN8',
        score: 63,
        lastPlayedAt: 1741049222000
        },
        {
        trackId: 'spotify:track:3Ps8agjwIXiLN5ipfxDklk',
        score: 63,
        lastPlayedAt: 1741049770000
        },
        {
        trackId: 'spotify:track:3YrUiyXE71EVecEWoRoK9L',
        score: 62,
        lastPlayedAt: 1741390739000
        },
        {
        trackId: 'spotify:track:1GAp4csnsbCBncT2v5yfuw',
        score: 62,
        lastPlayedAt: 1741390754000
        },
        {
        trackId: 'spotify:track:7rOVsANP5pEfUfCMBnqXGb',
        score: 62,
        lastPlayedAt: 1741390757000
        },
        {
        trackId: 'spotify:track:43U7HI83dsrYiS7AMDwkqC',
        score: 62,
        lastPlayedAt: 1741409654000
        },
        {
        trackId: 'spotify:track:4zyHmSSneytuFEdU2TbU7w',
        score: 62,
        lastPlayedAt: 1741409658000
        },
        {
        trackId: 'spotify:track:02ABJ3VDKP4ymfgoFCoczy',
        score: 62,
        lastPlayedAt: 1741565800000
        },
        {
        trackId: 'spotify:track:2kkvB3RNRzwjFdGhaUA0tz',
        score: 61,
        lastPlayedAt: 1741740174000
        },
        {
        trackId: 'spotify:track:11m6UgxZF4ZfDQ50eN9bYs',
        score: 61,
        lastPlayedAt: 1741838475000
        },
        {
        trackId: 'spotify:track:7EW7Yivb93qKAtp5qEm5of',
        score: 60,
        lastPlayedAt: 1742069382000
        },
        {
        trackId: 'spotify:track:75n9WHWZAzhB59xSjIHly4',
        score: 57,
        lastPlayedAt: 1743193076000
        },
        {
        trackId: 'spotify:track:0PccUXFHLQRoxB32a7fENH',
        score: 57,
        lastPlayedAt: 1743258173000
        },
        {
        trackId: 'spotify:track:3id4YOaR7JBKJUPOE9VgaE',
        score: 57,
        lastPlayedAt: 1743273392000
        },
        {
        trackId: 'spotify:track:4j8n7cA99r729g1nAtA6qV',
        score: 57,
        lastPlayedAt: 1743273588000
        },
        {
        trackId: 'spotify:track:6cvbYMdlVhoAXIpQDmrcIf',
        score: 57,
        lastPlayedAt: 1743273589000
        },
        {
        trackId: 'spotify:track:30hwT0deSgqiaBMxijn35R',
        score: 57,
        lastPlayedAt: 1743354237000
        },
        {
        trackId: 'spotify:track:0ItgotO5txriRAp6lXMHJ7',
        score: 56,
        lastPlayedAt: 1743472375000
        },
        {
        trackId: 'spotify:track:2LYFCSYptjtZLVPzVJEUnm',
        score: 56,
        lastPlayedAt: 1743473293000
        },
        {
        trackId: 'spotify:track:25cJX61SWZCOlgNuvHf20c',
        score: 56,
        lastPlayedAt: 1743473969000
        },
        {
        trackId: 'spotify:track:2Cl4HCBmPddQNZEncdoXp0',
        score: 56,
        lastPlayedAt: 1743484049000
        },
        {
        trackId: 'spotify:track:5M4yti0QxgqJieUYaEXcpw',
        score: 56,
        lastPlayedAt: 1743651850000
        },
        {
        trackId: 'spotify:track:1M04RE8vg8M2vsVnVaTJBN',
        score: 54,
        lastPlayedAt: 1744082702000
        }
    ],
    source: 'scores'
    }
    [Requesting] Received request for path: /PlaylistHealth/analyze
    [Requesting] Full inputs: {
    sessionToken: "session:temp-1762912312498",
    playlistId: "liked:temp-1762912312498",
    snapshotId: "019a75d0-8102-70fb-ab6b-88d0ee16ee08",
    path: "/PlaylistHealth/analyze"
    }
    Requesting.request {
    sessionToken: 'session:temp-1762912312498',
    playlistId: 'liked:temp-1762912312498',
    snapshotId: '019a75d0-8102-70fb-ab6b-88d0ee16ee08',
    path: '/PlaylistHealth/analyze'
    } => { request: '019a75d0-8264-734d-ad7a-f9d19ba51efc' }
    LibraryCache.getTracks {
    sessionToken: 'session:temp-1762912312498',
    userId: 'temp-1762912312498',
    trackIds: [
        'spotify:track:3QLjDkgLh9AOEHlhQtDuhs',
        'spotify:track:6LxSe8YmdPxy095Ux6znaQ',
        'spotify:track:1CcorUngVSo7k2GX8GLB53',
        'spotify:track:3zGIPuryCGrewaMUNPTqUh',
        'spotify:track:2CABxnXYCFFA4x4RaPjYZJ',
        'spotify:track:2iksjpqL3eraxCBKqNHuqd',
        'spotify:track:1eEg6c3d5l9MpOznu25AQM',
        'spotify:track:5RnT0WKKGAt6eOmd7SQRJ6',
        'spotify:track:0JlMHfblsmG89Nfd12dc1L',
        'spotify:track:0rl0hD52ClPrE2240sTRRM',
        'spotify:track:278TErqSFSh7yLpL9bZlcU',
        'spotify:track:0vZOaZ8s8e9z4Lh8Rxq1xJ',
        'spotify:track:7JbMsR4rZh6J77LNafur8U',
        'spotify:track:0IugXCCPq78mj3YJXswNKn',
        'spotify:track:7dHFW99s5f6dnyrboYTAq8',
        'spotify:track:06cqIVC8kRAT02qfHQT65v',
        'spotify:track:24bzJwjGBWtGCs7xKIKQsB',
        'spotify:track:5d7NvMz2SgyEkvRow7us99',
        'spotify:track:4omurqpm7aWH9VVz2Ii4yO',
        'spotify:track:1cKfbgfOojLCCBTYvH6J57',
        'spotify:track:7EWDXdu3BzLLCuAGrAx4RT',
        'spotify:track:3HwXUvdZXDxmvABSsxhGmO',
        'spotify:track:0ZFQxmNIOj03o7OMaiPcVX',
        'spotify:track:6IyoLWzljeR3ldQo4KWHT6',
        'spotify:track:2c7sRekhMGlj7u1WIIzoQu',
        'spotify:track:2kn0fLwt9QRorHuGdmk6ze',
        'spotify:track:4Ar3oSp4bAw5gz22F70GM7',
        'spotify:track:057rZ21MDp8Ld0TgQndNcv',
        'spotify:track:7BgyWwbbybJr2IbQoI1gzH',
        'spotify:track:2Bhoq5h6nYowuskNUzE9gn',
        'spotify:track:6hLjcgRbZcbs1eYT2MODJJ',
        'spotify:track:2FvmykOV9mwzkCxEWWj1vO',
        'spotify:track:2cTvZSCqzjkTMkIypLxUFH',
        'spotify:track:2HwEwrqS0YeeJ0EKx15Yz1',
        'spotify:track:0oYGloL7eVBTt1at9I8tcM',
        'spotify:track:0AyA2lHB4YnQUNa8Y6NNjm',
        'spotify:track:7ibRB2S2WOfPKSvYkhcYtj',
        'spotify:track:26QJuQfM8PVAWkIm1JRyqq',
        'spotify:track:46DQgCLYUqsrfLmvN5Ymre',
        'spotify:track:3LT1EIJv0UMGSmzBDk5TaH',
        'spotify:track:6luBKkFUt5wTwz7hpLhp12',
        'spotify:track:0KdEx2ETCXYZeEVAZS4sJ4',
        'spotify:track:2iVlrw3jdHD0popF0iImnW',
        'spotify:track:4ihiiVAhf3Ta9h7IytC74L',
        'spotify:track:153F2kIE5hnCTBFblgmWkk',
        'spotify:track:1Hv1VTm8zeOeybub15mA2R',
        'spotify:track:7acjLOXbxtLthMU8Yy55hS',
        'spotify:track:78FkoRYVvEH2iBQut4thyI',
        'spotify:track:12DYYBuq5IphSL7T4HUZ06',
        'spotify:track:0wyzyF8LRP7JBa2mchvuWM',
        'spotify:track:1JdbcZqBjvOBmdS3YD6SSI',
        'spotify:track:4fF2nOsPektn8js9fG5Cdr',
        'spotify:track:3uriNy9YJCNQvOpBPQPTL6',
        'spotify:track:0YQznyH9mJn6UTwWFHqy4b',
        'spotify:track:78HEzDEs1QUnHB2DbxgC1s',
        'spotify:track:1YkI4EAlpLsHUmWWGdh6b6',
        'spotify:track:1fASxizDXuywMFIKNnVWec',
        'spotify:track:5OVVWBjDB3TPhLyt44A37k',
        'spotify:track:1OxNBuk83EeS1Nj0k8mfPZ',
        'spotify:track:5dQoiKWoAxqIkVzHZsyOTN',
        'spotify:track:0XxXIiZP0rJBS8S841UVdu',
        'spotify:track:0eaVIYo2zeOaGJeqZ5TwYz',
        'spotify:track:1Rgb55W0TNZThWOW7Qby8a',
        'spotify:track:2ClFwxCrSbg472DuKbCpej',
        'spotify:track:2FE7j7hucyydvufXGAJCju',
        'spotify:track:35XQC70WCJHUi52mIdxXw2',
        'spotify:track:7tHr0ZuignrPodrXZWhcJc',
        'spotify:track:5JG2UkenJbKghnQiX4b22m',
        'spotify:track:4cTKHVuc2qInyxZTo7UP0J',
        'spotify:track:39AAohgvtgo3xJlypPoLho',
        'spotify:track:4sCCZW0ezEPAexAidFsoVm',
        'spotify:track:5QQEPd2wDrDiR4LEbzHHMh',
        'spotify:track:2sIbHjfJ3nbMXNz4w03fWv',
        'spotify:track:0pUVeEgZuNyFzIMKp67RbS',
        'spotify:track:6xE6ZWzK1YDDSYzqOCoQlz',
        'spotify:track:0aDIb4saqLfTcssyqaKEqz',
        'spotify:track:2XfWWZqfTpNmZdmVgsmqKZ',
        'spotify:track:6ScJ1JGzXBU9wuvMueNLN8',
        'spotify:track:3Ps8agjwIXiLN5ipfxDklk',
        'spotify:track:3YrUiyXE71EVecEWoRoK9L',
        'spotify:track:1GAp4csnsbCBncT2v5yfuw',
        'spotify:track:7rOVsANP5pEfUfCMBnqXGb',
        'spotify:track:43U7HI83dsrYiS7AMDwkqC',
        'spotify:track:4zyHmSSneytuFEdU2TbU7w',
        'spotify:track:02ABJ3VDKP4ymfgoFCoczy',
        'spotify:track:2kkvB3RNRzwjFdGhaUA0tz',
        'spotify:track:11m6UgxZF4ZfDQ50eN9bYs',
        'spotify:track:7EW7Yivb93qKAtp5qEm5of',
        'spotify:track:75n9WHWZAzhB59xSjIHly4',
        'spotify:track:0PccUXFHLQRoxB32a7fENH',
        'spotify:track:3id4YOaR7JBKJUPOE9VgaE',
        'spotify:track:4j8n7cA99r729g1nAtA6qV',
        'spotify:track:6cvbYMdlVhoAXIpQDmrcIf',
        'spotify:track:30hwT0deSgqiaBMxijn35R',
        'spotify:track:0ItgotO5txriRAp6lXMHJ7',
        'spotify:track:2LYFCSYptjtZLVPzVJEUnm',
        'spotify:track:25cJX61SWZCOlgNuvHf20c',
        'spotify:track:2Cl4HCBmPddQNZEncdoXp0',
        'spotify:track:5M4yti0QxgqJieUYaEXcpw',
        'spotify:track:1M04RE8vg8M2vsVnVaTJBN'
    ]
    } => {
    tracks: [
        {
        trackId: 'spotify:track:02ABJ3VDKP4ymfgoFCoczy',
        title: 'I Know - PR1SVX Edit, Slowed + Instrumental',
        artist: 'hazel',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:057rZ21MDp8Ld0TgQndNcv',
        title: 'Once Twice Melody',
        artist: 'Beach House',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:06cqIVC8kRAT02qfHQT65v',
        title: "I Don't Know You",
        artist: 'The Marías',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0AyA2lHB4YnQUNa8Y6NNjm',
        title: 'Sorry 4 What? // LV BELT',
        artist: 'Tory Lanez',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0ItgotO5txriRAp6lXMHJ7',
        title: 'A TU NOMBRE',
        artist: 'Junior H',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0IugXCCPq78mj3YJXswNKn',
        title: 'Summer Night Vibes (House)',
        artist: 'PJ',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0JlMHfblsmG89Nfd12dc1L',
        title: 'Legends',
        artist: 'La Tone',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0KdEx2ETCXYZeEVAZS4sJ4',
        title: 'wonder if you care',
        artist: 'flyingfish',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0PccUXFHLQRoxB32a7fENH',
        title: 'LIQUOR STORE',
        artist: 'Adi T, SCREW',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0XxXIiZP0rJBS8S841UVdu',
        title: 'dance with me',
        artist: 'lucidbeatz',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0YQznyH9mJn6UTwWFHqy4b',
        title: 'El Bandido',
        artist: 'Nicolas Jaar',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0ZFQxmNIOj03o7OMaiPcVX',
        title: 'Alternative Outro',
        artist: 'LUCKI',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0aDIb4saqLfTcssyqaKEqz',
        title: 'patience',
        artist: 'jaydes, Riovaz',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0eaVIYo2zeOaGJeqZ5TwYz',
        title: 'No Pole',
        artist: 'Don Toliver',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0oYGloL7eVBTt1at9I8tcM',
        title: 'PELEAMOS',
        artist: 'elaggume, Fauna Music, VAINY',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0pUVeEgZuNyFzIMKp67RbS',
        title: 'Eyes Without A Face',
        artist: 'Billy Idol',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0rl0hD52ClPrE2240sTRRM',
        title: '4LIFE',
        artist: 'Lemtom',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0vZOaZ8s8e9z4Lh8Rxq1xJ',
        title: 'Rambo El Apodo',
        artist: 'Junior H',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0wyzyF8LRP7JBa2mchvuWM',
        title: 'U Fancy',
        artist: 'Nine Vicious',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:11m6UgxZF4ZfDQ50eN9bYs',
        title: 'Porch Java',
        artist: 'Delorme & Co',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:12DYYBuq5IphSL7T4HUZ06',
        title: 'Laylow',
        artist: 'GoVanni',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:153F2kIE5hnCTBFblgmWkk',
        title: 'Louis Vuitton Ballerinas',
        artist: 'North Posse',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1CcorUngVSo7k2GX8GLB53',
        title: 'Feature Me',
        artist: 'FLO',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1GAp4csnsbCBncT2v5yfuw',
        title: 'For The Better',
        artist: 'Rich Amiri, jaydes',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1Hv1VTm8zeOeybub15mA2R',
        title: 'Smooth Operator - Single Version',
        artist: 'Sade',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1JdbcZqBjvOBmdS3YD6SSI',
        title: 'Studio Addict',
        artist: 'Nine Vicious',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1M04RE8vg8M2vsVnVaTJBN',
        title: 'Transistors',
        artist: 'FRM',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1OxNBuk83EeS1Nj0k8mfPZ',
        title: 'I Lost 200€ in a Club',
        artist: 'Tell',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1Rgb55W0TNZThWOW7Qby8a',
        title: 'its you',
        artist: 'sodistilled',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1YkI4EAlpLsHUmWWGdh6b6',
        title: 'Mice City',
        artist: 'Hotel Ugly',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1cKfbgfOojLCCBTYvH6J57',
        title: 'Way To Go',
        artist: 'Empire Of The Sun',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1eEg6c3d5l9MpOznu25AQM',
        title: 'Ropes',
        artist: 'Scott James',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1fASxizDXuywMFIKNnVWec',
        title: 'I Used To Dream',
        artist: 'Aleksandir',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:24bzJwjGBWtGCs7xKIKQsB',
        title: 'Wildflower',
        artist: 'Beach House',
        available: true,
        tempo: null,
        energy: null,
        kind: 'Outlier'
        },
        {
        idx: 27,
        trackId: 'spotify:track:5P6ByN1elQzHH66vKlAB9a',
        kind: 'Outlier'
        },
        {
        idx: 34,
        trackId: 'spotify:track:30hwT0deSgqiaBMxijn35R',
        kind: 'Outlier'
        },
        {
        idx: 41,
        trackId: 'spotify:track:0NZwAPRO1DqSAprpZHnBiE',
        kind: 'Outlier'
        },
        {
        idx: 48,
        trackId: 'spotify:track:3Vd4fHzwS6pBS3muymjiDi',
        kind: 'Outlier'
        },
        {
        idx: 55,
        trackId: 'spotify:track:3yIGWpmhul23xz9C3PXPQ2',
        kind: 'Outlier'
        },
        {
        idx: 62,
        trackId: 'spotify:track:0QyJXG36Q3Kta662XS8GhY',
        kind: 'Outlier'
        },
        {
        idx: 69,
        trackId: 'spotify:track:4zMbUp4WDZxVeEeBpdgtH4',
        kind: 'Outlier'
        },
        {
        idx: 76,
        trackId: 'spotify:track:3wfpQiQ19leVsNQifDXVam',
        kind: 'Outlier'
        },
        {
        idx: 83,
        trackId: 'spotify:track:20tAOmUzziDG8IPe0mamhH',
        kind: 'Outlier'
        },
        {
        idx: 90,
        trackId: 'spotify:track:3ICYxVhwVsp8FYI3IT2dDV',
        kind: 'Outlier'
        },
        {
        idx: 97,
        trackId: 'spotify:track:2ClFwxCrSbg472DuKbCpej',
        kind: 'Outlier'
        },
        {
        idx: 104,
        trackId: 'spotify:track:4E5N0mYyYFf0QZs3XDeSIj',
        kind: 'Outlier'
        },
        {
        idx: 111,
        trackId: 'spotify:track:47rCs1JJXC6AG20WKbyOUR',
        kind: 'Outlier'
        },
        {
        idx: 118,
        trackId: 'spotify:track:5lCk0ZeN8h76QxNqHEGMZJ',
        kind: 'Outlier'
        },
        {
        idx: 125,
        trackId: 'spotify:track:5dO0z1j9DOgVaZBwLto1aV',
        kind: 'Outlier'
        },
        {
        idx: 132,
        trackId: 'spotify:track:1oic0Wedm3XeHxwaxmwO91',
        kind: 'Outlier'
        },
        {
        idx: 139,
        trackId: 'spotify:track:1JdbcZqBjvOBmdS3YD6SSI',
        kind: 'Outlier'
        },
        {
        idx: 146,
        trackId: 'spotify:track:1YkI4EAlpLsHUmWWGdh6b6',
        kind: 'Outlier'
        },
        {
        idx: 153,
        trackId: 'spotify:track:0ha7Pj6IrFFzrwOHl2uD31',
        kind: 'Outlier'
        },
        {
        idx: 160,
        trackId: 'spotify:track:3tDG0JVZo0Y0KwRVZgYIa7',
        kind: 'Outlier'
        },
        {
        idx: 167,
        trackId: 'spotify:track:5m0eMnsWwzgGsUxe1mhFYR',
        kind: 'Outlier'
        },
        {
        idx: 174,
        trackId: 'spotify:track:3QLjDkgLh9AOEHlhQtDuhs',
        kind: 'Outlier'
        },
        {
        idx: 181,
        trackId: 'spotify:track:119MQfBVx1XVcB4q9PlnJW',
        kind: 'Outlier'
        },
        {
        idx: 188,
        trackId: 'spotify:track:3FPSa57fnk6nIGt2JiUSjo',
        kind: 'Outlier'
        },
        {
        idx: 195,
        trackId: 'spotify:track:0RyekuZ6N0SkpokVwkVnbg',
        kind: 'Outlier'
        }
    ]
    }
    LibraryCache.getTracks {
    sessionToken: 'session:temp-1762912312498',
    userId: 'temp-1762912312498',
    trackIds: [
        'spotify:track:7GkZ2cx7i74zu1piQy3i6T',
        'spotify:track:5RnT0WKKGAt6eOmd7SQRJ6',
        'spotify:track:4gtIYSYu8u2ItBqrhCaChL',
        'spotify:track:5P6ByN1elQzHH66vKlAB9a',
        'spotify:track:30hwT0deSgqiaBMxijn35R',
        'spotify:track:0NZwAPRO1DqSAprpZHnBiE',
        'spotify:track:3Vd4fHzwS6pBS3muymjiDi',
        'spotify:track:3yIGWpmhul23xz9C3PXPQ2',
        'spotify:track:0QyJXG36Q3Kta662XS8GhY',
        'spotify:track:4zMbUp4WDZxVeEeBpdgtH4',
        'spotify:track:3wfpQiQ19leVsNQifDXVam',
        'spotify:track:20tAOmUzziDG8IPe0mamhH',
        'spotify:track:3ICYxVhwVsp8FYI3IT2dDV',
        'spotify:track:2ClFwxCrSbg472DuKbCpej',
        'spotify:track:4E5N0mYyYFf0QZs3XDeSIj',
        'spotify:track:47rCs1JJXC6AG20WKbyOUR',
        'spotify:track:5lCk0ZeN8h76QxNqHEGMZJ',
        'spotify:track:5dO0z1j9DOgVaZBwLto1aV',
        'spotify:track:1oic0Wedm3XeHxwaxmwO91',
        'spotify:track:1JdbcZqBjvOBmdS3YD6SSI',
        'spotify:track:1YkI4EAlpLsHUmWWGdh6b6',
        'spotify:track:0ha7Pj6IrFFzrwOHl2uD31',
        'spotify:track:3tDG0JVZo0Y0KwRVZgYIa7',
        'spotify:track:5m0eMnsWwzgGsUxe1mhFYR',
        'spotify:track:3QLjDkgLh9AOEHlhQtDuhs',
        'spotify:track:119MQfBVx1XVcB4q9PlnJW',
        'spotify:track:3FPSa57fnk6nIGt2JiUSjo',
        'spotify:track:0RyekuZ6N0SkpokVwkVnbg'
    ]
    } => {
    tracks: [
        {
        trackId: 'spotify:track:0NZwAPRO1DqSAprpZHnBiE',
        title: 'You Know the Biss (feat. Project Pat)',
        artist: 'DJ Paul, Project Pat',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0QyJXG36Q3Kta662XS8GhY',
        title: 'Too Fast',
        artist: 'Sonder',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0RyekuZ6N0SkpokVwkVnbg',
        title: 'ok//wassup',
        artist: 'shaw00p, JBA',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:0ha7Pj6IrFFzrwOHl2uD31',
        title: 'Love In Memory',
        artist: 'Finn Rees, SHOLTO',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:119MQfBVx1XVcB4q9PlnJW',
        title: 'numbersnshit',
        artist: 'mynameisntjmack, Tommy Richman',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1JdbcZqBjvOBmdS3YD6SSI',
        title: 'Studio Addict',
        artist: 'Nine Vicious',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1YkI4EAlpLsHUmWWGdh6b6',
        title: 'Mice City',
        artist: 'Hotel Ugly',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:1oic0Wedm3XeHxwaxmwO91',
        title: 'breath away',
        artist: 'Artemas',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:20tAOmUzziDG8IPe0mamhH',
        title: "You Say I'm in Love",
        artist: 'Banes World',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:2ClFwxCrSbg472DuKbCpej',
        title: "I'd stay forever",
        artist: 'whither',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:30hwT0deSgqiaBMxijn35R',
        title: 'Action Figures Fighting',
        artist: 'Hotel Ugly',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:3FPSa57fnk6nIGt2JiUSjo',
        title: 'Crescendo',
        artist: 'ODIE',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:3ICYxVhwVsp8FYI3IT2dDV',
        title: 'locked club',
        artist: 'Deftones',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:3QLjDkgLh9AOEHlhQtDuhs',
        title: 'Best I Ever Had',
        artist: 'Drake',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:3Vd4fHzwS6pBS3muymjiDi',
        title: 'Let Alone The One You Love',
        artist: 'Olivia Dean',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:3tDG0JVZo0Y0KwRVZgYIa7',
        title: 'Me Consume',
        artist: 'Junior H',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:3wfpQiQ19leVsNQifDXVam',
        title: "Summer's Gone",
        artist: 'Masayoshi Takanaka',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:3yIGWpmhul23xz9C3PXPQ2',
        title: 'Off The Ground',
        artist: 'HolyBrune',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:47rCs1JJXC6AG20WKbyOUR',
        title: 'Back To You',
        artist: 'Not for Radio',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:4E5N0mYyYFf0QZs3XDeSIj',
        title: "Summer's Over",
        artist: 'Jordana, TV Girl',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:4gtIYSYu8u2ItBqrhCaChL',
        title: 'Paranoia',
        artist: 'The Marías',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:4zMbUp4WDZxVeEeBpdgtH4',
        title: 'Vueltas',
        artist: 'Not for Radio',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:5P6ByN1elQzHH66vKlAB9a',
        title: 'Understand Me',
        artist: 'Chief Keef, Jeezy',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:5RnT0WKKGAt6eOmd7SQRJ6',
        title: 'Newer Me',
        artist: 'LUCKI',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:5dO0z1j9DOgVaZBwLto1aV',
        title: 'WHO U FOOLIN',
        artist: 'Tommy Richman, mynameisntjmack',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:5lCk0ZeN8h76QxNqHEGMZJ',
        title: 'Vamo a Bailotear',
        artist: 'Cris MJ',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:5m0eMnsWwzgGsUxe1mhFYR',
        title: 'White Tee (with NO1-NOAH)',
        artist: 'Summer Walker, NO1-NOAH',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        },
        {
        trackId: 'spotify:track:7GkZ2cx7i74zu1piQy3i6T',
        title: 'Baller',
        artist: 'NAV',
        available: true,
        tempo: null,
        energy: null,
        valence: null
        }
    ]
    }
