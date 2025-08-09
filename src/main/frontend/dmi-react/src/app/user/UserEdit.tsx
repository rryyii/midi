function UserEdit() {
    return (
        <div className={"container d-flex flex-column gap-3"}>
            <div className={"profile-picture"}>
                <input type={"file"} className={"form-control w-25"}/>
            </div>
            <div className={"edit-form"}>
                <label htmlFor={"name-input"}>Name</label>
                <input type={"text"} id={"name-input"} className={"form-control w-25"}/>
            </div>
            <div className={"edit-form"}>
                <label htmlFor={"email-input"}>Email</label>
                <input type={"email"} id={"email-input"} className={"form-control w-25"}/>
            </div>
            <div className={"edit-form"}>
                <label htmlFor={"bio-input"}>Bio</label>
                <textarea className={"form-control w-25"}></textarea>
            </div>
        </div>
    );
}

export default UserEdit;