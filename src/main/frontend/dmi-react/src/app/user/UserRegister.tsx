import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import type {User} from "../util/MDITypes.ts";
import {Dialog, DialogPanel} from "@headlessui/react";

function UserRegister() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
            console.log("successfully registered user");
            setIsOpen(true);
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user: any = {
            username: username,
            password: password,
            email: email,
            bio: "",
        }
        mutation.mutate(user);
    }

    return (
        <div className={"container d-flex flex-column justify-content-center align-items-center gap-3 p-3 flex-grow-1"}>
            <h4>Registration</h4>
            <div className={"border-bottom w-25"}></div>
            <form id={"registerForm"} className={"d-flex flex-column"} onSubmit={handleSubmit}>
                <fieldset className={"userField d-flex flex-column gap-3"}>
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
                <button type={"submit"} className={"btn btn-outline-custom"}>Register</button>
            </form>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div className={"position-fixed d-flex flex-column top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50"}>
                    <DialogPanel>
                        <h2>Successfully registered!</h2>
                    </DialogPanel>
                    <button onClick={() => { setIsOpen(false);}} className={"btn btn-outline-custom"}>
                        <i className="fa-solid fa-xmark icon-color"></i>
                    </button>
                </div>
            </Dialog>
        </div>
    );
}

export default UserRegister;