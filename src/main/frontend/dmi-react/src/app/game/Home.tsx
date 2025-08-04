import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router";
import type {Game} from "../util/MDITypes.ts";

/**
 * Returns a component that currently display's all Games in the Database
 * with the ability to DELETE and ADD new Games.
 * @constructor
 */
function Home() {

    const queryClient = useQueryClient();
    const {data, error} = useQuery({
        queryKey: ["test-key"],
        queryFn: () =>
            fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/games`).then((res) => res.json()),
    });

    const mutation = useMutation({
        mutationFn: async (game: Game) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/rm_game`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(game),
            })
            return await request.json() as Promise<Game>;
        },
        onError: (err) => {
            console.error(err.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["test-key"]});
        },
    });

    const handleSubmit = (e: any, game: Game) => {
        e.preventDefault();
        if (game) {
            mutation.mutate(game);
        }
    }

    if (error) return "error"

    if (data) {
        return (
            <div className={"container"}>
                <Link to={"/add"}>
                    <button className={"btn"} type={"button"}>+</button>
                </Link>
                {data.map((game: any) => {
                    return (
                        <div className="game-container" key={`${game.name}-${game.developer}`}>
                            <h1>{game.name}</h1>
                            <h4>{game.developer}</h4>
                            <h4>{game.publisher}</h4>
                            <h4>{game.genre}</h4>
                            <button onClick={(event) => handleSubmit(event, game)} type={"submit"}
                                    className={"btn del-btn"}>x
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Home;