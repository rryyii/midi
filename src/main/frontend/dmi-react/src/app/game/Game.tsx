import {useLocation} from "react-router";
import {useMutation} from "@tanstack/react-query";
import type {ResponseUser} from "../util/MDITypes.ts";
import {useState} from "react";
import Genres from "./Genres.tsx";

function Game() {

    const location = useLocation();
    const game = location.state?.game;
    const userString = localStorage.getItem("user-info");
    if (!userString) {
        return;
    }
    const userInfo: ResponseUser = JSON.parse(userString);
    const [gameId, setGameId] = useState<number>(0);


    const mutation = useMutation({
        mutationFn: async (gameId: number) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/add_game`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({id: gameId, userId: userInfo.id}),
                }
            );
            return await request.json();
        },
        onSuccess: () => {
            console.debug("Successfully added a new game to the user's list.");
        },
        onError: (error) => {
            console.error("Failed to add a new game to the user's list: ", error.message);
        }

    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        mutation.mutate(gameId);
    };

    return (
        <div className={"container"}>
            <form onSubmit={handleSubmit}>
                <button onClick={() => setGameId(game.id)} type={"submit"}
                        className={"btn btn-outline-primary"}>
                    +
                </button>
            </form>
            <div>
                <h1>{game.name}</h1>
                <Genres value={game.genres}/>
                <p>{game.summary}</p>
            </div>
        </div>
    );
}

export default Game;