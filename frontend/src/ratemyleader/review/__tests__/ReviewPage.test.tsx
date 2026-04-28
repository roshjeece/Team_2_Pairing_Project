// Tests that ReviewPage renders the correct heading and the ReviewForm component.
// ReviewForm is mocked — we are not testing form behavior here, only that the page mounts correctly.

import { ReviewPage } from "../ReviewPage.tsx";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { expect, vi, describe, it, beforeEach } from "vitest";

// Mock ReviewForm so ReviewPage tests stay isolated from form logic
vi.mock("../ReviewForm.tsx", () => ({
  ReviewForm: () => <div>Mock Review Form</div>
}));

describe('Review Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Confirms the page heading renders
  it('should display the review page heading', () => {
    render(<ReviewPage />);
    expect(screen.getByRole('heading', { name: /Review Page/i })).toBeInTheDocument();
  });

  // Confirms ReviewForm is rendered on the page
  it('should display the review form', () => {
    render(<ReviewPage />);
    expect(screen.getByText(/Mock Review Form/i)).toBeInTheDocument();
  });
});