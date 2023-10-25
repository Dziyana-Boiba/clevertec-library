import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';

import Avatar from '../../assets/images/avatar.png';
import { ReactComponent as MenuIcon } from '../../assets/images/Icon_Menu.svg';
import LogoPNG from '../../assets/images/logo.png';
import { appStateSelector } from '../../redux/app-state/selector';
import { setBurgerOpen } from '../../redux/app-state/slice';

import './layout.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isBurgerOpen } = useSelector(appStateSelector);

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
      <button
        type='button'
        data-test-id='button-burger'
        onClick={sidebarHandler}
        className={isBurgerOpen ? 'menu-btn open' : 'menu-btn'}
      >
        <span className='first-line' />
        <span className='second-line' />
        <span className='last-line' />
      </button>

      <div className='header_aside'>
        <h3>Библиотека</h3>
        <div className='header_user'>
          <span>Привет, Иван!</span>
          <img className='header_user-avatar' src={Avatar} alt='User Avatar' />
          <div className='header-user-menu'>
            <button type='button'>Профиль</button>
            <button type='button' onClick={logoutHandler}>
              Выход
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
