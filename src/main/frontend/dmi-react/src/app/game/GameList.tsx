import { useState } from "react";
import GamePage from "./GamePage.tsx";

function GameList() {
    const [page, setPage] = useState<number>(0);
    const [filter, setFilter] = useState<string>("none");

    return (
        <div className={"container d-flex flex-column flex-grow-1 justify-content-center align-items-center"}>
            <div className={"row"}>
                <div className={"d-flex"}>
                    <div>
                        <select onChange={(event) => {
                            setFilter(event.target.value)
                        }} id={"optionsList"}>
                            <option value={"none"}>Filters</option>
                            <option value={"date"}>Release Date</option>
                            <option value={"popularity"}>Popularity</option>
                            <option value={"rating"}>Rating</option>
                        </select>
                    </div>
                    <div>
                        <select onChange={(event) => {
                            setFilter(event.target.value)
                        }} id={"optionsList"}>
                            <option value={"none"}>Genres</option>
                            <option value={"adventure"}>Adventure</option>
                            <option value={"arcade"}>Arcade</option>
                            <option value={"brawler"}>Brawler</option>
                            <option value={"card and board game"}>Card & Board Game</option>
                            <option value={"fighting"}>Fighting</option>
                            <option value={"indie"}>Indie</option>
                            <option value={"moba"}>MOBA</option>
                            <option value={"music"}>Music</option>
                            <option value={"pinball"}>Pinball</option>
                            <option value={"platform"}>Platform</option>
                            <option value={"point-and-click"}>Point-and-Click</option>
                            <option value={"puzzle"}>Puzzle</option>
                            <option value={"quiz/trivia"}>Quiz/Trivia</option>
                            <option value={"racing"}>Racing</option>
                            <option value={"real time strategy"}>Real Time Strategy</option>
                            <option value={"rpg"}>RPG</option>
                            <option value={"shooter"}>Shooter</option>
                            <option value={"simulator"}>Simulator</option>
                            <option value={"sport"}>Sport</option>
                            <option value={"tactical"}>Tactical</option>
                            <option value={"turn based strategy"}>Turn Based Strategy</option>
                            <option value={"visual novel"}>Visual Novel</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <GamePage page={page} filter={filter} />
            </div>
            <div className={"row"}>
                <div className={"d-flex gap-3"}>
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