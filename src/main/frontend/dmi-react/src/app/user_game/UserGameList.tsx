import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import type { ResponseUser } from "../util/MDITypes.ts";
import EditGameStatus from "./EditGameStatus.tsx";
import { useState } from "react";
import UserGameLog from "./UserGameLog.tsx";

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

    const [selectedGame, setSelectedGame] = useState<any>();

    const { data, error } = useQuery({
        queryKey: ["user-game-list", userInfo.id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/games/${userInfo.id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("username") || "none" },
                });
            return await response.json();
        },
    });


    if (error) return "An error occurred";

    if (data) {
        return (
            <div className={"container d-flex flex-grow-1 flex-column gap-3"}>
                <h4>Your Log</h4>
                <div className={"border-bottom w-85"}></div>
                <div className={"row"}>
                    <div className={"col d-flex flex-column gap-3"}>
                        {data.map((game: any) => (
                            <div className={"d-flex flex-column gap-3 align-items-start"} key={`${game.id}-${game.user.id}`}>
                                <div className={"d-flex align-items-center gap-3"}>
                                    <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.game.cover.image_id}.jpg`} loading="lazy" className="game-img" alt={`cover image of ${game.game.name}`}/>
                                    <button type="button" onClick={() => setSelectedGame(game)} className={"btn btn-outline-custom"}>
                                        <i className="fa-solid fa-plus icon-color"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"col"}>
                        {selectedGame ? <UserGameLog game={selectedGame} userInfo={userInfo}/> : ""}
                    </div>
                </div>
            </div>
        );
    }

}


export default UserGameList;