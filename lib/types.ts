export type Res = {
    status: number,
    success: boolean,
    data: any,
    errorMessage: string,
}

export type Attribute = 'Danceability' | 'Energy' | 'Loudness' | 'Speechiness' | 'Acousticness' | 'Instrumentalness' | 'Liveness' | 'Valence' | 'Popularity';

export type Profile = {
    _id: string,
    username: string,
    activeGame: string,
    games: string[],
}

export type Game = {
    _id: string,

    name: string,
    profile1: string,
    profile2: string,
    winner: string,
    startTime: string,
    profile1EndTime: string,
    profile2EndTime: string,
    profile1Path: number[],
    profile2Path: number[],
    startTrack: number,
    endTrack: number,

    createdAt: Date,
    updatedAt: Date,
}

export type Track = {
    index: string,
    name: string,
    genres: string,
    artist: string,
    album: string,
    image: string,
    preview: string,
    popularity: number,
    danceability: number,
    energy: number,
    loudness: number,
    speechiness: number,
    acousticness: number,
    instrumentalness: number,
    liveness: number,
    tempo: number,
    valence: number,
    albumReleaseDate: string,
}