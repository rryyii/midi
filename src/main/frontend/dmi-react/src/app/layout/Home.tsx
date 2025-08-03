import {useQuery} from "@tanstack/react-query";

function Home() {

    const { data, error } = useQuery({
        queryKey: ["test-key"],
        queryFn: () =>
            fetch("games").then((res) => res.json()),
    });

    if (error) return "error"

    if (data) {
        console.log(data);
        return (
            <div>
                <h1>Merp</h1>
            </div>
        );
    }
}

export default Home;