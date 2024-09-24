import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileComparator from './index'; // Update the import path if needed
import '@testing-library/jest-dom/extend-expect';

// Mock child components that may not need to be tested in isolation
jest.mock('../../components/UploadFile', () => ({ sequence, setFileData }) => (
    <div data-testid={`upload-file-${sequence}`}>
        <button onClick={() => setFileData({ name: `file${sequence}`, fileName: `file${sequence}.json`, parsedData: { key: sequence } })}>
            Upload file {sequence}
        </button>
    </div>
));

jest.mock('../../components/OutputSection', () => ({ diff, file1, file2 }) => (
    <div data-testid="output-section">
        Diff: {JSON.stringify(diff)}, File1: {JSON.stringify(file1)}, File2: {JSON.stringify(file2)}
    </div>
));

jest.mock('../../components/ModalPopup', () => ({ showModal, title, content, handleClose }) => (
    showModal ? (
        <div data-testid="modal-popup">
            <h1>{title}</h1>
            <p>{content}</p>
            <button onClick={handleClose}>Close</button>
        </div>
    ) : null
));

describe('FileComparator', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders upload buttons and compare button', () => {
        render(<FileComparator />);

        expect(screen.getByText('Upload file 1')).toBeInTheDocument();
        expect(screen.getByText('Upload file 2')).toBeInTheDocument();
        expect(screen.getByText('Compare')).toBeInTheDocument();
    });

    test('shows error modal if both files are missing', async () => {
        render(<FileComparator />);

        fireEvent.click(screen.getByText('Compare'));

        await waitFor(() => expect(screen.getByTestId('modal-popup')).toBeInTheDocument());
        expect(screen.getByText(/Oops! Missing File!/i)).toBeInTheDocument();
        expect(screen.getByText(/both files are missing/i)).toBeInTheDocument();
    });

    test('shows error modal if one file is missing (file 1)', async () => {
        render(<FileComparator />);

        // Simulate uploading file 2
        fireEvent.click(screen.getByText('Upload file 2'));

        fireEvent.click(screen.getByText('Compare'));

        await waitFor(() => expect(screen.getByTestId('modal-popup')).toBeInTheDocument());
        expect(screen.getByText(/file 1 missing/i)).toBeInTheDocument();
    });

    test('shows error modal if one file is missing (file 2)', async () => {
        render(<FileComparator />);

        // Simulate uploading file 1
        fireEvent.click(screen.getByText('Upload file 1'));

        fireEvent.click(screen.getByText('Compare'));

        await waitFor(() => expect(screen.getByTestId('modal-popup')).toBeInTheDocument());
        expect(screen.getByText(/file 2 missing/i)).toBeInTheDocument();
    });

    test('displays output section with diff when both files are uploaded', async () => {
        render(<FileComparator />);

        // Simulate uploading file 1 and file 2
        fireEvent.click(screen.getByText('Upload file 1'));
        fireEvent.click(screen.getByText('Upload file 2'));

        fireEvent.click(screen.getByText('Compare'));

        await waitFor(() => expect(screen.getByTestId('output-section')).toBeInTheDocument());
        expect(screen.getByText(/ \{.*\}/i)).toBeInTheDocument();
    });

    test('closes modal popup when close button is clicked', async () => {
        render(<FileComparator />);

        fireEvent.click(screen.getByText('Compare'));

        await waitFor(() => expect(screen.getByTestId('modal-popup')).toBeInTheDocument());
        fireEvent.click(screen.getByText('Close'));

        await waitFor(() => expect(screen.queryByTestId('modal-popup')).not.toBeInTheDocument());
    });
});
