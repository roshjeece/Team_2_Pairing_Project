import {render, screen, waitFor} from "@testing-library/react";
import {ReviewForm} from "../ReviewForm.tsx";
import {userEvent} from "@testing-library/user-event";
import { expect, vi, beforeEach, afterEach, describe, it } from "vitest";
import * as reviewApi from "../ReviewService.ts"
import "@testing-library/jest-dom/vitest";
import * as leaderApi from "../../leader/LeaderService.ts";


////BLOCKS API BEFORE IT CAN BE REACHED, REMOVED IT FROM DESCRIBE.
vi.mock('../ReviewService.ts');

describe('Review Form', ()=>
{
    const review = userEvent.setup();
    it('renders all radio buttons',() => {
        render(<ReviewForm />);

        const radios = screen.getAllByRole("radio");

        expect(radios).toHaveLength(3);

    });

    it('should display description input', () => {
        render(<ReviewForm/>)
        expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();

    });

    it('should display submit button', () => {
        render(<ReviewForm/>)
        expect(screen.getByRole('button', {name:/Submit Review/i})).toBeInTheDocument();

    });

    describe('Mock Review Form', () => {
        //BEFORE EVERY TEST IN THIS GROUP RUNS, ERASE THE MEMORY OF WHAT ANY MOCK DID PREVIOUSLY.
        beforeEach(() => {
            vi.clearAllMocks();
        });

        //AFTER TEST FINISHES, PUT EVERY FUNCTION BACK INTO ITS ORIGINAL STATE.
        afterEach(() => {
            vi.restoreAllMocks();
        });

        //ASYNC-WAITS FOR EACH LINE TO FINISH BEFORE MOVING TO NEXT LINE
        it('should input into fields and click submit', async () => {

            //mockResolvedValueOnce- prevents it from actually running
            const newLeader = {
                id: 1,
                fname: 'Cam',
                lname: 'Spencer',
                job_title: 'CEO'

            };

            const mockCreateReview = vi.spyOn(reviewApi, 'saveReview').mockResolvedValueOnce
            ({
                leader: newLeader,
                rating: 3,
                description: "Great job!",
                date: "20260427"
            });

            render(<ReviewForm/>)

            // CHANGED: field queries match updated visible label text
            const radios = screen.getAllByRole("radio");
            const description = screen.getByPlaceholderText('Description');

            const submit = screen.getByRole('button', {name: /Submit Review/i})

            //TYPE IT - VERIFY IT HELD

            await review.type(description, 'Great job!');
            expect(description).toHaveValue('Great job!');

            // THE FAKE USER CLICKS THE BUTTON AND TRIGGERS SUBMISSION CHAIN.
            await review.click(submit)

            //
            await waitFor(() => {
                expect(mockCreateReview).toHaveBeenCalledWith(expect.objectContaining({
                    leader: newLeader,
                    rating: 3,
                    description: "Great job!",
                    date: "20260427"
                }));
            });

            expect(mockCreateReview).toHaveBeenCalledOnce();

        });

    });
}



)