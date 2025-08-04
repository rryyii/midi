import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import type {Game} from "../util/MDITypes.ts";

/**
 * Returns a component that allows for the creation of new Games.
 * @constructor
 */
function AddGame() {

    const [name, setName] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const [publisher, setPublisher] = useState<string>("");
    const [developer, setDeveloper] = useState<string>("");
    const [date, setDate] = useState<string>("");


    const mutation = useMutation({
        mutationFn: async (gameInfo: Game) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/add_game`, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify((gameInfo)),
            });
            return await request.json() as Promise<Game>;
        },
        onError: (err) => {
            console.error("Mutation Failed: ", err.message);
        }
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const gameInfo: Game = {
            name: name ?? "",
            genre: genre ?? "",
            publisher: publisher ?? "",
            developer: developer ?? "",
            releaseDate: new Date(date) ?? "",
        }
        mutation.mutate(gameInfo);
    };

    return (
        <div id={"addGame"} className={"container"}>
            <form onSubmit={handleSubmit}>
                <fieldset className={"nameField"}>
                    <label htmlFor={"nameId"} className={"form-label"}>Name:</label>
                    <input value={name} onChange={(event) => setName(event.target.value)} id={"nameId"} type={"text"}
                           placeholder={"name"} className={"form-control"}/>
                    <label htmlFor={"genreId"} className={"form-label"}>Genre:</label>
                    <input value={genre} onChange={(event) => setGenre(event.target.value)} id={"genreId"} type={"text"}
                           placeholder={"genre"} className={"form-control"}/>
                </fieldset>
                <label htmlFor={"dateId"}>Release Date:</label>
                <input value={date} onChange={(event) => setDate(event.target.value)} type={"date"}/>
                <fieldset className={"devField"}>
                    <label htmlFor={"developerId"} className={"form-label"}>Developer:</label>
                    <input value={developer} onChange={(event) => setDeveloper(event.target.value)} id={"developerId"}
                           type={"text"} placeholder={"developer"} className={"form-control"}/>
                    <label htmlFor={"publisherId"} className={"form-label"}>Publisher:</label>
                    <input value={publisher} onChange={(event) => setPublisher((event.target.value))} id={"publisherId"}
                           type={"text"} placeholder={"publisher"} className={"form-control"}/>
                </fieldset>
                <button type={"submit"} className={"btn"}>Submit</button>
            </form>
        </div>
    );
}

export default AddGame;