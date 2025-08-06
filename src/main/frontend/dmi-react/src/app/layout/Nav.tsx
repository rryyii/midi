import {Link} from "react-router";

/**
 * Returns the component for the Navigation Bar.
 * @constructor
 */
function Nav() {
    return (
        <nav className={"navbar navbar-expand bg-body-secondary justify-content-center"}>
            <ul className={"navbar-nav"}>
                <li className={"nav-item"}>
                    <Link to={"/"} className={"nav-link"}>
                        Home
                    </Link>
                </li>
                {localStorage.getItem("username") == null ?
                    <>
                        <li className={"nav-item"}>
                            <Link to={"/login"} className={"nav-link"}>
                                Login
                            </Link>
                        </li>
                        <li className={"nav-item"}>
                            <Link to={"/register"} className={"nav-link"}>
                                Register
                            </Link>
                        </li>
                    </>
                    :
                    <>
                        <li className={"nav-item"}>
                            <Link to={"/list"} className={"nav-link"}>
                                Your List
                            </Link>
                        </li>
                        <li className={"nav-item dropdown"}>
                            <a href={"#"} role={"button"} data-bs-toggle={"dropdown"} aria-expanded={"false"} className={"nav-link dropdown-toggle"}>
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