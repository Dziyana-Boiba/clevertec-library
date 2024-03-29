import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { ReactComponent as SlashIcon } from '../../assets/images/Icon_Slash.svg';
import { bookDetailsSelector } from '../../redux/book-details/selector';
import { categoriesSelector } from '../../redux/categories/selector';

import './breadcrumbs.scss';

export const Breadcrumbs = () => {
  const { t } = useTranslation();
  const { category } = useParams();

  const { data: categories } = useSelector(categoriesSelector);
  const { data: bookDetails } = useSelector(bookDetailsSelector);

  let currentCategory = null;

  if (categories && category !== 'all') {
    currentCategory = categories.find(({ path }) => path === category)?.nameLang;
  }

  return (
    <div className='book-page_breadcrumbs'>
      <div className='book-page_breadcrumbs_link'>
        <NavLink to={`/books/${category}`}>{currentCategory ? t(currentCategory) : t('categories.ALL_BOOKS')}</NavLink>{' '}
        <SlashIcon className='slash' /> <span>{bookDetails?.title}</span>
      </div>
    </div>
  );
};
