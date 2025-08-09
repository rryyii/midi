import {Link} from "react-router";

/**
 * Returns the component for the Navigation Bar.
 * @constructor
 */
function Nav() {
    return (
        <nav className={"navbar navbar-expand justify-content-between p-3"}>
            <ul className={"navbar-nav"}>
                <li className={"nav-item"}>
                    <Link to={"/"} className={"nav-link link-text"}>
                        Home
                    </Link>
                </li>
                {localStorage.getItem("username") == null ?
                    <>
                        <li className={"nav-item"}>
                            <Link to={"/login"} className={"nav-link link-text"}>
                                Login
                            </Link>
                        </li>
                        <li className={"nav-item"}>
                            <Link to={"/register"} className={"nav-link link-text"}>
                                Register
                            </Link>
                        </li>
                    </>
                    :
                    <>
                        <li className={"nav-item"}>
                            <Link to={"/list"} className={"nav-link link-text"}>
                                Your List
                            </Link>
                        </li>
                        <li className={"nav-item dropdown"}>
                            <a href={"#"} role={"button"} data-bs-toggle={"dropdown"} aria-expanded={"false"}
                               className={"nav-link dropdown-toggle link-text"}>
                                Account
                            </a>
                            <ul className={"dropdown-menu"}>
                                <li>
                                    <Link to={"/profile"} className={"dropdown-item"}>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/logout"} className={"dropdown-item"}>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
}

export default Nav;