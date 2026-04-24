import {render, screen} from "@testing-library/react";
import {ReviewForm} from "../ReviewForm.tsx";
import {expect} from "vitest";

describe('Review Form', ()=>
{
    const setIsModalOpen = (isOpen: boolean) => {false};
    it('should display form heading and fields ', () => {
        render(<ReviewForm onClose={() => setIsModalOpen(false)} isOpen={true}/>);

        expect(screen.getByRole('heading', {name: /Create a Review/i})).toBeInTheDocument();


    });
}



)