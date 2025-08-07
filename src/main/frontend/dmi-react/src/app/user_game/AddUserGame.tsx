import {useMutation, useQuery} from "@tanstack/react-query";
import type {ResponseUser} from "../util/MDITypes.ts";
import {useState} from "react";
import {Link} from "react-router";

function AddUserGame() {

    const [gameId, setGameId] = useState<number>(0);
    const userString = localStorage.getItem("user-info");
    if (!userString) {
        return;
    }
    const userInfo : ResponseUser = JSON.parse(userString);

    const {data, error} = useQuery({
        queryKey: ["test-key"],
        queryFn: () =>
            fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/games`).then((res) => res.json()),
    });

    if (error) return "An error occurred";

    const mutation = useMutation({
        mutationFn: async (gameId : number) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/add_game`,
                {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({id: gameId, userId : userInfo.id}),
                }
            );
            return request.json();
        },
        onSuccess: () => {
            console.debug("Successfully added a new game to the user's list.");
        },
        onError: (error) => {
            console.error("Failed to add a new game to the user's list: ", error.message);
        }

    });

    const handleSubmit = (e : any) => {
        e.preventDefault();
        mutation.mutate(gameId);
    };

    if (data) {
        return (
            <div className={"container"}>
                <div className={"btn-group"}>
                    <Link to={"/add"} className={"btn btn-outline-primary"}>
                        +
                    </Link>
                    <Link to={"/delete"} className={"btn btn-outline-primary"}>
                        -
                    </Link>
                </div>
                {data.map((game: any) => {
                    return (
                        <div className="game-container" key={`${game.name}-${game.developer}`}>
                            <h1>{game.name}</h1>
                            <h4>{game.developer}</h4>
                            <h4>{game.publisher}</h4>
                            <h4>{game.genre}</h4>
                            <form onSubmit={handleSubmit}>
                                <button onClick={() => setGameId(game.id)} type={"submit"} className={"btn btn-outline-primary"}>+</button>
                            </form>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default AddUserGame;