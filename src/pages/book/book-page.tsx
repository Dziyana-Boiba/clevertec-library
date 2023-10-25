import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { BookDescription } from '../../components/book-page/book-description';
import { BookDetailedInfo } from '../../components/book-page/book-detailed-info';
import { BookRating } from '../../components/book-page/book-rating';
import { BookReviews } from '../../components/book-page/book-reviews';
import { Breadcrumbs } from '../../components/book-page/breadcrumbs';
import { ErrorToast } from '../../global/error-toast/error-toast';
import { Loader } from '../../global/loader/loader';
import { bookDetailsSelector } from '../../redux/book-details/selector';
import { getBookDetailsRequest } from '../../redux/book-details/slice';
import { AppDispatch } from '../../redux/store';

import './book-page.scss';

export const BookPage = () => {
  const { bookId } = useParams();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const id = bookId ? bookId : null;

    dispatch(getBookDetailsRequest(id));
  }, [dispatch, bookId]);

  const { data: bookDetails, loading, error } = useSelector(bookDetailsSelector);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className='book-page'>
      <Breadcrumbs />
      {error && <ErrorToast />}
      {bookDetails && (
        <div className='book-page_content'>
          <BookDescription bookDetails={bookDetails} />
          <BookRating rating={bookDetails?.rating} />
          <BookDetailedInfo bookDetails={bookDetails} />
          <BookReviews bookDetails={bookDetails} />
        </div>
      )}
    </section>
  );
};
