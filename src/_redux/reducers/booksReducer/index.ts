import { bookTypes } from "../../Actiontypes/booksTypes";
import { BooksActions, BooksState } from "../../types";

export const initialState: BooksState = {
    pending: false,
    books: [],
    totalCount: 0,
    error: null,
};

const bookReducer = (state = initialState, action: BooksActions) => {
    switch (action.type) {
        case bookTypes.FETCH_BOOK_REQUEST:
            return {
                ...state,
                pending: true
            };
        case bookTypes.FETCH_BOOK_SUCCESS:
            return {
                ...state,
                pending: false,
                books: action.payload.books,
                totalCount: action.payload.totalCount,
                error: null
            };
        case bookTypes.FETCH_BOOK_FAILED:
            return {
                ...state,
                pending: false,
                books: [],
                error: action.payload.error
            };
        default:
            return {
                ...state
            };
    }
}
export default bookReducer;