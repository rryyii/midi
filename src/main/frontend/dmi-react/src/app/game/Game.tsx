import {useLocation} from "react-router";
import {useMutation, useQuery} from "@tanstack/react-query";
import type {ResponseUser} from "../util/MDITypes.ts";
import {useState} from "react";
import Genres from "./Genres.tsx";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Platforms from "./Platforms.tsx";

function Game() {

    const location = useLocation();
    let game = location.pathname.split("/")[2];
    const userString = localStorage.getItem("user-info");
    if (!userString) {
        return;
    }
    const userInfo: ResponseUser = JSON.parse(userString);
    const [gameId, setGameId] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [failed, setFailed] = useState<boolean>(false)

    const {data, error} = useQuery({
        queryKey: ["game", game],
        queryFn: async () => {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/game/${game}`,
                {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });
            return await response.json();
        },
    });

    const mutation = useMutation({
        mutationFn: async (gameId: number) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/add_game`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({id: gameId, user_id: userInfo.id}),
                }
            );
            return await request.json();
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
                <form onSubmit={handleSubmit}>
                    <button onClick={() => setGameId(data.id)} type={"submit"}
                            className={"btn btn-outline-custom"}>
                        +
                    </button>
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                        <div
                            className={"position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50"}>
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
                <div className={"d-flex flex-column gap-3 p-3"}>
                    <div className={"d-flex align-items-center gap-3"}>
                        <h2>{data.name}</h2>
                        {data.cover != null ? <img src={`${data.cover.url}`} width={"100px"} height={"100px"} alt={`cover image of ${data.name}`}/> :
                            <h4>{data.name}</h4>}
                    </div>
                    <Genres value={data.genres}/>
                    <Platforms value={data.platforms}/>
                    <p>First Released: {new Date(data.first_release_date * 1000).toDateString()}</p>
                    <div>
                        <p>{parseInt(data.total_rating)}/100 out of {data.total_rating_count} reviews</p>
                    </div>
                    <p>{data.summary}</p>
                </div>
            </div>
        );
    }
}

export default Game;