import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
function Search() {
    const [input, setInput] = useState<string>();

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSubmit = (e : any) => {
        navigate(`/search/${input}`);
        queryClient.invalidateQueries({queryKey: ["current-search"]}).then(r => console.log(r));

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="d-flex">
                <input value={input} className="form-control" onChange={(event) => setInput(event.target.value)} type="search" placeholder="Search"/>
                <button type="submit" className="btn">
                    <i className="fa-solid fa-search icon-color"></i>
                </button>
            </form>
        </div>
    )
}

export default Search;