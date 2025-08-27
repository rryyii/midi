import type {User} from "../util/MDITypes.ts";
import {Link} from "react-router";

function UserProfile() {
    const userString = localStorage.getItem("user-info");
    if (userString) {
        const userInfo: User = JSON.parse(userString);
        return (
            <div className={"container d-flex flex-grow-1 flex-column gap-3 p-3"}>
                <div>
                    <section className={"d-flex flex-column align-items-start gap-3"}>
                        <div className={"d-flex flex-row gap-3"}>
                            <h4>{userInfo.username}</h4>
                            <Link to={"/profile/edit"} className={"btn btn-outline-primary"}>
                                Edit Profile
                            </Link>
                        </div>
                        <p>{userInfo.email}</p>
                        <p className={"user-bio"}>{userInfo.bio}</p>
                    </section>
                </div>
                <div>
                    <h4>Your Favorites</h4>
                    <div className={"border-bottom w-50"}></div>
                </div>
            </div>
        );
    }
}

export default UserProfile;