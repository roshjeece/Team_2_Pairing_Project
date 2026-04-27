import {render, screen} from "@testing-library/react";
import {ReviewForm} from "../ReviewForm.tsx";
import {userEvent} from "@testing-library/user-event";
import { expect, vi, beforeEach, afterEach, describe, it } from "vitest";
import * as reviewApi from "../ReviewService.ts"
import "@testing-library/jest-dom/vitest";

describe('Review Form', ()=>
{
    const review = userEvent.setup();
    it('renders all radio buttons',() => {
        render(<ReviewForm />);

        const radios = screen.getAllByRole("radio");

        expect(radios).toHaveLength(3);

    });
}



)