import './rating-bar.scss';
import { ReactComponent as StarIcon } from '../../../assets/images/Icon_star.svg';
import { ReactComponent as StarEmptyIcon } from '../../../assets/images/Icon_star-empty.svg';

type Props = {
  rating: number;
};

export const RatingBar = ({ rating }: Props) => (
  <div className='rating-bar'>
    {rating > 0 ? (
      <div>
        <StarIcon />
        {rating > 1 ? <StarIcon /> : <StarEmptyIcon />}
        {rating > 2 ? <StarIcon /> : <StarEmptyIcon />}
        {rating > 3 ? <StarIcon /> : <StarEmptyIcon />}
        {rating > 4 ? <StarIcon /> : <StarEmptyIcon />}
      </div>
    ) : (
      <span>ещё нет оценок</span>
    )}
  </div>
);
