import { createRoot } from 'react-dom/client'
import App from "./app/App.tsx";
import {StrictMode} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
