import {ReviewPage} from "../ReviewPage.tsx";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {expect} from 'vitest';


describe('Review Page', () => {

    it('should display a Review Header', () => {

        render(<ReviewPage/>);

        // Assert
        expect(screen.getByRole('list')).toBeInTheDocument();


        // Assert
        expect(
            screen.getByRole('heading', {name: /Review Box/i}),
        ).toBeInTheDocument();

    });


});