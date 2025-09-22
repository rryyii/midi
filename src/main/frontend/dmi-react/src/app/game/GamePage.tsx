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
                        <Link to={`/games/${game.id}`} key={`${game.id}-page`}>
                                {game.cover != null ? <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} loading="lazy" alt={`cover image of ${game.name}`} className="game-card"/> :
                                    <h4>{game.name}</h4>}
                        </Link>
                    );
                })}
            </div>
        );
    }
}

export default GamePage;