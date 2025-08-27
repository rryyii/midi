import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {LoginType} from "../util/MDITypes.ts";
import {useNavigate} from "react-router";

function UserLogin() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (user: LoginType) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/login_user`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(user),
                });
            const token = request.headers.get("Authorization");
            const body = await request.json();
            return {token: token, body: body};
        },
        onSuccess: (data) => {
            if (data.token) {
                console.debug("Login success, storing JWT.");
                localStorage.setItem("username", data.token);
                localStorage.setItem("user-info", JSON.stringify(data.body));
                queryClient.invalidateQueries({queryKey: ["user-info"]});
                navigate("/");
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
        <div className={"container d-flex justify-content-center align-items-center flex-grow-1 flex-column gap-3 p-3"}>
            <h4>Welcome!</h4>
            <form id={"loginForm"} onSubmit={handleSubmit}>
                <fieldset className={"userField"}>
                    <input value={username} placeholder={"username"} onChange={(event) => {
                        setUsername(event.target.value)
                    }} id="userId" type={"text"} className={"form-control"}/>
                    <input value={password} placeholder={"password"} onChange={(event) => {
                        setPassword(event.target.value)
                    }} id="passwordId" type={"password"} className={"form-control"}/>
                </fieldset>
                <button type={"submit"} className={"btn"}>Log In</button>
            </form>
        </div>
    );
}

export default UserLogin;