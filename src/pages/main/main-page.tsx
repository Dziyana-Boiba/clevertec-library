import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BooksList } from '../../components/books-list/books-list';
import { SelectBar } from '../../components/common/select-bar/select-bar';
import { ErrorToast } from '../../global/error-toast/error-toast';
import { Loader } from '../../global/loader/loader';
import { booksSelector } from '../../redux/books/selector';
import { getBooksRequest } from '../../redux/books/slice';
import { categoriesSelector } from '../../redux/categories/selector';
import { getCategoriesRequest } from '../../redux/categories/slice';
import { AppDispatch } from '../../redux/store';

export const MainPage = () => {
  const [isListView, setIsListView] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const { loading: booksLoading, error: booksError } = useSelector(booksSelector);
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useSelector(categoriesSelector);

  const selectViewHandler = (viewType: string) => {
    if (viewType === 'list') {
      setIsListView(true);
    } else {
      setIsListView(false);
    }
  };

  useEffect(() => {
    if (!categories) {
      dispatch(getCategoriesRequest());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    dispatch(getBooksRequest());
  }, [dispatch]);

  if (booksLoading || categoriesLoading) {
    return <Loader />;
  }

  if (booksError || categoriesError) {
    return <ErrorToast />;
  }

  return (
    <section>
      <SelectBar selectView={selectViewHandler} isListView={isListView} />
      <BooksList isListView={isListView} />
    </section>
  );
};
