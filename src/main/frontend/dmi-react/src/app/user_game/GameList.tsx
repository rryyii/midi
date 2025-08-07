import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router";
import type {ResponseUser} from "../util/MDITypes.ts";

/**
 * Returns a component that display's a User's tracked Games.
 * @constructor
 */
function GameList() {

    const userString = localStorage.getItem("user-info");
    if (userString == null ) return;
    const userInfo: ResponseUser = JSON.parse(userString);

    const {data, error} = useQuery({
        queryKey: ["user-game-list"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/games/${userInfo.id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
            return await response.json();
        },
    });

    if (error) return "An error occurred";

    if (data) {
        return (
            <div className={"container d-flex flex-column gap-5"}>
                <div className={"btn-group game-btn"} role={"group"}>
                    <Link className={"btn btn-outline-primary"} to={"/add_user_game"}>
                        +
                    </Link>
                    <Link className={"btn btn-outline-primary"} to={"/remove_user_game"}>
                        x
                    </Link>
                </div>
                <h1>Your Currently Tracked Games</h1>
                <ul className={"list-group"}>
                    {data.map((game : any) => (
                        <li key={`${game.game.name}-${game.user.username}`} className={"list-group-item d-flex flex-column list-game"}>
                            <div className={"d-flex gap-2 p-3"}>
                                <h4>{game.game.name}</h4>
                                |
                                <h4>{game.game.genre}</h4>
                                |
                                <h4>{game.game.developer}</h4>
                            </div>
                            <div className={"p-2 border-bottom"}></div>
                            <div className={"p-3"}>
                                <h4>Hours Played: {game.hoursPlayed}</h4>
                                <h4>Date Added: {game.dateAdded}</h4>
                                <h4>Status: {game.status}</h4>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

}


export default GameList;