import { useState } from "react";
import UserEdit from "./UserEdit";
import UserPrivacy from "./UserPrivacy";

function UserAccount() {

    const [page, setPage] = useState<string>();

    return (
        <div>
            <input type="button" onClick={() => setPage("edit")}/>
            <input type="button" onClick={() => setPage("privacy")}/>
            {page == "edit" ? <UserEdit /> : ""}
            <UserPrivacy id={1}/>
        </div>
    )
}

export default UserAccount;