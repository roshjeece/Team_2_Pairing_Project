import {Route, Routes} from "react-router";
import {AddReviewPage} from "../ratemyleader/review/AddReviewPage.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AddReviewPage/>}/>
        </Routes>
    )
}