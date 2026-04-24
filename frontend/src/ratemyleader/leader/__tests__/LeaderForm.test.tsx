import {render, screen} from "@testing-library/react";
import {LeaderForm} from "../LeaderForm.tsx";
import {userEvent} from "@testing-library/user-event/dist/cjs/setup/index.js";

describe ('LeaderForm', () => {
    const leader = userEvent.setup();

    it('should display leader form input', () => {
        render (<LeaderForm/>);

        expect(
            screen.getByLabelText(/fname/i)).toBeInTheDocument();
        expect(
            screen.getByLabelText(/lname/i)).toBeInTheDocument();
        expect(
            screen.getByLabelText(/job_title/i)).toBeInTheDocument();
    })
})