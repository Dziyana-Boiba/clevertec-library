import { Navigate, Outlet } from 'react-router-dom';

export const RequireAuth = () => {
  const userData = localStorage.getItem('token');

  return userData ? <Outlet /> : <Navigate to='/auth' />;
};
