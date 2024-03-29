import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { appStateSelector } from '../../redux/app-state/selector';
import { booksSelector } from '../../redux/books/selector';
import { categoriesSelector } from '../../redux/categories/selector';
import { BookType } from '../../types/books';
import { CategoryType } from '../../types/categories';

import { BookCard } from './book-card';

import './books-list.scss';

type Props = {
  isListView: boolean;
};

export const BooksList = ({ isListView }: Props) => {
  const { t } = useTranslation();
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const { search, ratingDown } = useSelector(appStateSelector);

  const { data: booksList } = useSelector(booksSelector);
  const { data: categoriesData } = useSelector(categoriesSelector);

  const openBook = (id: number) => {
    navigate(`${id}`);
  };

  let categoryName = 'all';

  if (categoriesData && category !== 'all') {
    const currentCategory = categoriesData.find((item: CategoryType) => item.path === category?.toLowerCase());

    categoryName = currentCategory ? currentCategory.name : 'all';
  }

  let currentBooksList = booksList;

  if (booksList && categoryName !== 'all') {
    currentBooksList = booksList.filter(({ categories }) => categories && categories.includes(categoryName));
  }

  if (search && currentBooksList) {
    currentBooksList = currentBooksList.filter((item: BookType) => item.title.toLowerCase().includes(search));
  }

  if (booksList && currentBooksList) {
    currentBooksList = [...currentBooksList].sort((a: BookType, b: BookType) =>
      ratingDown
        ? (b.rating ? b.rating : 0) - (a.rating ? a.rating : 0)
        : (a.rating ? a.rating : 0) - (b.rating ? b.rating : 0)
    );
  }

  if (currentBooksList && currentBooksList.length === 0) {
    return search ? (
      <div className='no-books' data-test-id='search-result-not-found'>
        {t('main.NOTHING_FOUND')}
      </div>
    ) : (
      <div className='no-books' data-test-id='empty-category'>
        {t('main.NO_BOOKS_IN_CATEGORY')}
      </div>
    );
  }

  return (
    <div className={isListView ? 'books-list-container' : 'books-table-container'}>
      {currentBooksList &&
        currentBooksList.map((book: BookType) => (
          <BookCard book={book} isListView={isListView} onClick={openBook} key={book.id} />
        ))}
    </div>
  );
};
