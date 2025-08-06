import {useMutation} from "@tanstack/react-query";
import type {User} from "../util/MDITypes.ts";

function DeleteUserGame() {


    const mutation = useMutation({
        mutationFn: async () => {
            const request = await fetch("http://localhost:8080/user/rm_game",
                {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                }
            );
            return request.json();
        },
        onSuccess: () => {
            console.debug("Successfully removed a new game to the user's list.");
        },
        onError: (error) => {
            console.error("Failed to remove a new game to the user's list: ", error.message);
        }

    });

    const handleSubmit = () => {
        mutation.mutate();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

            </form>
        </div>
    );
}

export default DeleteUserGame;