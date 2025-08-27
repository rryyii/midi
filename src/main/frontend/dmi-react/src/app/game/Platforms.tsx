function Platforms({value}: { value: any}) {
    return (
        <div className={"d-flex gap-2"}>
            {value.map((platform: any) => (
                <div key={`platform-${platform.id}`} className={"genre shadow"}>
                    {platform.name}
                </div>
            ))}
        </div>
    );
}

export default Platforms;