import { all, fork } from "redux-saga/effects";
import booksSaga from "./booksSaga";

export function* rootSaga() {
    yield all([fork(booksSaga)]);
}
