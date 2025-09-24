import {useState} from "react";
import GamePage from "./GamePage.tsx";

function GameList() {
    const [page, setPage] = useState<number>(0);
    const [filter, setFilter] = useState<string>("none");

    return (
        <div className={"container d-flex flex-column flex-grow-1 justify-content-center align-items-center"}>
            <div className={"row"}>
                <label htmlFor={"myComboBox"}>Apply Filters:</label>
                <select onChange={(event) => {
                    setFilter(event.target.value)
                }} id={"optionsList"}>
                    <option value={"none"}>Filters</option>
                    <option value={"date"}>Release Date</option>
                    <option value={"popularity"}>Popularity</option>
                    <option value={"rating"}>Rating</option>
                </select>
            </div>
            <div className={"row"}>
                <GamePage page={page} filter={filter}/>
            </div>
            <div className={"row"}>
                <div>
                    <button onClick={() => setPage(Math.max(page - 1, 0))} className={"btn btn-outline-custom"}>
                        <i className="fa-solid fa-arrow-left icon-color"></i>
                    </button>
                    <button onClick={() => setPage(page + 1)} className={"btn btn-outline-custom"}>
                        <i className="fa-solid fa-arrow-right icon-color"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GameList;