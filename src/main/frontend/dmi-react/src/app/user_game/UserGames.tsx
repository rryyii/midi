import { useState } from "react";
import UserGameList from "./UserGameList";

function UserGames() {
    const [status, setStatus] = useState<string>("default");
    return (
        <div className={"container d-flex flex-column p-3 gap-3"}>
            <div className={"btn-group"}>
                <button onClick={() => setStatus("default")} className={"btn btn-outline-custom"}>Your Log</button> 
                <button onClick={() => setStatus("playing")} className={"btn btn-outline-custom"}>Playing</button>
                <button onClick={() => setStatus("completed")} className={"btn btn-outline-custom"}>Completed</button>
                <button onClick={() => setStatus("on hold")} className={"btn btn-outline-custom"}>On Hold</button>
                <button onClick={() => setStatus("dropped")} className={"btn btn-outline-custom"}>Dropped</button>
                <button onClick={() => setStatus("planned")} className={"btn btn-outline-custom"}>Plan to Play</button>
            </div>
            <div className={"border-bottom w-85"}></div>
            <UserGameList status={status}/>
        </div>
    )
}

export default UserGames;