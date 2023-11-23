import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Avatar from '../../assets/images/avatar.png';
import { ReactComponent as ArrowLeftIcon } from '../../assets/images/Icon_Chevron_Left.svg';
import { ReactComponent as MenuIcon } from '../../assets/images/Icon_Menu.svg';
import LogoPNG from '../../assets/images/logo.png';
import { appStateSelector } from '../../redux/app-state/selector';
import { setBurgerOpen } from '../../redux/app-state/slice';

import './layout.scss';
import { LanguageSelect } from '../languages/languages-select';

export const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, bookId } = useParams();
  const [isBookPage, setIsBookPage] = useState(false);
  const { isBurgerOpen } = useSelector(appStateSelector);

  useEffect(() => {
    if (bookId) {
      setIsBookPage(true);
    } else {
      setIsBookPage(false);
    }
  }, [bookId]);

  const sidebarHandler = () => {
    dispatch(setBurgerOpen());
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <header>
      <Link to='/books/all'>
        <img className='header_logo' src={LogoPNG} alt='Cleverland Logo' />
      </Link>
      <MenuIcon className='menu-icon' onClick={sidebarHandler} />
      {isBookPage ? (
        <button type='button' onClick={() => navigate(`/books/${category}`)} className='menu-btn'>
          <ArrowLeftIcon />
        </button>
      ) : (
        <button type='button' onClick={sidebarHandler} className={isBurgerOpen ? 'menu-btn open' : 'menu-btn'}>
          <span className='first-line' />
          <span className='second-line' />
          <span className='last-line' />
        </button>
      )}

      <div className='header_aside'>
        <h3>{t('main.LIBRARY')}</h3>
        <div className='header_aside_right'>
          <LanguageSelect />
          <div className='header_user'>
            {/* <span>Привет, Иван!</span> */}
            <img className='header_user-avatar' src={Avatar} alt='User Avatar' />
            <div className='header-user-menu'>
              <button type='button'>{t('main.PROFILE')}</button>
              <button type='button' onClick={logoutHandler}>
                {t('main.LOGOUT')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
