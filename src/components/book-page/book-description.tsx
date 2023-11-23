import React from 'react';
import { useTranslation } from 'react-i18next';

import { BookDetailsType } from '../../types/books';
import { bookingMessage } from '../../utils/booking';
import { BookSwiper } from '../book-swiper/book-swiper';
import { Button } from '../common/button/button';

import './book-description.scss';

type Props = {
  bookDetails: BookDetailsType;
};

export const BookDescription = ({ bookDetails }: Props) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className='book-description-container'>
        <div className='book-image'>
          <BookSwiper images={bookDetails.images} id={bookDetails.id} />
        </div>
        <div className='book-description'>
          <div className='book-title' data-test-id='book-title'>
            {bookDetails.title}
          </div>
          <div className='book-author'>
            {bookDetails.authors && bookDetails?.authors.map((author: string) => `${author}, `)}
            {bookDetails.issueYear}
          </div>
          <Button
            className={!bookDetails.delivery && bookDetails.booking ? 'booked' : ''}
            disabled={bookDetails.delivery === null ? false : true}
          >
            {bookingMessage(bookDetails.booking, bookDetails.delivery)}
          </Button>
          <div className='about'>
            <p>{t('main.ABOUT_BOOK')}</p>
            <div>{bookDetails.description}</div>
          </div>
        </div>
      </div>
      <div className='about-mobile-version'>
        <p className='book-page_block-title'>{t('main.ABOUT_BOOK')}</p>
        <div>{bookDetails.description}</div>
      </div>
    </React.Fragment>
  );
};
