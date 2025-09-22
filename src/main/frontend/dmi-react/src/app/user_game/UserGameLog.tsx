import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditGameStatus from "./EditGameStatus.tsx";
import type { ResponseUser } from "../util/MDITypes.ts";

function UserGameLog({game, userInfo} : {game : any, userInfo: ResponseUser}) {

    const queryClient = useQueryClient();
    
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
        <div className={"d-flex flex-column log-custom"}>
            <h4>{game.game.name}</h4>
            <h4>{game.hoursPlayed}</h4>
            <h4>{game.status}</h4>
            <h4>{game.dateAdded}</h4>
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