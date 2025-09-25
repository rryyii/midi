import {Link, useLocation} from "react-router";
import { useQuery } from "@tanstack/react-query";
import type {Game} from "../util/MDITypes.ts";
import { useEffect, useState } from "react";
import styles from "./user.module.css"
import { useUser } from "../util/UserHook.tsx";

function UserProfile() {

    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const [currentUser, setCurrentUser] = useState<boolean>(false);
    const {data: userInfo} = useUser();
    const auth = localStorage.getItem("username") ?? undefined;

    useEffect(() => {
        if (userInfo?.id == parseInt(userId)) {
            setCurrentUser(true);
        }
    }, [userInfo?.id, userId])

    const {data, error} = useQuery({
        queryKey: ["user", userInfo],
        queryFn: async () => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user_favorites/${userId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                })
            return await request.json();
        }
    });

    if (error) return "Failed to load user profile data";

    if (data) {
        return (
            <div className={"container d-flex flex-grow-1 flex-column gap-3 p-3"}>
                <div>
                    <section className={"d-flex flex-column align-items-start gap-3"}>
                        <div className={"d-flex flex-row gap-3"}>
                            <h4>{userInfo.username}</h4>
                            {currentUser ? <Link to={"/profile/edit"} className={"btn btn-outline-custom"}>
                                Edit Profile
                            </Link> : ""}
                        </div>
                        <p>{userInfo.email}</p>
                    </section>
                </div>
                <div>
                    <h4>Bio</h4>
                    <div className="border-bottom w-25"></div>
                    {userInfo.bio ? <p className={`${styles.userBio}`}>{userInfo.bio}</p> : "No bio set"}
                </div>
                <div>
                    <h4>Your Favorites</h4>
                    <div className={"border-bottom w-50"}></div>
                    <ul className={`${styles.favoritesList} d-flex flex-row gap-3 p-3`}>
                        {data.length > 0 ? data.map((game: Game) => (
                            <li key={`${game.id}-favorite`} className={"game-card"}>
                                <Link to={`/games/${game.id}`}>
                                    <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg`} loading="lazy" className="game-img shadow" alt={`cover image of ${game.name}`}/>
                                </Link>
                            </li>
                            ))
                        : "No favorited games"}
                    </ul>
                </div>
            </div>
        )
    }
}

export default UserProfile;