import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { useUser } from "../util/UserHook";
import styles from "./user-game.module.css"
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


function EditGameStatus({ gameId, gstatus }: { gameId: number, gstatus: string }) {

    const { data: userInfo } = useUser();

    const queryClient = useQueryClient();
    const [status, setStatus] = useState<string>("");
    const [hours, setHours] = useState<number>(0);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/update_game`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: gameId, status: status, hoursPlayed: hours, favorite: isFavorite }),
                    credentials: "include",
                });
            const response = await request.text();
            return response as any;
        },
        onError: (error) => {
            console.error("Failed to update game info: ", error.message);
        },
        onSuccess: () => {
            console.log("Successfully updated game info.");
            queryClient.invalidateQueries({ queryKey: ["user-game-list", userInfo?.id, gstatus] });
            setOpen(true);
        }
    })


    const handleSubmit = (e: any) => {
        e.preventDefault();
        mutation.mutate();
    }

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <div
                    className={"position-fixed top-0 m-5 start-0 p-5 w-45 h-45 d-flex justify-content-center align-items-center pop-up shadow"}>
                    <DialogPanel>
                        <DialogTitle>
                            <p>Updated game information!</p>
                            <button onClick={() => setOpen(false)} className={"btn btn-outline-custom"}>
                                <i className="fa-solid fa-xmark icon-color"></i>
                            </button>
                        </DialogTitle>
                    </DialogPanel>
                </div>
            </Dialog>
            <Menu>
                <MenuButton className={"btn"}>
                    <i className="fa-solid fa-pen-to-square icon-color"></i>
                </MenuButton>
                <MenuItems className={"menu-item shadow-lg"} anchor={"bottom start"}>
                    <form onSubmit={handleSubmit} className={`container d-flex flex-column gap-3 ${styles.editStatusForm} p-3`}>
                        <div className={"d-flex flex-column"}>
                            <label htmlFor={"myComboBox"}>Change Status:</label>
                            <select onChange={(event) => {
                                setStatus(event.target.value)
                            }} id={"optionsList"}>
                                <option value={""}>Select a status</option>
                                <option value={"Playing"}>Currently Playing</option>
                                <option value={"Completed"}>Completed</option>
                                <option value={"Dropped"}>Dropped</option>
                                <option value={"On Hold"}>On Hold</option>
                                <option value={"Planned"}>Plan to Play</option>
                            </select>
                        </div>
                        <div className={"d-flex flex-column"}>
                            <label htmlFor={"hoursPlayed"}>Hours Played:</label>
                            <input value={hours} onChange={(event) => {
                                setHours(Number(event.target.value))
                            }} type={"number"} id={"hoursPlayed"} className={"form-control"} />
                        </div>
                        <div className={"d-flex flex-column"}>
                            <label htmlFor={"isFavorite"}>Is Favorite:</label>
                            <input type={"checkbox"} id={"isFavorite"} onChange={(event) => {
                                setIsFavorite(event.target.checked)
                            }} className={"form-check-input"} />
                        </div>
                        <button type={"submit"} className={"btn btn-outline-custom"}>Update</button>
                    </form>
                </MenuItems>
            </Menu>
        </div>
    );
}

export default EditGameStatus;