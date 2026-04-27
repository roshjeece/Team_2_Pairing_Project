import {Route, Routes} from "react-router";
<<<<<<< Updated upstream
import {AddReviewPage} from "../ratemyleader/review/AddReviewPage.tsx";
import {LeaderPage} from "../ratemyleader/leader/LeaderPage.tsx";
=======
import {ReviewPage} from "../ratemyleader/review/ReviewPage.tsx";
>>>>>>> Stashed changes

export default function AppRoutes() {
    return (
        <Routes>
<<<<<<< Updated upstream
            <Route path="/" element={<LeaderPage/>}/>
            <Route path="/review" element={<AddReviewPage/>}/>
=======
            <Route path="/" element={<ReviewPage/>}/>
>>>>>>> Stashed changes
        </Routes>
    )
}