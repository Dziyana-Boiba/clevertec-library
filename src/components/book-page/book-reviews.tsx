import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CatIcon from '../../assets/images/Icon_Cat.svg';
import { ReactComponent as IconChevronDown } from '../../assets/images/Icon_Chevron_Down.svg';
import { BookDetailsType, CommentType } from '../../types/books';
import { formatDate } from '../../utils/format-date';
import { Button } from '../common/button/button';
import { RatingBar } from '../common/rating/rating-bar';

import './book-reviews.scss';

type Props = {
  bookDetails: BookDetailsType | null;
};

export const BookReviews = ({ bookDetails }: Props) => {
  const { t } = useTranslation();
  const [isReviewOpen, setIsReviewOpen] = useState(true);
  const openReviewsHandler = () => {
    setIsReviewOpen((prevState) => !prevState);
  };

  return (
    <div className='reviews-container'>
      <p className={isReviewOpen ? 'book-page_block-title' : 'book-page_block-title closed'}>
        {t('main.REVIEWS')}
        <span>{bookDetails?.comments ? bookDetails?.comments.length : 0}</span>
        {bookDetails?.comments && (
          <IconChevronDown
            className={isReviewOpen ? 'review-toggle-icon open' : 'review-toggle-icon'}
            onClick={openReviewsHandler}
            data-test-id='button-hide-reviews'
          />
        )}
      </p>
      <div className={isReviewOpen ? 'reviews-wrapper open' : 'reviews-wrapper'}>
        {bookDetails?.comments &&
          bookDetails.comments.map((review: CommentType) => (
            <div key={review.id} className='review-block'>
              <div className='user-info'>
                <img src={review.user.avatarUrl ? review.user.avatarUrl : CatIcon} alt='User Avatar' />
                <div className='user-name'>
                  <span>
                    {review.user.firstName} {review.user.lastName}
                  </span>
                  <span>{formatDate(review.createdAt)}</span>
                </div>
              </div>
              <div className='review-rating'>
                <RatingBar rating={review.rating} />
              </div>
              <div className='review-text'>{review.text}</div>
            </div>
          ))}
      </div>

      <Button data-test-id='button-rating'>{t('main.RATE_BOOK')}</Button>
    </div>
  );
};
