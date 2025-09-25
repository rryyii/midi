export type Game = {
    id: number,
    name: string,
    genres: Array<any>,
    summary: string,
    cover: any,
    platforms: Array<any>,
    totalRating: number,
    totalRatingCount: number,
    firstReleaseDate: number,
};

export type UserGame = {
    id: number,
    game: Game,
    user: User,
    status: string,
    hoursPlayed: number,
    dateAdded: string,
    favorite: boolean,
}

export type User = {
    id: number,
    username: string,
    password: string,
    email: string,
    bio: string,
}

export type ResponseUser = {
    id: number,
    username: string,
    email: string,
}

export type LoginType = {
    username: string,
    password: string,
}
