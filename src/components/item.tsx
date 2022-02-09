import React, { FC } from "react";
import { IBook } from "../models/IBook";
import './item.scss';

export interface ItemProps {
    book: IBook;
    index: number;
}

const Item: FC<ItemProps> = ({ book, index }) => {
    return (
        <div key={book?.id} className="list-item" role="list-container">
            <div className="thumbnail" role="thumbnail">
                {book?.volumeInfo?.imageLinks?.thumbnail ? (
                    <a href={book?.selfLink || ''}>
                        <img role='thumbnail-img' src={book?.volumeInfo?.imageLinks?.thumbnail || ''} alt="" />
                    </a>
                ) : (
                    <div className="no-image">
                        <div className="no-imge-text">No image available</div>
                    </div>
                )}

            </div>
            <div className="detail" role='detail'>
                <a href={book?.selfLink || ''} role='self-url'>
                    <div className="cite-text">
                        <cite role="text">books.google.com<span className="volumn"> › books</span></cite>
                    </div>
                    <h3 role='title'>{book?.volumeInfo?.title || ''} {book?.volumeInfo?.publishedDate ? `- ${book.volumeInfo.publishedDate}` : ''}</h3>
                </a>
                <p role='print-type'>{book?.volumeInfo.printType}</p>
                <p role='search-info' dangerouslySetInnerHTML={{ __html: book?.searchInfo?.textSnippet ?? '' }} />
            </div>
        </div>
    )
}

export default Item;