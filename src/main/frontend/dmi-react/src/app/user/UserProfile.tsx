import type {User} from "../util/MDITypes.ts";
import {Link} from "react-router";
import { useQuery } from "@tanstack/react-query";
import type {Game} from "../util/MDITypes.ts";

function UserProfile() {
    const userString = localStorage.getItem("user-info");
    if (!userString) {
        return null;
    }
    const userInfo: User = JSON.parse(userString);
    const auth = localStorage.getItem("username") ?? undefined;

    const {data, error} = useQuery({
        queryKey: ["user", userString],
        queryFn: async () => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user_favorites/${userInfo.id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": auth},
                })
            return await request.json();
        }
    });

    if (data) {
        return (
            <div className={"container d-flex flex-grow-1 flex-column gap-3 p-3"}>
                <div>
                    <section className={"d-flex flex-column align-items-start gap-3"}>
                        <div className={"d-flex flex-row gap-3"}>
                            <h4>{userInfo.username}</h4>
                            <Link to={"/profile/edit"} className={"btn btn-outline-custom"}>
                                Edit Profile
                            </Link>
                        </div>
                        <p>{userInfo.email}</p>
                    </section>
                </div>
                <div>
                    <h4>Bio</h4>
                    <div className="border-bottom w-25"></div>
                    <p className={"user-bio"}>{userInfo.bio}</p>
                </div>
                <div>
                    <h4>Your Favorites</h4>
                    <div className={"border-bottom w-50"}></div>
                    <ul className="favorites-list">
                        {data.map((game: Game) => (
                            <li>
                                {game.name}
                            </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default UserProfile;