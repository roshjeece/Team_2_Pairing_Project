// OVERALL THEME: Verify the ReviewForm renders all required fields and that
// submitting the form calls the review API with the correct data.
// Leaders are mocked so no real API calls are made during testing.
import { render, screen, waitFor } from "@testing-library/react";
import { ReviewForm } from "../ReviewForm.tsx";
import userEvent from "@testing-library/user-event";
import { expect, vi, beforeEach, afterEach, describe, it } from "vitest";
import * as reviewApi from "../ReviewService.ts";
import "@testing-library/jest-dom/vitest";
import axios from "axios";

// Block real API calls — ReviewService and axios are intercepted for all tests
vi.mock('../ReviewService.ts');
vi.mock('axios');

// Fake leader data used to simulate what the API would return
const mockLeaders = [
    { id: 1, fname: 'Cam', lname: 'Spencer', job_title: 'CEO' },
    { id: 2, fname: 'Tairrque', lname: 'Baker', job_title: 'Engineer' }
];

describe('Review Form', () => {
    // One shared fake user for all interaction tests
    const review = userEvent.setup();

    // Before each test, simulate the leaders GET response so the dropdown has data
    beforeEach(() => {
        (axios.get as any).mockResolvedValueOnce({ data: mockLeaders });
    });

    // Confirms all 5 rating radio buttons render — one per rating value 1-5
    it('renders all 5 radio buttons', () => {
        render(<ReviewForm />);
        const radios = screen.getAllByRole("radio");
        expect(radios).toHaveLength(5);
    });

    // Confirms the description text input is present on the form
    it('should display description input', () => {
        render(<ReviewForm />);
        expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    });

    // Confirms the Submit Review button renders and is accessible
    it('should display submit button', () => {
        render(<ReviewForm />);
        expect(screen.getByRole('button', { name: /Submit Review/i })).toBeInTheDocument();
    });

    // Confirms the leader dropdown renders and displays leaders fetched from the API
    it('should display leader dropdown with leaders from API', async () => {
        render(<ReviewForm />);
        await waitFor(() => {
            expect(screen.getByText(/Cam Spencer/i)).toBeInTheDocument();
            expect(screen.getByText(/Tairrque Baker/i)).toBeInTheDocument();
        });
    });

    describe('Mock Review Form', () => {
        // Wipe mock call history before each test, prevents bleed between tests
        beforeEach(() => {
            vi.clearAllMocks();
            (axios.get as any).mockResolvedValueOnce({ data: mockLeaders });
        });

        // Restore all mocked functions to their original state after each test
        afterEach(() => {
            vi.restoreAllMocks();
        });

        // Full interaction test, user fills out the form and submits
        // Verifies the save API was called exactly once
        it('should input into fields and click submit', async () => {

            // Intercept saveReview and return fake success response
            const mockCreateReview = vi.spyOn(reviewApi, 'saveReview').mockResolvedValueOnce({
                leader: mockLeaders[0],
                rating: 3,
                description: "Great job!",
                date: "2026-04-27"
            });

            render(<ReviewForm />);

            // Wait for leaders to load into the dropdown before interacting
            await waitFor(() => {
                expect(screen.getByText(/Cam Spencer/i)).toBeInTheDocument();
            });
            const leaderSelect = screen.getByLabelText(/select leader/i);
            const radios = screen.getAllByRole("radio");
            const description = screen.getByPlaceholderText('Description');
            const dateInput = screen.getByLabelText(/date/i);
            const submit = screen.getByRole('button', { name: /Submit Review/i });

            // select leader
            await review.selectOptions(leaderSelect, "1");
            expect(leaderSelect).toHaveValue("1");

            // Click the 3rd radio button (rating = 3) and confirm it is checked
            await review.click(radios[2]);
            expect(radios[2]).toBeChecked();

            // Type into description and confirm the value held
            await review.type(description, 'Great job!');
            expect(description).toHaveValue('Great job!');

            //Check if date selected matches input value
            await review.type(dateInput, "2026-04-27");
            expect(dateInput).toHaveValue("2026-04-27");

            // Click submit — triggers form submission chain
            await review.click(submit);

            // Wait for async submission to complete and confirm API was called once
            await waitFor(() => {
                expect(mockCreateReview).toHaveBeenCalledWith(expect.objectContaining({
                    leader: mockLeaders[0],
                    rating: 3,
                    description: "Great job!",
                    date: "2026-04-27"
                    }));
            });
            expect(mockCreateReview).toHaveBeenCalledOnce();
        });

        //TEST THAT BAD DATA NEVER ENTERS DB
        it('should display validation errors when submitting empty form', async () => {
            const mockCreateReview = vi.spyOn(reviewApi, 'saveReview').mockResolvedValueOnce
            ({
                id: 1,
                leader: mockLeaders[0],
                rating: 3,
                description: "Great job!",
                date: "2026-04-27"
            });

            render(<ReviewForm/>);
            const submit = screen.getByRole('button', {name: /Submit Review/i});

            //Wait For The Human Action
            await review.click(submit);

            //WAIT For React To Finish Responding To That Action.
            await waitFor(()=>{
                expect(screen.getAllByText(/Rating is required/i).length).toBeGreaterThan(0);
                expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
                expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
            });
            expect(mockCreateReview).not.toHaveBeenCalled();
        });


    });
});