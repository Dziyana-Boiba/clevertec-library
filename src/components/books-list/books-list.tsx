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
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const { search, ratingDown } = useSelector(appStateSelector);

  const { data: booksList } = useSelector(booksSelector);
  const { data: categoriesData } = useSelector(categoriesSelector);

  const openBook = (id: number) => {
    navigate(`${id}`);
  };

  let currentCategory: CategoryType | null = null;

  if (categoriesData && category !== 'all') {
    currentCategory = categoriesData.find((item: CategoryType) => item.path === category);
  }

  let currentBooksList = booksList;

  if (booksList && category !== 'all' && currentCategory) {
    currentBooksList = booksList.filter(({ categories }) => categories && categories.includes(currentCategory.name));
  }

  if (search && currentBooksList) {
    currentBooksList = currentBooksList.filter((item: BookType) =>
      item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
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
        По запросу ничего не найдено
      </div>
    ) : (
      <div className='no-books' data-test-id='empty-category'>
        В этой категории книг ещё нет
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
