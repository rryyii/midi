export type Game = {
    name: string | "Unset Name",
    genre: string | "Unset Genre",
    publisher: string | "Unset Publisher",
    developer: string | "Unset Developer",
    releaseDate: Date | "Unset Date",
};

export type User = {
    username: string,
    password: string,
    email: string,
}

export type LoginType = {
    username: string,
    password: string,
}
