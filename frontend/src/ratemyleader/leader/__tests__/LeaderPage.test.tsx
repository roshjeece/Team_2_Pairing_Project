import {LeaderPage} from "../LeaderPage.tsx";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {expect} from "vitest";

describe('Leader Page', () => {
    it('should display a review header', () => {
        //arrange
        render(<LeaderPage/>);

        //act
        expect(screen.getByRole('list')).toBeInTheDocument();

        //assert

        expect(screen.getByRole('heading', {name: /Leader List/i}),
            ).toBeInTheDocument();

    });
});