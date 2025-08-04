import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import type {LoginType} from "../util/MDITypes.ts";

function UserLogin() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const mutation = useMutation({
        mutationFn: async (user: LoginType) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/login_user`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(user),
                });
            const token = request.headers.get("Authorization");
            return {token: token};
        },
        onSuccess: (data) => {
            if (data.token) {
                console.debug("Login success, storing JWT.");
                localStorage.setItem("username", data.token);
            }
        },
        onError: (error: any) => {
            console.error("Login error:", error);
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
        <div className={"container"}>
            <form id={"loginForm"} onSubmit={handleSubmit}>
                <fieldset className={"userField"}>
                    <label htmlFor={"userId"} className={"form-label"}>Username</label>
                    <input value={username} onChange={(event) => {
                        setUsername(event.target.value)
                    }} id="userId" type={"text"} className={"form-control"}/>
                    <label htmlFor={"passwordId"} className={"form-label"}>Password</label>
                    <input value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }} id="passwordId" type={"password"} className={"form-control"}/>
                </fieldset>
                <button type={"submit"} className={"btn"}>Submit</button>
            </form>
        </div>
    );
}

export default UserLogin;