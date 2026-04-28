import { LeaderPage } from "../LeaderPage.tsx";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import { expect, vi, describe, it, beforeEach } from "vitest";
import axios from "axios";

vi.mock("axios");
vi.mock("../LeaderForm.tsx", () => ({
    LeaderForm: ({ onLeaderSaved }: { onLeaderSaved: () => void }) => (
        <button onClick={onLeaderSaved}>Mock Add Leader</button>
    )
}));

const mockLeaders = [
    { id: 1, fname: "Cam", lname: "Spencer", job_title: "CEO" },
    { id: 2, fname: "Tairrque", lname: "Baker", job_title: "Engineer" }
];

describe('Leader Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should display the leader list heading and list', () => {
        (axios.get as any).mockResolvedValueOnce({ data: [] });
        render(<LeaderPage />);
        expect(screen.getByRole('heading', { name: /Leader List/i })).toBeInTheDocument();
        // CHANGED: ListGroup renders as a div, not a ul, so we check for content instead
        expect(screen.getByText(/No leaders/i)).toBeInTheDocument();
    });

    it('should show No leaders when list is empty', async () => {
        (axios.get as any).mockResolvedValueOnce({ data: [] });
        render(<LeaderPage />);
        await waitFor(() => {
            expect(screen.getByText(/No leaders/i)).toBeInTheDocument();
        });
    });

    it('should display leaders fetched from the API', async () => {
        (axios.get as any).mockResolvedValueOnce({ data: mockLeaders });
        render(<LeaderPage />);
        await waitFor(() => {
            expect(screen.getByText(/Cam Spencer/i)).toBeInTheDocument();
            expect(screen.getByText(/Tairrque Baker/i)).toBeInTheDocument();
        });
    });

    it('should filter leaders based on search input', async () => {
        const user = userEvent.setup();
        (axios.get as any).mockResolvedValueOnce({ data: mockLeaders });
        render(<LeaderPage />);

        await waitFor(() => {
            expect(screen.getByText(/Cam Spencer/i)).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText(/search leaders/i);
        await user.type(searchInput, 'Cam');

        expect(screen.getByText(/Cam Spencer/i)).toBeInTheDocument();
        expect(screen.queryByText(/Tairrque Baker/i)).not.toBeInTheDocument();
    });
});