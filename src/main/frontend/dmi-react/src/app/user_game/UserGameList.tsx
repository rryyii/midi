import {useMutation, useQuery} from "@tanstack/react-query";
import {Link} from "react-router";
import type {ResponseUser} from "../util/MDITypes.ts";
import EditGameStatus from "./EditGameStatus.tsx";

/**
 * Returns a component that display's a User's tracked Games.
 * @constructor
 */
function UserGameList() {

    const userString = localStorage.getItem("user-info");
    if (userString == null) {
        console.error("Failed to retrieve user info.")
        return;
    }
    const userInfo: ResponseUser = JSON.parse(userString);

    const {data, error} = useQuery({
        queryKey: ["user-game-list"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/games/${userInfo.id}`,
                {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });
            return await response.json();
        },
    });

    const mutation = useMutation({
        mutationFn: async ({userGameId}: { userGameId: number }) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/rm_game`,
                {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({id: userGameId}),
                });
            return await request.json();
        },
        onSuccess: () => {
            console.info("Successfully removed game from user list.")
        },
        onError: (error) => {
            console.error("Failed to delete game: " + error.message);
        }
    });

    const handleSubmit = (userGameId: number) => {
        mutation.mutate({userGameId});
    };

    if (error) return "An error occurred";

    if (data) {
        return (
            <div className={"container d-flex flex-column gap-5"}>
                <div className={"btn game-btn"}>
                    <Link className={"btn btn-outline-primary"} to={"/games"}>
                        +
                    </Link>
                </div>
                <ul className={"d-flex flex-row flex-wrap gap-3"}>
                    {data.map((game: any) => (
                        <li key={`${game.game.name}-${game.user.username}`}
                            className={"d-flex flex-column list-game"}>
                            <div>
                                <button onClick={() => {
                                    handleSubmit(game.id)
                                }} type={"submit"}
                                        className={"btn btn-outline-primary"}>x
                                </button>
                            </div>
                            <div className={"d-flex gap-2 p-3"}>
                                <h4>{game.game.name}</h4>
                                {game.game.isFavorite ? "favorite" : "not-favorite"}
                            </div>
                            <div className={"p-1"}>
                                <p>Hours Played: {game.hoursPlayed}</p>
                                <p>Status: {game.status}</p>
                                <EditGameStatus />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

}


export default UserGameList;