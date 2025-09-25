import { useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import type { UserGame } from "../util/MDITypes.ts";
import {Link} from "react-router"
import EditGameStatus from "./EditGameStatus.tsx";
import { useUser } from "../util/UserHook.tsx";

/**
 * Returns a component that display's a User's tracked Games.
 * @constructor
 */
function UserGameList({status} : {status: string}) {

    const queryClient = useQueryClient();
    const {data: userInfo} = useUser();

    const { data, error } = useQuery({
        queryKey: ["user-game-list", userInfo?.id, status],
        queryFn: async () => {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/games/${userInfo?.id}?status=${status}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
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
                    body: JSON.stringify({id: userGameId, user_id: userInfo?.id}),
                    credentials: "include",
                });
            return await request.json();
        },
        onSuccess: () => {
            console.info("Successfully removed game from user list.");
            queryClient.invalidateQueries({queryKey: ["user-game-list", userInfo?.id]});
        },
        onError: (error) => {
            console.error("Failed to delete game: " + error.message);
        }
    });

    const handleSubmit = (userGameId: number) => {
        mutation.mutate({userGameId});
    };


    if (error) return "An error occurred";

    if (data && data.length == 0) return "No Games";

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
                        {data.map((game: UserGame) => (
                            <tr key={`${game.game.id}-${game.id}`}>
                                <td className={"d-flex gap-3 align-items-center"}>
                                    <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.game.cover.image_id}.jpg`} loading="lazy" className={"game-img"} alt={`cover image of ${game.game.name}`}/>
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
                                <td >
                                    <EditGameStatus gameId={game.id} gstatus={status}/>
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