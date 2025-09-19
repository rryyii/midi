function Genres({value}: { value: Array<any>}) {
    if (value == null) {
        return "No Genres Set";
    }
    return (
        <div className={"d-flex gap-2 genres"}>
            {value.map((genre: {id: number, name: string}) => (
                    <div key={`genre-${genre.id}`} className={"genre d-flex justify-content-center align-items-center shadow"}>
                        {genre.name}
                    </div>
                )
            )}
        </div>
    )
}

export default Genres;