import {BrowserRouter as Router, Route, Routes} from "react-router";
import Nav from "./layout/Nav.tsx";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Home from "./layout/Home.tsx";
import AddGame from "./game/AddGame.tsx";
import GameList from "./user_game/GameList.tsx";
import UserLogin from "./user/UserLogin.tsx";
import UserRegister from "./user/UserRegister.tsx";
import UserLogout from "./user/UserLogout.tsx";
import UserProfile from "./user/UserProfile.tsx";
import AddUserGame from "./user_game/AddUserGame.tsx";
import DeleteUserGame from "./user_game/DeleteUserGame.tsx";
import UserEdit from "./user/UserEdit.tsx";

const queryClient = new QueryClient();

/**
 * Base App component that holds the Query Client and Router.
 * @constructor
 */
function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Nav/>
                    {/*<AuthContext value={)}>*/}
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/add"} element={<AddGame/>}/>
                        <Route path={"/list"} element={<GameList/>}/>
                        <Route path={"/login"} element={<UserLogin/>}/>
                        <Route path={"/register"} element={<UserRegister/>}/>
                        <Route path={"/logout"} element={<UserLogout />} />
                        <Route path={"/profile"} element={<UserProfile />} />
                        <Route path={"/add_user_game"} element={<AddUserGame/>} />
                        <Route path={"/remove_user_game"} element={<DeleteUserGame/>} />
                        <Route path={"/edit"} element={<UserEdit />} />
                    </Routes>
                    {/*</AuthContext>*/}
                </Router>
            </QueryClientProvider>
        </>
    );
}


export default App;