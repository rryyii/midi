function Genres({value}: { value: Array<number> }) {
    if (value == null) {
        return "No Genres Set";
    }
    return (
        <div className={"d-flex gap-2 genres"}>
            {value.map((genre: number) => (
                    <div key={`genre-${genre}`} className={"genre d-flex justify-content-center align-items-center"}>
                        {genre}
                    </div>
                )
            )}
        </div>
    )
}

export default Genres;