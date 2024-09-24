import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UploadFile from './index'; // Update the import path if needed
import '@testing-library/jest-dom/extend-expect';

describe('UploadFile', () => {
    const mockSetFileData = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock history before each test
    });

    test('renders file upload input correctly', () => {
        render(<UploadFile sequence={1} setFileData={mockSetFileData} />);

        const uploadLabel = screen.getByText(/please upload a file 1/i);
        expect(uploadLabel).toBeInTheDocument();
        expect(screen.getByLabelText(/please upload a file 1/i)).toBeInTheDocument();
    });

    test('shows warning for invalid file type', () => {
        render(<UploadFile sequence={1} setFileData={mockSetFileData} />);

        const file = new Blob(['Not a JSON file'], { type: 'text/plain' });
        const fileInput = screen.getByLabelText(/please upload a file 1/i);

        Object.defineProperty(fileInput, 'files', {
            value: [file],
        });

        fireEvent.change(fileInput);

        const warningModal = screen.getByText(/oops!/i);
        expect(warningModal).toBeInTheDocument();
        expect(screen.getByText(/please upload a valid json file/i)).toBeInTheDocument();
    });

    test('shows warning for invalid JSON content', async () => {
        const file = new Blob(['{"key": "value"'], { type: 'application/json' });
        const fileInput = render(<UploadFile sequence={1} setFileData={mockSetFileData} />).container.querySelector('input[type="file"]');

        Object.defineProperty(fileInput, 'files', {
            value: [file],
        });

        fireEvent.change(fileInput);

        const warningModal = await screen.findByText(/oops!/i);
        expect(warningModal).toBeInTheDocument();
        expect(screen.getByText(/something went wrong!!!/i)).toBeInTheDocument();
    });
});
