import { useTranslation } from 'react-i18next';

import { RatingBar } from '../common/rating/rating-bar';

import './book-rating.scss';

type Props = {
  rating: number | null;
};

export const BookRating = ({ rating }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='book-rating-container'>
      <p className='book-page_block-title'>{t('main.RATING')}</p>
      <div className='rating'>
        <RatingBar rating={rating} />
        <span>{rating}</span>
      </div>
    </div>
  );
};
