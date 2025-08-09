import {BrowserRouter as Router, Route, Routes} from "react-router";
import Nav from "./layout/Nav.tsx";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import Home from "./layout/Home.tsx";
import AddGame from "./game/AddGame.tsx";
import UserGameList from "./user_game/UserGameList.tsx";
import UserLogin from "./user/UserLogin.tsx";
import UserRegister from "./user/UserRegister.tsx";
import UserLogout from "./user/UserLogout.tsx";
import UserProfile from "./user/UserProfile.tsx";
import UserEdit from "./user/UserEdit.tsx";
import GameList from "./game/GameList.tsx";
import Game from "./game/Game.tsx";
import Footer from "./layout/Footer.tsx";

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
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/add"} element={<AddGame/>}/>
                        <Route path={"/list"} element={<UserGameList/>}/>
                        <Route path={"/login"} element={<UserLogin/>}/>
                        <Route path={"/register"} element={<UserRegister/>}/>
                        <Route path={"/logout"} element={<UserLogout/>}/>
                        <Route path={"/profile"} element={<UserProfile/>}/>
                        <Route path={"/edit"} element={<UserEdit/>}/>
                        <Route path={"/games"} element={<GameList/>}/>
                        <Route path={"/game"} element={<Game/>}/>
                    </Routes>
                    <Footer/>
                </Router>
            </QueryClientProvider>
        </>
    );
}


export default App;