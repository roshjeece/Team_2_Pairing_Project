import { BrowserRouter } from 'react-router';
import AppRoutes from "./routes/AppRoutes.tsx";
import { NavBar } from "./ratemyleader/components/NavBar.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <AppRoutes />
        </BrowserRouter>
    )
}