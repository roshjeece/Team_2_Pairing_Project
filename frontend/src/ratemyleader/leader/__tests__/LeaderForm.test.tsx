import {render, screen, waitFor} from "@testing-library/react";
import {LeaderForm} from "../LeaderForm.tsx";
import {userEvent} from "@testing-library/user-event";
import { expect, vi, beforeEach, afterEach, describe, it } from "vitest";
import * as leaderApi from "../LeaderService.ts"
import "@testing-library/jest-dom/vitest";



describe('LeaderForm', () => {
    const leader = userEvent.setup();

    it('should display leader form input', () => {
        render(<LeaderForm/>);

        expect(
            screen.getByLabelText(/fname/i)).toBeInTheDocument();
        expect(
            screen.getByLabelText(/lname/i)).toBeInTheDocument();
        expect(
            screen.getByLabelText(/job_title/i)).toBeInTheDocument();
    })
    describe('mock Leader Form', () => {
        vi.mock('../LeaderService.ts');



        const mockData = {id: 1, fname: 'Cam', lname: 'Spencer', job_title: 'CEO'};

        beforeEach(() => {
            vi.clearAllMocks();
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });


        it('should input into fields and click submit', async () => {

            const mockCreateLeader = vi.spyOn(leaderApi, 'axiosSaveLeader').mockResolvedValueOnce({
                id: 1,
                fname: 'Cam',
                lname: 'Spencer',
                job_title: 'CEO'
            });

            render(<LeaderForm/>);
            const fnames = screen.getByRole('textbox', {name: /fname/i});
            const lnames = screen.getByRole('textbox', {name: /lname/i});
            const job_titles = screen.getByRole('textbox', {name: /job_title/i});
            // const lname = screen.getByRole('textbox', {name: /lname/i});
            // const job_title = screen.getByRole('textbox', {name: /job_title/i});
            const submit = screen.getByRole('button', {name: /Add Leader/i});

            await leader.type(fnames, 'Cam');
            expect(fnames).toHaveValue('Cam');

            await leader.type(lnames, 'Spencer');
            expect(lnames).toHaveValue('Spencer');

            await leader.type(job_titles, 'CEO');
            expect(job_titles).toHaveValue('CEO');

            await leader.click(submit);
            await waitFor(() => {
                expect(mockCreateLeader).toHaveBeenCalledWith(expect.objectContaining({
                    fname: 'Cam',
                    lname: 'Spencer',
                    job_title: 'CEO'
                }));
            });

            expect(mockCreateLeader).toHaveBeenCalledOnce();


        });

    });

})

