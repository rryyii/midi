import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function UserPrivacy({id} : {id: number}) {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");

    const mutation = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user_account`, 
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("username")},
                    body: JSON.stringify({
                        id: id,
                        email: email,
                        password: password,
                        repeatPassword: repeatPassword,
                    })
                }
            )
            const response = await request.json();
            return { body: response };
        },
        onSuccess: () => {

        }
    })

    const handleSubmit = (e : any) => {
        e.preventDefault();
        mutation.mutate();
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email-input">Email</label>
                    <input value={email} type="email" placeholder="new email" className="form-control w-25" id="email-input" onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password-input">New Password</label>
                    <input value={password} type="password" placeholder="enter new password" id="password-input" className="form-control w-25" onChange={(event) => setPassword(event.target.value)}/>
                    <label htmlFor="repeat-password-input">Re-enter Your New Password</label>
                    <input value={repeatPassword} type="password" placeholder="re-enter new password" id="repeat-password-input" className="form-control w-25" onChange={(event) => setRepeatPassword(event.target.value)}/>
                </div>
                <button type="submit" className="btn btn-outline-custom">Save</button>
            </form>
        </div>
    );
}

export default UserPrivacy;