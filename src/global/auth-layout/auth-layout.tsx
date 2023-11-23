import { Outlet } from 'react-router-dom';

import { LanguageSelect } from '../languages/languages-select';

import './auth-layout.scss';

export const AuthLayout = () => (
  <div className='auth-container'>
    <h3>Cleverland</h3>
    <LanguageSelect />
    <Outlet />
  </div>
);
