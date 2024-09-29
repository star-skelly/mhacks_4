export default {
    EMPTY_GAME: {
        _id: '',

        name: '',
        profile1: '',
        profile2: '',
        winner: '',
        startTime: '',
        profile1EndTime: '',
        profile2EndTime: '',
        profile1Path: [0],
        profile2Path: [0],
        startTrack: 0,
        endTrack: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    EMPTY_TRACK: {
        index: '',
        name: '',
        genres: '',
        artist: '',
        album: '',
        image: '',
        preview: '',
        danceability: 0,
        energy: 0,
        loudness: 0,
        speechiness: 0,
        acousticness: 0,
        instrumentalness: 0,
        liveness: 0,
        valence: 0,
        tempo: 0,
        popularity: 0,
        albumReleaseDate: '',
    },
    EMPTY_PROFILE: {
        _id: '',
        username: '',
        activeGame: '',
        games: [],
    },
    EMPTY_GLOBAL_STATE: {
        profile_id: '',
    },
    EMPTY_RES: {
        status: 0,
        success: false,
        data: undefined,
        errorMessage: 'This is the initial response message',
    },

    HOSTED_AT: 'https://mhacks-beta.vercel.app',

    // SERVER_URL: 'https://beck-six.vercel.app',
    SERVER_URL: 'http://localhost:4000',

    SPOTIFY_CONFIG: {
        clientId: "f7c02a3be86b4a47a0779eec1eac1281",
        clientSecret: "31f9ed5270b148edadd15b5d6efea510",
        redirectUri: `http://localhost:3000/callback`, // Replace with your redirect URI
        scope: 'user-read-currently-playing user-read-playback-state',
    },

    BRIGHT_PINK: '#FF00BC',
} 