import { Link } from 'react-router-dom';
import './layout.scss';
import LogoPNG from '../../assets/images/logo.png';
import Avatar from '../../assets/images/avatar.png';
import { ReactComponent as MenuIcon } from '../../assets/images/Icon_Menu.svg';

export const Header = () => (
  <header>
    <Link to='/books/all'>
      <img className='header_logo' src={LogoPNG} alt='Cleverland Logo' />
    </Link>
    <MenuIcon className='menu-icon' />

    <div className='header_aside'>
      <h3>Библиотека</h3>
      <div className='header_user'>
        <span>Привет, Иван!</span>
        <img className='header_user-avatar' src={Avatar} alt='User Avatar' />
      </div>
    </div>
  </header>
);
