import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalPopup from './index'; // Update the import path if needed
import '@testing-library/jest-dom/extend-expect';

describe('ModalPopup', () => {
    test('does not render modal when showModal is false', () => {
        render(<ModalPopup showModal={false} title="Test Title" content="Test Content" handleClose={() => { }} />);

        const modalWrapper = screen.queryByText(/test title/i);
        expect(modalWrapper).not.toBeInTheDocument();
    });

    test('renders modal when showModal is true', () => {
        render(<ModalPopup showModal={true} title="Test Title" content="Test Content" handleClose={() => { }} />);

        const modalTitle = screen.getByText(/test title/i);
        expect(modalTitle).toBeInTheDocument();
        expect(screen.getByText(/test content/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    test('calls handleClose when close button is clicked', () => {
        const handleClose = jest.fn();
        render(<ModalPopup showModal={true} title="Test Title" content="Test Content" handleClose={handleClose} />);

        const closeButton = screen.getByRole('button', { name: /close/i });
        closeButton.click();

        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
