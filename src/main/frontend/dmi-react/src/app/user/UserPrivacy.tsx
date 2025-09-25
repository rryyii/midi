import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useUser } from "../util/UserHook";

function UserPrivacy() {
    const {data: userInfo} = useUser();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");

    const mutation = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user_account`, 
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: userInfo?.id,
                        email: email,
                        password: password,
                        repeatPassword: repeatPassword,
                    }),
                    credentials: "include",
                }
            )
            const response = await request.json();
            return { body: response };
        },
        onSuccess: () => {
            console.log("Succesfully updated account information")
        },
        onError: (error) => {
            console.error(`Failed to update user info: ${error.message}`)
        }
    })

    const handleSubmit = (e : any) => {
        e.preventDefault();
        mutation.mutate();
    }

    return (
            <form onSubmit={handleSubmit} className={"container"}>
                <h4>Password and Email</h4>
                <div className={"border-bottom w-50"}></div>
                <div className="d-flex flex-column gap-3 p-3">
                    <div>
                        <input value={email} type="email" placeholder="new email" className="search-bar w-25" id="email-input" onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div>
                        <input value={password} type="password" placeholder="enter new password" id="password-input" className="search-bar w-25" onChange={(event) => setPassword(event.target.value)}/>
                        <p className={"side-text"}><small>Password must be at least 8 characters long</small></p>
                        <input value={repeatPassword} type="password" placeholder="re-enter new password" id="repeat-password-input" className="search-bar w-25" onChange={(event) => setRepeatPassword(event.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-outline-custom w-25">Save</button>
                </div>
            </form>
    );
}

export default UserPrivacy;