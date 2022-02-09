import { bookTypes } from "../../Actiontypes/booksTypes";
import {
    FetchBooksFailed,
    FetchBooksFailedPayload,
    FetchBooksRequest,
    FetchBooksRequstPayload,
    FetchBooksSuccess,
    FetchBooksSuccessPayload
} from "../../types";

export const fetchBooksRequest = (
    payload: FetchBooksRequstPayload
): FetchBooksRequest => ({
    type: bookTypes.FETCH_BOOK_REQUEST,
    payload
});

export const fetchBooksSuccess = (
    payload: FetchBooksSuccessPayload
): FetchBooksSuccess => ({
    type: bookTypes.FETCH_BOOK_SUCCESS,
    payload
});

export const fetchBooksFailed = (
    payload: FetchBooksFailedPayload
): FetchBooksFailed => ({
    type: bookTypes.FETCH_BOOK_FAILED,
    payload
});