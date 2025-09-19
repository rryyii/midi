import {Link} from "react-router";
import {useQuery} from "@tanstack/react-query";
import type {Game} from "../util/MDITypes";

function GamePage({page}: { page: number }) {

    const {data, error} = useQuery({
        queryKey: ["main-games-list", page],
        queryFn: () =>
            fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/games/${page}`)
                .then((res) => res.json()),
    });
    if (error) return "An error occurred trying to fetch games list.";

    if (data) {
    return (
        <div className={"d-flex flex-row flex-wrap gap-3 justify-content-center p-3"}>
            {data.content.map((game: Game) => {
                return (
                    <div className="d-flex flex-column" key={`${game.name}-${game.id}`}>
                        {game.cover != null ? <img src={`${game.cover.url}`} alt={`cover image of ${game.name}`} className="game-img"/> :
                            <h4>{game.name}</h4>}
                        <Link to={`/games/${game.id}`} className={"btn btn-outline-custom"}>
                            View
                        </Link>
                    </div>
                );
            })}
        </div>
    );
    }
}

export default GamePage;