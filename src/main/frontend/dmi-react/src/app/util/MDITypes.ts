export type Game = {
    id: number,
    name: string,
    genres: Array<any>,
    summary: string,
    cover: any,
    platforms: Array<any>,
    total_rating: number,
    total_rating_count: number,
    first_release_date: number,
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
