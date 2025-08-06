// import type {User} from "./MDITypes.ts";
// import {createContext, useState} from "react";
//
// const local = localStorage;
// const user : User = localStorage.getItem("user-info") as String;
//
//
// function AuthHandler() {
//     const [username, setUsername] = useState<string>("");
//
//     const updateUsername = (username) => {
//       setUsername(username);
//     };
//
//     return (
//         <AuthContext value={{username, setUsername}}>
//
//         </AuthContext>
//     )
//
// }
//
//
// export const AuthContext = createContext(user);