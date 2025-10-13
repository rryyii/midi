import { useLocation } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Genres from "./Genres.tsx";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Platforms from "./Platforms.tsx";
import type { Game } from "../util/MDITypes.ts";
import styles from "./game.module.css"
import { useUser } from "../util/UserHook.tsx";

function Game() {

    const location = useLocation();
    let game = location.pathname.split("/")[2];
    const { data: userInfo } = useUser();
    const [gameId, setGameId] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [failed, setFailed] = useState<boolean>(false)

    const { data, error } = useQuery<Game>({
        queryKey: ["game", game],
        queryFn: async () => {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/game/${game}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
            return await response.json();
        },
    });

    const mutation = useMutation({
        mutationFn: async (gameId: number) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/add_game`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: gameId, user_id: userInfo?.id }),
                    credentials: "include",
                }
            );
            return await request.text();
        },
        onSuccess: () => {
            console.debug("Successfully added a new game to the user's list.");
            setIsOpen(true);
        },
        onError: (error) => {
            console.error("Failed to add a new game to the user's list: ", error.message);
            setFailed(true);
        }

    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        mutation.mutate(gameId);
    };

    if (error) return "An error occurred trying to fetch the game: " + error.message;

    if (data) {
        return (
            <div className={"container"}>
                <div className={"d-flex flex-column gap-5 p-3"}>
                    <div className={"d-flex flex-column align-items-center gap-3"}>
                        <div className={"d-flex flex-row align-items-center gap-3"}>
                            {data.cover != null ? <img src={`https://images.igdb.com/igdb/image/upload/t_720p/${data.cover.image_id}.jpg`} loading="lazy" className={`${styles.mainGameImg} shadow}`} alt={`cover image of ${data.name}`} /> :
                                <h4>{data.name}</h4>}
                            <div className="d-flex flex-column gap-3">
                                <div className={"d-flex gap-3"}>
                                <h4>{data.name}</h4>
                                <form onSubmit={handleSubmit}>
                                    <button onClick={() => setGameId(data.id)} type={"submit"}
                                        className={"btn btn-outline-custom"}>
                                        Add To List
                                    </button>
                                    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                                        <div
                                            className={"position-fixed top-0 m-5 start-0 p-5 w-45 h-45 d-flex justify-content-center align-items-center pop-up shadow"}>
                                            <DialogPanel>
                                                <DialogTitle>
                                                    <p>Successfully added game to your list!</p>
                                                </DialogTitle>
                                                <button onClick={() => setIsOpen(false)} className={"btn btn-outline-custom"}>
                                                    <i className="fa-solid fa-xmark icon-color"></i>
                                                </button>
                                            </DialogPanel>
                                        </div>
                                    </Dialog>
                                    <Dialog open={failed} onClose={() => setFailed(false)}>
                                        <DialogPanel>
                                            <DialogTitle>
                                                <p>Failed to add the game to your list.</p>
                                            </DialogTitle>
                                            <button onClick={() => setIsOpen(false)} className={"btn btn-outline-custom"}>
                                                <i className="fa-solid fa-xmark icon-color"></i>
                                            </button>
                                        </DialogPanel>
                                    </Dialog>
                                </form>
                                </div>
                                <Genres value={data.genres} />
                                <Platforms value={data.platforms} />
                                <p className={`${styles.dateP}`}>First Released - {new Date(data.firstReleaseDate * 1000).toDateString()}</p>
                                <p>{Math.floor(data.totalRating)}/100 out of {data.totalRatingCount} reviews</p>
                            </div>
                        </div>
                        <div className={`${styles.summary}`}>
                            <p>{data.summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;