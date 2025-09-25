import {Link, useNavigate} from "react-router";
import {useUser} from "../util/UserHook.tsx";
import {useQueryClient} from "@tanstack/react-query";
import Search from "./Search.tsx"
import styles from "./layout.module.css"

/**
 * Returns the component for the Navigation Bar.
 * @constructor
 */
function Nav() {

    const {data: user} = useUser();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return (
        <nav className={`navbar navbar-expand justify-content-between p-3 ${styles.nav}`}>
            <ul className={"navbar-nav"}>
                <li className={"nav-item"}>
                    <Link to={"/"} className={`nav-link ${styles.linkText}`}>
                        Home
                    </Link>
                </li>
                {user ?
                    <>
                        <li className={"nav-item"}>
                            <Link to={"/games"} className={`nav-link ${styles.linkText}`}>
                                Games
                            </Link>
                        </li>
                        <li className={"nav-item"}>
                            <Link to={"/list"} className={`nav-link ${styles.linkText}`}>
                                Your List
                            </Link>
                        </li>
                        <li className={"nav-item dropdown"}>
                            <a href={"#"} role={"button"} data-bs-toggle={"dropdown"} aria-expanded={"false"}
                               className={`nav-link dropdown-toggle ${styles.linkText}`}>
                                Account
                            </a>
                            <ul className={`dropdown-menu ${styles.dropDown} dropdown-custom`}>
                                <li>
                                    <Link to={`/profile/${user.id}`} className={"dropdown-item"}>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={() => {
                                        localStorage.removeItem("user-info");
                                        queryClient.invalidateQueries({queryKey: ["user-info"]}).then(r => console.log(r));
                                        navigate("/");
                                    }} className={"dropdown-item"}>Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </>
                    :
                    <>
                        <li className={"nav-item"}>
                            <Link to={"/login"} className={`nav-link ${styles.linkText}`}>
                                Login
                            </Link>
                        </li>
                        <li className={"nav-item"}>
                            <Link to={"/register"} className={`nav-link ${styles.linkText}`}>
                                Register
                            </Link>
                        </li>
                    </>
                }
            <li>
                <Search />
            </li>
            </ul>
        </nav>
    );
}

export default Nav;