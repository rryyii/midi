import styles from "./game.module.css"

function Platforms({value}: { value: Array<any>}) {
    if (value == null) {
        console.error("Invalid platforms received");
        return;
    }
    return (
        <div className={"d-flex gap-2"}>
            {value.map((platform: {id: number, name: string}) => (
                <div key={`platform-${platform.id}`} className={`${styles.genre} shadow`}>
                    {platform.name}
                </div>
            ))}
        </div>
    );
}

export default Platforms;