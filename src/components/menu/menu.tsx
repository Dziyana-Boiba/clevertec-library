import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as IconChevronDown } from '../../assets/images/Icon_Chevron_Down.svg';
import { RoutePath } from '../../constants/routes';
import { appStateSelector } from '../../redux/app-state/selector';
import { setBurgerOpen } from '../../redux/app-state/slice';
import { booksSelector } from '../../redux/books/selector';
import { categoriesSelector } from '../../redux/categories/selector';
import { CategoryType } from '../../types/categories';
import { countBooks } from '../../utils/count-books';

import './menu.scss';

export const Menu = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isBurgerOpen } = useSelector(appStateSelector);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const { data: categoriesData, error: categoriesError } = useSelector(categoriesSelector);
  const { data: booksData, error: booksError } = useSelector(booksSelector);

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isBurgerOpen]);

  const openMenuHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname.includes('/books')) {
      e.preventDefault();
    }
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenuHandler = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const closeSidebarHandler = () => {
    if (isBurgerOpen) {
      dispatch(setBurgerOpen());
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate(RoutePath.auth);
  };

  return (
    <div className={isBurgerOpen ? 'menu-container open' : 'menu-container'}>
      <nav>
        <ul className='main-menu'>
          <li>
            <NavLink
              to={RoutePath.books}
              onClick={(e) => openMenuHandler(e)}
              className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}
            >
              Витрина книг
              {!categoriesError && !booksError && (
                <IconChevronDown className={isMenuOpen ? 'main-menu_link_svg open' : 'main-menu_link_svg'} />
              )}
            </NavLink>
            {!categoriesError && !booksError && (
              <ul className={isMenuOpen ? 'categories open' : 'categories'}>
                <li>
                  <NavLink
                    to={RoutePath.booksAll}
                    onClick={closeSidebarHandler}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Все книги
                  </NavLink>
                </li>
                {categoriesData &&
                  categoriesData.map((category: CategoryType) => (
                    <li key={`category${category.id}`}>
                      <NavLink
                        to={`/books/${category.path}`}
                        onClick={closeSidebarHandler}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        {category.name}
                      </NavLink>
                      <span>{countBooks(category.name, booksData)}</span>
                    </li>
                  ))}
              </ul>
            )}
          </li>
          <li>
            <NavLink
              to={RoutePath.terms}
              onClick={() => {
                closeMenuHandler();
                closeSidebarHandler();
              }}
              className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}
            >
              Правила пользования
            </NavLink>
          </li>
          <li>
            <NavLink
              to={RoutePath.contract}
              onClick={() => {
                closeMenuHandler();
                closeSidebarHandler();
              }}
              className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}
            >
              Договор оферты
            </NavLink>
          </li>
        </ul>
        <ul className='second-menu'>
          <li>
            <NavLink
              to='/'
              onClick={() => {
                closeMenuHandler();
                closeSidebarHandler();
              }}
              className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/'
              onClick={() => {
                closeMenuHandler();
                closeSidebarHandler();
                logoutHandler();
              }}
              className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}
            >
              Выход
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
