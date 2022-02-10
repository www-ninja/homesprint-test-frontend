import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getBookList } from './api/book';

import { SampleBook } from './constant';
import App from './App';

jest.mock('./api/book.ts', () => ({

    ...jest.requireActual('./api/book.ts'),
    getBookList: jest.fn()
}))

describe('App unit test', () => {
    test('it should set search input', async () => {
        const books = [SampleBook];
        (getBookList as jest.MockedFunction<typeof getBookList>).mockResolvedValueOnce({
            books: books,
            totalCount: 20,
            error: ''
        })
        render(<App />)

        const inputElement = screen.getByRole("search-input");

        fireEvent.change(inputElement, { target: { value: 'search' } })
        expect(inputElement).toHaveValue('search');

        fireEvent.keyDown(inputElement, { key: 'Enter', charCode: 13 })

        await waitFor(() => {
            expect(screen.getAllByRole('list-container')).toBeDefined();
        });
        expect(screen.getAllByRole('close-button')).toBeDefined();
        expect(screen.getAllByRole('list-container').length).toBe(books.length);

        expect(getBookList).toBeCalledTimes(1);
    })

    test('It should show error message', async () => {
        (getBookList as jest.MockedFunction<typeof getBookList>).mockResolvedValueOnce({
            books: [],
            totalCount: 1,
            error: 'error_message'
        })
        render(<App />)

        const inputElement = screen.getByRole("search-input");

        fireEvent.change(inputElement, { target: { value: 'search' } })
        expect(inputElement).toHaveValue('search');
        fireEvent.keyDown(inputElement, { key: 'Enter', charCode: 13 })
        expect(screen.getByRole('loader')).toBeDefined();
        await waitFor(() => {
            expect(screen.getByRole('error')).toBeDefined();
        });


    })
})

