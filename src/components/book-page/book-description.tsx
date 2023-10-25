import React from 'react';

import { BookSwiper } from '../book-swiper/book-swiper';
import { Button } from '../common/button/button';
import { BookDetailsType } from '../../types/books';
import { bookingMessage } from '../../utils/booking';

type Props = {
  bookDetails: BookDetailsType | null;
};

export const BookDescription = ({ bookDetails }: Props) => (
  <React.Fragment>
    <div className='book-description-container'>
      <div className='book-image'>
        <BookSwiper images={bookDetails?.images} />
      </div>
      <div className='book-description'>
        <div className='book-title' data-test-id='book-title'>
          {bookDetails?.title}
        </div>
        <div className='book-author'>
          {bookDetails?.authors && bookDetails?.authors.map((author: string) => `${author}, `)}
          {bookDetails?.issueYear}
        </div>
        <Button
          className={!bookDetails?.delivery && bookDetails?.booking ? 'booked' : ''}
          disabled={bookDetails?.delivery === null ? false : true}
        >
          {bookingMessage(bookDetails?.booking, bookDetails?.delivery)}
        </Button>
        <div className='about'>
          <p>О книге</p>
          <div>{bookDetails?.description}</div>
        </div>
      </div>
    </div>
    <div className='about-mobile-version'>
      <p className='book-page_block-title'>О книге</p>
      <div>{bookDetails?.description}</div>
    </div>
  </React.Fragment>
);
