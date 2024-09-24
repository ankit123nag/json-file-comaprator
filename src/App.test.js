import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; // Update the import path if needed
import '@testing-library/jest-dom/extend-expect';

// Mock FileComparator component to avoid testing the full implementation
jest.mock('./container/FileComparator', () => () => <div data-testid="file-comparator" />);

describe('App', () => {
  test('renders the header', () => {
    render(<App />);

    const headerElement = screen.getByText(/File Comparator/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the FileComparator component', () => {
    render(<App />);

    const fileComparatorElement = screen.getByTestId('file-comparator');
    expect(fileComparatorElement).toBeInTheDocument();
  });
});
