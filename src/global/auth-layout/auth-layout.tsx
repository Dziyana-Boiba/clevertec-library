import { Outlet } from 'react-router-dom';

import './auth-layout.scss';

export const AuthLayout = () => (
  <div className='auth-container'>
    <h3>Cleverland</h3>
    <Outlet />
  </div>
);
