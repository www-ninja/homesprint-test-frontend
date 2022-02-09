import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import Item from './components/item';

import { fetchBooksRequest } from './_redux/actions/booksActions';
import { RootState } from './_redux/reducers/rootReducer';

import { ERROR_MESSAGE_API, ERROR_MESSAGE_SERVER, PAGE_COUNT } from './constant';

import CloseIcon from './close.svg';

import "./App.scss";

const App = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const { pending, books, totalCount, error } = useSelector((state: RootState) => state.books);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && keyword !== '') {
      dispatch(fetchBooksRequest({ keyword: keyword, startIndex: 0 }));
    }
  }

  const onSelectPage = (pageNumber: number) => {
    if (keyword !== '') dispatch(fetchBooksRequest({ keyword: keyword, startIndex: pageNumber * PAGE_COUNT }));
  }

  return (
    <div className='app' role="app-container">
      <div className='search-bar'>
        <input
          role='search-input'
          className='input-keyword'
          placeholder='Type your keyword for book search'
          onChange={ev => setKeyword(ev.target.value)}
          value={keyword}
          onKeyDown={handleKeyDown}
        />

        {keyword && keyword !== '' && (
          <span onClick={() => setKeyword('')}>
            <img src={CloseIcon} alt='' />
          </span>
        )}
      </div>
      {pending ? (
        <div className='loader' role='loader' />
      ) : error ? (
        <div role='error'>{ERROR_MESSAGE_SERVER}</div>
      ) : (
        books?.length > 0 ? books.map((book, index) => (
          <Item book={book} index={index} key={book.id} />
        )) : (
          <div role='error'>{ERROR_MESSAGE_API}</div>
        )
      )}
      {totalCount > 10 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          nextClassName='page-item next'
          previousLabel="Previous"
          previousClassName='page-item previous'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          containerClassName={`pagination ${pending && 'invisible'}`}
          activeClassName='active'
          onPageChange={value => onSelectPage(value.selected)}
          pageRangeDisplayed={10}
          pageCount={totalCount / 10}
        />
      )}
    </div>
  );
}

export default App;
