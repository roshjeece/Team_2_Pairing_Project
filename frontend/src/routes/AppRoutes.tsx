import {Route, Routes} from "react-router";
import {ReviewPage} from "../ratemyleader/review/ReviewPage.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ReviewPage/>}/>
        </Routes>
    )
}