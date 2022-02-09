import React from 'react';
import { render, screen } from '@testing-library/react';
import { SampleBook } from '../constant';
import Item from './item';

test('Item should contain thumbnail and details', () => {
    render(<Item book={SampleBook} index={0} />)

    const itemContainerElement = screen.getByRole("list-container");
    expect(itemContainerElement).toBeInTheDocument();

    const thumbnailElement = screen.getByRole("thumbnail");
    expect(itemContainerElement).toContainElement(thumbnailElement)

    const detailElement = screen.getByRole("detail");
    expect(itemContainerElement).toContainElement(detailElement)

    // check image renders the thumnail correctly
    const thumbnailImage = screen.getByRole('thumbnail-img')
    expect(itemContainerElement).toContainElement(thumbnailImage)
    expect(thumbnailImage).toHaveAttribute("src", SampleBook.volumeInfo.imageLinks.thumbnail);
    expect(thumbnailImage).toHaveAttribute("alt", ""); //ADA compliance


    // check detail contains all stuffs
    const navigationElement = screen.getByRole('self-url');
    expect(detailElement).toContainElement(navigationElement);
    expect(navigationElement).toHaveAttribute("href", SampleBook.selfLink);

    const textElement = screen.getByRole('text');
    expect(navigationElement).toContainElement(textElement);

    const titleElement = screen.getByRole('title');
    expect(navigationElement).toContainElement(titleElement);
    expect(titleElement).toHaveTextContent(`${SampleBook.volumeInfo.title} - ${SampleBook.volumeInfo.publishedDate}`)


    const printTypeElement = screen.getByRole("print-type");
    expect(detailElement).toContainElement(printTypeElement);

    const searchInfoElement = screen.getByRole("search-info");
    expect(detailElement).toContainElement(searchInfoElement);

});