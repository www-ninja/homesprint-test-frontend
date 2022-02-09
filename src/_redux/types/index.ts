import { IBook } from "../../models/IBook";
import { bookTypes } from "../Actiontypes/booksTypes";

export interface BooksState {
    pending: boolean;
    books: IBook[];
    totalCount: number
    error: string | null;
}

export interface FetchBooksRequstPayload {
    keyword: string;
    startIndex: number;
}

export interface FetchBooksSuccessPayload {
    books: IBook[];
    totalCount: number;
}

export interface FetchBooksFailedPayload {
    error: string;
}

export interface FetchBooksRequest {
    type: typeof bookTypes.FETCH_BOOK_REQUEST;
    payload: FetchBooksRequstPayload
}

export type FetchBooksSuccess = {
    type: typeof bookTypes.FETCH_BOOK_SUCCESS;
    payload: FetchBooksSuccessPayload;
};

export type FetchBooksFailed = {
    type: typeof bookTypes.FETCH_BOOK_FAILED;
    payload: FetchBooksFailedPayload;
};

export type BooksActions =
    | FetchBooksRequest
    | FetchBooksSuccess
    | FetchBooksFailed;
