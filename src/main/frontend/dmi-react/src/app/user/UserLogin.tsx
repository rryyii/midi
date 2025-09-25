import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {LoginType} from "../util/MDITypes.ts";
import {useNavigate, Link} from "react-router";
import styles from "./user.module.css"

function UserLogin() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (user: LoginType) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/login_user`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(user),
                    credentials: "include",
                });
            const body = await request.json();
            return {body: body};
        },
        onSuccess: (data) => {
            localStorage.setItem("user-info", JSON.stringify(data.body));
            queryClient.invalidateQueries({queryKey: ["user-info"]});
            navigate("/");

        },
        onError: (error: any) => {
            console.error("Login error:", error);
            setVisible(true);
        },
    })

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user: LoginType = {
            username: username,
            password: password,
        }
        mutation.mutate(user);
    }

    return (
        <div className={"container d-flex justify-content-center align-items-center flex-grow-1 flex-column gap-3 p-3"}>
            <h4>Welcome to DIMI!</h4>
            <div className={"border-bottom w-25"}></div>
            {visible ? <p>Either your username or password were incorrect</p> : ""}
            <form id={`${styles.loginForm}`} className={"d-flex flex-column justify-content-center"} onSubmit={handleSubmit}>
                <fieldset className={`${styles.userField} d-flex flex-column gap-3`}>
                    <input value={username} placeholder={"username"} onChange={(event) => {
                        setUsername(event.target.value)
                    }} id="userId" type={"text"} className={"search-bar"}/>
                    <input value={password} placeholder={"password"} onChange={(event) => {
                        setPassword(event.target.value)
                    }} id="passwordId" type={"password"} className={"search-bar"}/>
                    <Link to={"/"}>
                        <small>Forgot your password?</small>
                    </Link>
                </fieldset>
                <button type={"submit"} className={"btn btn-outline-custom"}>Log In</button>
            </form>
        </div>
    );
}

export default UserLogin;