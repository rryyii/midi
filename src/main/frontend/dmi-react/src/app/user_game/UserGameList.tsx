import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router";
import type {ResponseUser} from "../util/MDITypes.ts";
import EditGameStatus from "./EditGameStatus.tsx";

/**
 * Returns a component that display's a User's tracked Games.
 * @constructor
 */
function UserGameList() {

    const queryClient = useQueryClient();

    const userString = localStorage.getItem("user-info");
    if (userString == null) {
        console.error("Failed to retrieve user info.")
        return;
    }
    const userInfo: ResponseUser = JSON.parse(userString);

    const {data, error} = useQuery({
        queryKey: ["user-game-list", userInfo.id],
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
            console.info("Successfully removed game from user list.");
            queryClient.invalidateQueries({queryKey: ["user-game-list", userInfo.id]});
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
            <div className={"container d-flex flex-grow-1 flex-column gap-5"}>
                <table className={"table table-dark"}>
                    <thead>
                        <tr>
                            <th scope="col">Game</th>
                            <th scope="col">Status</th>
                            <th scope="col">Hours</th>
                            <th scope="col">Favorite</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((game: any) => (
                            <tr key={`${game.game.id}-${game.id}`}>
                                <td>
                                    <Link to={`/games/${game.game.id}`}>
                                        {game.game.name}
                                    </Link>
                                </td>
                                <td>
                                    {game.status}
                                </td>
                                <td>
                                    {game.hoursPlayed}
                                </td>
                                <td>
                                    {game.favorite ? <i className="fa-sharp fa-solid fa-star"></i> : ""}
                                </td>
                                <td className={"d-flex"}>
                                    <EditGameStatus game={game}/>
                                    <div>
                                        <button onClick={() => {
                                            handleSubmit(game.id)
                                        }} type={"submit"}
                                                className={"btn"}>
                                            <i className="fa-solid fa-xmark icon-color"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}


export default UserGameList;