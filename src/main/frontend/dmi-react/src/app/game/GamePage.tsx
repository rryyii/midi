import {Link} from "react-router";
import {useQuery} from "@tanstack/react-query";

function GamePage({page}: { page: number}) {

    const {data, error} = useQuery({
        queryKey: ["main-games-list", page],
        queryFn: () =>
            fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/games/${page}`)
                .then((res) => res.json()),
    });
    if (error) return "An error occurred trying to fetch games list.";

    if (data) {
    return (
        <div className={"d-flex flex-row flex-wrap gap-3 p-3"}>
            {data.content.map((game: any) => {
                return (
                    <div className="d-flex flex-column" key={`${game.name}-${game.developer}`}>
                        {game.cover != null ? <img src={`${game.cover.url}`} alt={`cover image of ${game.name}`}/> :
                            <h4>{game.name}</h4>}
                        <Link to={`/games/${game.id}`} className={"btn btn-outline-primary"}>
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