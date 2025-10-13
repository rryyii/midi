import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { UserGame } from "../util/MDITypes.ts";
import { Link } from "react-router";
import EditGameStatus from "./EditGameStatus.tsx";
import { useUser } from "../util/UserHook.tsx";
import styles from "./user-game.module.css";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from "react";

/**
 * Returns a component that display's a User's tracked Games.
 * @constructor
 */
function UserGameList({ status }: { status: string }) {

    const queryClient = useQueryClient();
    const { data: userInfo } = useUser();
    const [open, setOpen] = useState<boolean>(false);

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
        mutationFn: async ({ userGameId }: { userGameId: number }) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/rm_game`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: userGameId, user_id: userInfo?.id }),
                    credentials: "include",
                });
            return await request.text();
        },
        onSuccess: () => {
            console.info("Successfully removed game from user list.");
            queryClient.invalidateQueries({ queryKey: ["user-game-list", userInfo?.id] });
            setOpen(true);
        },
        onError: (error) => {
            console.error("Failed to delete game: " + error.message);
        }
    });

    const handleSubmit = (userGameId: number) => {
        mutation.mutate({ userGameId });
    };


    if (error) return "An error occurred";

    if (data && data.length == 0) return "No Games";

    if (data) {
        return (
            <div className={"container d-flex flex-grow-1 flex-column gap-5"}>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <div
                        className={"position-fixed top-0 m-5 start-0 p-5 w-45 h-45 d-flex justify-content-center align-items-center pop-up shadow"}>
                        <DialogPanel>
                            <DialogTitle>
                                <p>Removed game from your list</p>
                            </DialogTitle>
                            <button onClick={() => setOpen(false)} className={"btn btn-outline-custom"}>
                                <i className="fa-solid fa-xmark icon-color"></i>
                            </button>
                        </DialogPanel>
                    </div>
                </Dialog>
                <table className={`${styles.tableCustom}`}>
                    <thead>
                        <tr>
                            <th scope="col">Cover</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Hours</th>
                            <th scope="col">Favorite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((game: UserGame) => (
                            <tr key={`${game.game.id}-${game.id}`}>
                                <td>
                                    <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.game.cover.image_id}.jpg`} loading="lazy" className={"game-img"} alt={`cover image of ${game.game.name}`} />
                                </td>
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
                                <td >
                                    <EditGameStatus gameId={game.id} gstatus={status} />
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