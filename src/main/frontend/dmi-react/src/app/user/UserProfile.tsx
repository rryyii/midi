import type {User} from "../util/MDITypes.ts";
import {Link} from "react-router";

function UserProfile() {
    const userString = localStorage.getItem("user-info");
    if (userString) {
        const userInfo: User = JSON.parse(userString);
        return (
            <div className={"container"}>
                <section className={"d-flex flex-column align-items-start gap-3"}>
                    <img alt="cat" className={"profile-img"} width={"100"} src={"https://hips.hearstapps.com/hmg-prod/images/white-cat-breeds-kitten-in-grass-67bf648a54a3b.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=640:*"}></img>
                    <h4>{userInfo.username}</h4>
                    <p>{userInfo.email}</p>
                </section>
                <Link to={"/edit"} className={"btn btn-outline-primary"}>
                    Edit
                </Link>
            </div>
        );
    }
}

export default UserProfile;