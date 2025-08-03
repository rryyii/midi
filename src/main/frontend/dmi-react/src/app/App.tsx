import { BrowserRouter as Router, Route, Routes } from "react-router";
import Nav from "./layout/Nav.tsx";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Home from "./layout/Home.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Home/>} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    );
}


export default App;