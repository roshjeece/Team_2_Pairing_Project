import {Route, Routes} from "react-router";
import {AddReviewPage} from "../ratemyleader/review/AddReviewPage.tsx";
import {LeaderPage} from "../ratemyleader/leader/LeaderPage.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LeaderPage/>}/>
            <Route path="/review" element={<AddReviewPage/>}/>
        </Routes>
    )
}