import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './index'; // Update the import path if needed
import '@testing-library/jest-dom/extend-expect';

describe('Loader', () => {
    test('does not display the loader when showLoader is false', () => {
        render(<Loader showLoader={false} />);

        const loaderWrapper = screen.queryByText(/please wait/i);
        expect(loaderWrapper).not.toBeInTheDocument();
    });

    test('displays the loader when showLoader is true', () => {
        render(<Loader showLoader={true} />);

        const loaderWrapper = screen.getByText(/please wait/i);
        expect(loaderWrapper).toBeInTheDocument();
        expect(loaderWrapper).toHaveTextContent('Please wait...');
    });

    test('renders three dots after "Please wait"', () => {
        render(<Loader showLoader={true} />);

        const loaderWrapper = screen.getByText(/please wait/i);
        expect(loaderWrapper).toHaveTextContent('Please wait...');

        // Ensure there are exactly 3 dots rendered
        const dots = loaderWrapper.querySelectorAll('.dot');
        expect(dots.length).toBe(3);
    });
});
