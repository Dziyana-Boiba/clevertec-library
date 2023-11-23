import { useTranslation } from 'react-i18next';

import { ReactComponent as StarIcon } from '../../../assets/images/Icon_star.svg';
import { ReactComponent as StarEmptyIcon } from '../../../assets/images/Icon_star-empty.svg';

import './rating-bar.scss';

type Props = {
  rating: number | null;
};

export const RatingBar = ({ rating }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='rating-bar'>
      {rating ? (
        <div>
          <StarIcon />
          {rating > 1 ? <StarIcon /> : <StarEmptyIcon />}
          {rating > 2 ? <StarIcon /> : <StarEmptyIcon />}
          {rating > 3 ? <StarIcon /> : <StarEmptyIcon />}
          {rating > 4 ? <StarIcon /> : <StarEmptyIcon />}
        </div>
      ) : (
        <span>{t('main.NO_REVIEWS_YET')}</span>
      )}
    </div>
  );
};
