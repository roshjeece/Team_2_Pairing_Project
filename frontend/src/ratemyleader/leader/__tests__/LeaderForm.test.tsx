// MOVED: vi.mock hoisted to top-level — inside describe() causes unpredictable hoisting behavior
import { render, screen, waitFor } from "@testing-library/react";
import { LeaderForm } from "../LeaderForm.tsx";
import userEvent from "@testing-library/user-event";
import { expect, vi, beforeEach, afterEach, describe, it } from "vitest";
import * as leaderApi from "../LeaderService.ts";
import "@testing-library/jest-dom/vitest";

//BLOCKS API BEFORE IT CAN BE REACHED, REMOVED IT FROM DESCRIBE.
vi.mock('../LeaderService.ts');

//THIS CREATES A FAKE USER. STORED LEADER AND USES IT THROUGHOUT.
describe('LeaderForm', () => {
    const leader = userEvent.setup();

    //TEST: DOES THE FORM ACTUALLY SHOW UP ON THE SCREEN.
    it('should display leader form input', () => {
        render(<LeaderForm />);

        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
    });

    describe('mock Leader Form', () => {

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
            const mockCreateLeader = vi.spyOn(leaderApi, 'axiosSaveLeader').mockResolvedValueOnce({
                id: 1,
                fname: 'Cam',
                lname: 'Spencer',
                job_title: 'CEO'

            });
            render(<LeaderForm />);

            // CHANGED: field queries match updated visible label text

            //Find The Textbox Who's Label Says First Name.
            const fnames = screen.getByRole('textbox', { name: /first name/i });
            const lnames = screen.getByRole('textbox', { name: /last name/i });
            const job_titles = screen.getByRole('textbox', { name: /job title/i });

            // CHANGED: getByRole('button') now reliably works because
            // the form uses <button type="submit"> instead of <input type="submit">
            const submit = screen.getByRole('button', { name: /add leader/i });


            //TYPE IT - VERIFY IT HELD
            await leader.type(fnames, 'Cam');
            expect(fnames).toHaveValue('Cam');

            await leader.type(lnames, 'Spencer');
            expect(lnames).toHaveValue('Spencer');

            await leader.type(job_titles, 'CEO');
            expect(job_titles).toHaveValue('CEO');

            // THE FAKE USER CLICKS THE BUTTON AND TRIGGERS SUBMISSION CHAIN.
            await leader.click(submit);

            //
            await waitFor(() => {
                expect(mockCreateLeader).toHaveBeenCalledWith(expect.objectContaining({
                    fname: 'Cam',
                    lname: 'Spencer',
                    job_title: 'CEO'
                }));
            });

            expect(mockCreateLeader).toHaveBeenCalledOnce();
        });

        //TEST THAT BAD DATA NEVER ENTERS DB
        it('should display validation errors when submitting empty form', async () => {

            //
            const mockCreateLeader = vi.spyOn(leaderApi, 'axiosSaveLeader').mockResolvedValueOnce({
                id: 1,
                fname: 'Cam',
                lname: 'Spencer',
                job_title: 'CEO'
            });
            render(<LeaderForm/>)

            const submit = screen.getByRole('button',{name:/add leader/i})

            //Wait For The Human Action
            await leader.click(submit);

            //WAIT For React To Finish Responding To That Action.
            await waitFor(() => {
                expect(screen.getByText(/First Name Is Required/i)).toBeInTheDocument();
                expect(screen.getByText(/Last Name Is Required/i)).toBeInTheDocument();
                expect(screen.getByText(/Enter A Job Title/i)).toBeInTheDocument();
            });
            expect(mockCreateLeader).not.toHaveBeenCalled();
        });
    });
});