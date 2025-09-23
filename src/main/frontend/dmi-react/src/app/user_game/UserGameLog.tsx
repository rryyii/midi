import { useMutation, useQueryClient } from "@tanstack/react-query";
import EditGameStatus from "./EditGameStatus.tsx";
import type { ResponseUser } from "../util/MDITypes.ts";

function UserGameLog({game, userInfo} : {game : any, userInfo: ResponseUser}) {

    const queryClient = useQueryClient();
    const dateObject = new Date(Date.parse(game.dateAdded));
    
    const mutation = useMutation({
        mutationFn: async ({ userGameId }: { userGameId: number }) => {
            const request = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/user/rm_game`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("username") || "none" },
                    body: JSON.stringify({ id: userGameId, user_id: userInfo.id }),
                });
            return await request.json();
        },
        onSuccess: () => {
            console.info("Successfully removed game from user list.");
            queryClient.invalidateQueries({ queryKey: ["user-game-list", userInfo.id] });
        },
        onError: (error) => {
            console.error("Failed to delete game: " + error.message);
        }
    });

    const handleSubmit = (userGameId: number) => {
        mutation.mutate({ userGameId });
    };

    return (
        <div className={"d-flex flex-column log-custom shadow"}>
            <p>{game.game.name}</p>
            <p>Played for {game.hoursPlayed} hours</p>
            <p>Status: {game.status}</p>
            <p>You added on {dateObject.toDateString()}</p>
            <div className={"d-flex"}>
                <EditGameStatus gameId={game.id}/>
                <div>
                    <button onClick={() => {
                        handleSubmit(game.id)
                        }} type={"submit"}
                        className={"btn"}>
                            <i className="fa-solid fa-xmark icon-color"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserGameLog;