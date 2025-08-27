import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {ResponseUser} from "../util/MDITypes.ts";

function UserEdit() {

    const queryClient = useQueryClient();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [bio, setBio] = useState<string>("");

    const userString = localStorage.getItem("user-info");
    if (userString == null) {
        console.error("Failed to retrieve user info.")
        return;
    }
    const userInfo: ResponseUser = JSON.parse(userString);

    const mutation = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/update_user`,
                {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: userInfo.id,
                        username: name,
                        password: password,
                        email: email,
                        bio: bio,
                    }),
                });
            const response = await request.json();
            return {body : response};
        },
        onError: (err) => {
            console.error(`Failed to update user info: ${err.message}`);
        },
        onSuccess: (data) => {
            console.log("Successfully updated user info.");
            localStorage.setItem("user-info", JSON.stringify(data.body));
            queryClient.invalidateQueries({queryKey: ["user-info"]}).then(r => console.log(r));
        },
    })

    const handleSubmit = (e : any) => {
        e.preventDefault();
        mutation.mutate();

    };

    return (
        <form onSubmit={handleSubmit} className={"container"}>
            <div className={"edit-container d-flex flex-grow-1 flex-column gap-3"}>
                <div className={"edit-form"}>
                    <label htmlFor={"name-input"}>Name</label>
                    <input value={name} onChange={(event) => {
                        setName(event.target.value)
                    }} type={"text"} id={"name-input"} placeholder={"username"} className={"form-control w-25"}/>
                </div>
                <div className={"edit-form"}>
                    <label htmlFor={"password-input"}>Password</label>
                    <input value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }} placeholder={"password"} className={"form-control w-25"}></input>
                </div>
                <div className={"edit-form"}>
                    <label htmlFor={"email-input"}>Email</label>
                    <input value={email} onChange={(event) => {
                        setEmail(event.target.value)
                    }} type={"email"} id={"email-input"} placeholder={"email"} className={"form-control w-25"}/>
                </div>
                <div className={"edit-form"}>
                    <label htmlFor={"bio-input"}>Bio</label>
                    <textarea value={bio} onChange={(event) => {
                        setBio(event.target.value)
                    }} placeholder={"Tell us about yourself"} className={"form-control w-25"}></textarea>
                </div>
                <div>
                    <button type={"submit"} className={"btn btn-outline-primary"}>Update</button>
                </div>
            </div>
        </form>
    );
}

export default UserEdit;