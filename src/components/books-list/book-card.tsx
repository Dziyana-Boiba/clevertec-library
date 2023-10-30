import { useSelector } from 'react-redux';

import { ReactComponent as CatIcon } from '../../assets/images/Icon_Cat.svg';
import { appStateSelector } from '../../redux/app-state/selector';
import { BookType } from '../../types/books';
import { bookingMessage } from '../../utils/booking';
import { Button } from '../common/button/button';
import { RatingBar } from '../common/rating/rating-bar';

import './book-card.scss';

type Props = {
  book: BookType;
  isListView: boolean;
  onClick: (id: number) => void;
};

export const BookCard = ({ book, isListView, onClick }: Props) => {
  const { search } = useSelector(appStateSelector);

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      onClick(id);
    }
  };

  const replace = (title: string, searchText: string) => {
    const splitedTitle = title.split(new RegExp(`(${search})`, 'gi'));

    return (
      <p>
        {splitedTitle.map((item) => (item.toLowerCase() === searchText.toLowerCase() ? <span>{item}</span> : item))}
      </p>
    );
  };

  return (
    <section
      className={isListView ? 'card-container-list' : 'card-container-table'}
      onClick={() => onClick(book.id)}
      onKeyDown={(e) => handleKeyDown(e, book.id)}
      role='button'
      tabIndex={0}
      data-test-id='card'
    >
      <div className='card-container_book-image'>
        {book.image && book.image.url ? (
          <img loading='lazy' src={book.image.url} alt='Title page of the book' />
        ) : (
          <CatIcon />
        )}
      </div>
      <div className='card-container_content'>
        {!isListView && <RatingBar rating={book.rating} />}
        <div className='title-overflow-container'>
          <p>{search ? replace(book.title, search) : book.title}</p>
        </div>
        <div className='author-overflow-container'>
          <p>
            {book.authors && book.authors.map((author) => `${author}, `)}
            {book.issueYear}
          </p>
        </div>
        <div className='card-footer'>
          {isListView && <RatingBar rating={book.rating} />}

          <Button
            className={!book.delivery && book.booking ? 'booked' : ''}
            disabled={book.delivery || book.booking ? true : false}
          >
            {bookingMessage(book.booking, book.delivery)}
          </Button>
        </div>
      </div>
    </section>
  );
};
