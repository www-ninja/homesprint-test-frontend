import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import configureStore from 'redux-mock-store';
import { SampleBook } from './constant';

import App from './App';


jest.mock("react-redux", () => {
    const { Provider, useSelector } = jest.requireActual('react-redux');
    return {
        useDispatch: jest.fn(),
        useSelector,
        Provider
    }
})

describe('App unit test', () => {

    const initialState = {
        books: {
            pending: false,
            books: [],
            totalCount: 1,
            error: null
        }
    };

    const mockStore = configureStore();
    let store: any;

    test('It should show all book items and search bar', async () => {
        let books = [SampleBook];
        store = mockStore({
            ...initialState, books: {
                ...initialState.books,
                books: books
            }
        });
        render(<Provider store={store}> <App /></Provider >)

        const appContainer = screen.getByRole("app-container");
        expect(appContainer).toBeInTheDocument();

        const inputElement = screen.getByRole("search-input");
        expect(appContainer).toContainElement(inputElement);

        const itemElements = screen.getAllByRole("list-container");
        expect(itemElements.length).toBe(books.length);
    });

    test('It should show the loading if pending status', () => {
        store = mockStore({
            ...initialState, books: {
                ...initialState.books,
                pending: true,
            }
        });
        render(<Provider store={store}> <App /></Provider >)
        const appContainer = screen.getByRole("app-container");

        const loaderElement = screen.getByRole("loader");
        expect(appContainer).toContainElement(loaderElement);
    })

    test('It should show error message', () => {
        store = mockStore({
            ...initialState, books: {
                ...initialState.books,
                error: 'error',
            }
        });
        render(<Provider store={store}> <App /></Provider >)
        const appContainer = screen.getByRole("app-container");

        const errorElement = screen.getByRole("error");
        expect(appContainer).toContainElement(errorElement);
    })

    test('It should show error message', () => {
        store = mockStore({
            ...initialState, books: {
                ...initialState.books,
                error: 'error',
            }
        });
        render(<Provider store={store}> <App /></Provider >)
        const appContainer = screen.getByRole("app-container");

        const errorElement = screen.getByRole("error");
        expect(appContainer).toContainElement(errorElement);
    })

    test('It should call dispatch function', async () => {
        store = mockStore({
            ...initialState
        });
        render(<Provider store={store}> <App /></Provider >)

        const inputElement = screen.getByRole("search-input");

        await fireEvent.change(inputElement, { target: { value: 'search' } })
        await fireEvent.keyPress(inputElement, { key: 'enter', charCode: 13 })
        expect(inputElement).toHaveValue('search');

        const dispatchMock = jest.fn();
        dispatchMock.mockImplementation(action => store.dispatch(action))

        expect(dispatchMock).toHaveBeenCalledTimes(0);

    })
})

