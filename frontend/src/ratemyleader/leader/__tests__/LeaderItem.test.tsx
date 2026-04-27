import type {Leader} from "../LeaderType.ts";
import {LeaderItem} from "../LeaderItem.tsx";
import { render, screen } from '@testing-library/react';
import {expect} from "vitest";

describe('Leader Item Tests', () => {
    it('should display a single leader item', () => {
        const leader1: Leader = {
            id: 1,
            fname: "Cameron",
            lname: "Spencer",
            job_title: "CEO",
        };

        //Arrange
        render(<LeaderItem initialLeader={leader1}/>);

        expect(screen.getByRole('listitem', { name: /leader/i})).toBeInTheDocument();
        expect(screen.getByText(/Cameron Spencer/i)).toBeInTheDocument();
        expect(screen.getByText(/Ceo/i)).toBeInTheDocument();

    });
});