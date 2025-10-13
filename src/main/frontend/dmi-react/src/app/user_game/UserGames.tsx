import { useState } from "react";
import UserGameList from "./UserGameList";
import styles from "./user-game.module.css";

function UserGames() {
    const [status, setStatus] = useState<string>("default");
    return (
        <div className={"container d-flex flex-row p-3 gap-3"}>
            <div className={`btn-group-vertical ${styles.btnGroup}`}>
                <button onClick={() => setStatus("default")} className={`btn ${styles.btnCustom}`}>Your Log</button>
                <button onClick={() => setStatus("playing")} className={`btn ${styles.btnCustom}`}>Playing</button>
                <button onClick={() => setStatus("completed")} className={`btn ${styles.btnCustom}`}>Completed</button>
                <button onClick={() => setStatus("on hold")} className={`btn ${styles.btnCustom}`}>On Hold</button>
                <button onClick={() => setStatus("dropped")} className={`btn ${styles.btnCustom}`}>Dropped</button>
                <button onClick={() => setStatus("planned")} className={`btn ${styles.btnCustom}`}>Plan to Play</button>
            </div>
            <div>
                <UserGameList status={status}/>
            </div>
        </div>
    )
}

export default UserGames;