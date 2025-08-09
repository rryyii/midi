import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import type {User} from "../util/MDITypes.ts";

function UserRegister() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const mutation = useMutation({
        mutationFn: async (user: User) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user),
            });
            return await request.json() as Promise<User>;
        },
        onError: (err) => console.error(err.message),
        onSuccess: () => {
            console.log("success")
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user: User = {
            username: username,
            password: password,
            email: email,
        }
        mutation.mutate(user);
    }

    return (
        <div className={"container"}>
            <h1>Registration</h1>
            <form id={"registerForm"} onSubmit={handleSubmit}>
                <fieldset className={"userField"}>
                    <input value={username} placeholder={"username"} onChange={(event) => {
                        setUsername(event.target.value)
                    }} id="userId" type={"text"} className={"form-control"}/>
                    <input value={password} placeholder={"password"} onChange={(event) => {
                        setPassword(event.target.value)
                    }} id="passwordId" type={"password"} className={"form-control"}/>
                    <input value={email} placeholder={"email"} onChange={(event) => {
                        setEmail(event.target.value)
                    }} id="emailId" type={"email"} className={"form-control"}/>
                </fieldset>
                <button type={"submit"} className={"btn"}>Register</button>
            </form>
        </div>
    );
}

export default UserRegister;