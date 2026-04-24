import {render, screen} from "@testing-library/react";
import {LeaderForm} from "../LeaderForm.tsx";
import {userEvent} from "@testing-library/user-event/dist/cjs/setup/index.js";

describe ('LeaderForm', () => {
    const leader = userEvent.setup();

    it('should display first name input', () => {
        render (<LeaderForm/>);

        expect(
            screen.getByLabelText(/fname/i)).toBeInTheDocument();

    })
})