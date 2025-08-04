import {BrowserRouter as Router, Route, Routes} from "react-router";
import Nav from "./layout/Nav.tsx";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Home from "./game/Home.tsx";
import AddGame from "./game/AddGame.tsx";
import GameList from "./game/GameList.tsx";
import UserLogin from "./user/UserLogin.tsx";
import UserRegister from "./user/UserRegister.tsx";

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
                        <Route path={"/list"} element={<GameList/>}/>
                        <Route path={"/login"} element={<UserLogin/>}/>
                        <Route path={"/register"} element={<UserRegister/>}/>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    );
}


export default App;