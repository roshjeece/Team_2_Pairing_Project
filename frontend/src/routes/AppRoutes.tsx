import {Route, Routes} from "react-router";
import {LeaderPage} from "../ratemyleader/leader/LeaderPage.tsx";
import {ReviewPage} from "../ratemyleader/review/ReviewPage.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LeaderPage/>}/>
            <Route path="/review" element={<ReviewPage/>}/>
        </Routes>
    )
}