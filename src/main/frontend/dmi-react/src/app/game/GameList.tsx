import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router";

function GameList() {

    const {data, error} = useQuery({
        queryKey: ["main-games-list"],
        queryFn: () =>
            fetch(`http://localhost:${import.meta.env.VITE_APP_PORT}/games`)
                .then((res) => res.json()),
    });

    if (error) return "An error occurred trying to fetch games list.";

    if (data) {
        return (
            <div className={"container"}>
                <div className={"row"}>
                    {data.map((game: any) => {
                        return (
                            <div className="game-container col" key={`${game.name}-${game.developer}`}>
                                <h1>{game.name}</h1>
                                <Link to={"/game"} state={{game}} className={"btn btn-outline-primary"}>
                                    View
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

}

export default GameList;