import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { IBook } from "../../../models/IBook";
import {
    fetchBooksFailed,
    fetchBooksSuccess
} from "../../actions/booksActions";
import { bookTypes } from "../../Actiontypes/booksTypes";

const getBooks = (keyword: string, startIndex: number) => () => axios.get<IBook[]>(`http://localhost:8000/api/books?keyword=${keyword}&startIndex=${startIndex}`);

function* fetchBooksSaga({ payload }: { type: any, payload: any }) {
    const { keyword, startIndex } = payload;
    try {
        const response: AxiosResponse<any> = yield call<any>(getBooks(keyword, startIndex));
        yield put(
            fetchBooksSuccess({
                books: response.data.items,
                totalCount: response.data.totalItems
            })
        )
    } catch (e: any) {
        console.log(e);
        yield put(
            fetchBooksFailed({
                error: e.message
            })
        )
    }
}

function* booksSaga() {
    yield all([takeLatest(bookTypes.FETCH_BOOK_REQUEST, fetchBooksSaga)]);
}

export default booksSaga;