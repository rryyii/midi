import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { Link } from "react-router";
import { useUser } from "../util/UserHook.tsx";
import { Dialog, DialogPanel } from "@headlessui/react";

function UserEdit() {

    const queryClient = useQueryClient();
    const [name, setName] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {data: userInfo} = useUser();
    

    const mutation = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/update_user`,
                {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: userInfo?.id,
                        username: name,
                        bio: bio,
                    }),
                    credentials: "include",
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
            setIsOpen(true);
        },
    })

    const handleSubmit = (e : any) => {
        e.preventDefault();
        mutation.mutate();

    };

    return (
        <form onSubmit={handleSubmit} className={"container d-flex flex-column gap-3"}>
            <h4>Profile</h4>
            <div className={"border-bottom w-50"}></div>
            <div className={"edit-container d-flex flex-grow-1 flex-column gap-3"}>
                <div className={"edit-form"}>
                    <input value={name} onChange={(event) => {
                        setName(event.target.value)
                    }} type={"text"} id={"name-input"} placeholder={"username"} className={"search-bar w-25"}/>
                </div>
                <div className={"edit-form"}>
                    <textarea value={bio} onChange={(event) => {
                        setBio(event.target.value)
                    }} placeholder={"tell us about yourself"} className={"search-bar w-25"}></textarea>
                </div>
                <div>
                    <button type={"submit"} className={"btn btn-outline-custom"}>Update</button>
                </div>
                <Link to="/profile/edit/account">
                    Update email/password
                </Link>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div className={"position-fixed top-0 m-5 start-0 p-5 w-45 h-45 d-flex justify-content-center align-items-center pop-up shadow"}>
                        <DialogPanel>
                            <h2>Successfully changed account information</h2>
                        </DialogPanel>
                        <button onClick={() => { setIsOpen(false);}} className={"btn btn-outline-custom"}>
                            <i className="fa-solid fa-xmark icon-color"></i>
                        </button>
                    </div>
            </Dialog>
        </form>
    );
}

export default UserEdit;