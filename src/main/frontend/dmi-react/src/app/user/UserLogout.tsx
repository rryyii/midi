import {useNavigate} from "react-router";

function UserLogout() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("user-info");
        navigate("/");
    }

    return (
        <div className={"d-flex flex-column justify-content-center align-items-center"}>
            <h1>Are you sure you would like to logout?</h1>
            <button onClick={() => handleLogout()} className={"btn btn-outline-primary"}>Yes</button>
        </div>
    );
}

export default UserLogout;