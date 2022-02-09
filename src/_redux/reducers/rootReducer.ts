import { combineReducers } from "redux";
import bookReducer from "./booksReducer";

const rootReducer = combineReducers({
    books: bookReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;