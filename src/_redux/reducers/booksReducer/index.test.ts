import bookReducer, { initialState } from './index';
import { fetchBooksRequest, fetchBooksSuccess, fetchBooksFailed } from '../../actions/booksActions';
import { SampleBook } from '../../../constant';


test('should pending true', () => {
    const newState = bookReducer(initialState, fetchBooksRequest({ keyword: 'test', startIndex: 0 }));
    expect(newState.pending).toEqual(true);
});

test('should add books', () => {
    const books = [SampleBook];
    const totalCount = 1;

    const newState = bookReducer(initialState, fetchBooksSuccess({ books, totalCount }));

    expect(newState.books.length).toEqual(books.length);
    expect(newState.books[0]).toEqual(books[0]);
    expect(newState.totalCount).toEqual(1);
    expect(newState.error).toEqual(null);
    expect(newState.pending).toEqual(false);

});

test('should error with message', () => {
    const error = 'Error message';

    const newState = bookReducer(initialState, fetchBooksFailed({ error }))
    expect(newState.error).toEqual(error);
    expect(newState.pending).toEqual(false);
});
