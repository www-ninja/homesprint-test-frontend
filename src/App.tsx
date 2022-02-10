import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IBook } from './models/IBook';

import Item from './components/item';

import { getBookList } from './api/book';

import { ERROR_MESSAGE_API, ERROR_MESSAGE_SERVER, PAGE_COUNT } from './constant';

import CloseIcon from './close.svg';
import "./App.scss";

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [books, setBooks] = useState<IBook[]>([]);
  const [pending, setPending] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState('');

  const searchBook = async (keyword: string, startIndex: number) => {
    setPending(true);
    const { books, totalCount, error } = await getBookList(keyword, startIndex);
    setPending(false);
    setBooks(books);
    setTotalCount(totalCount);
    setError(error);

  }

  const handleKeyDown = (event: any) => (event.key === 'Enter' && keyword !== '') && searchBook(keyword, 0)

  const onSelectPage = (pageNumber: number) => (keyword !== '') && searchBook(keyword, pageNumber * PAGE_COUNT)




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
          <span onClick={() => setKeyword('')} role='close-button'>
            <img src={CloseIcon} alt='' />
          </span>
        )}
      </div>
      {pending ? (
        <div className='loader' role='loader' />
      ) : error !== '' ? (
        <div role='error'>{ERROR_MESSAGE_SERVER}</div>
      ) : (
        books?.length > 0 ? books.map((book, index) => (
          <Item book={book} index={index} key={index} />
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
