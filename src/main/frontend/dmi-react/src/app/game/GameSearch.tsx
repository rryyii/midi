
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "react-router";
import type { Game } from "../util/MDITypes";

function GameSearch() {
    const location = useLocation();
    const name = location.pathname.split("/")[2];
    const {data} = useQuery({
        queryKey: ["current-search"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/search/games/${name}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            return await response.json();
        }
    });

    if (data) {
        return (
            <div className="container d-flex flex-column gap-3 p-3">
                <h3>Results for: {name}</h3>
                <div className="border-bottom p-2"></div>
                {data.map((game : Game) => (
                    <Link to={`/games/${game.id}`}>
                        <div key={`${game.id}-${game.name}`} className="d-flex align-items-center gap-5 justify-content-center">
                            <h4>{game.name}</h4>
                            <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg`} loading="lazy" className="game-img" alt={`cover image of ${game.name}`}/>
                        </div>
                    </Link>
                ))}
            </div>  
        )
    }
}

export default GameSearch;