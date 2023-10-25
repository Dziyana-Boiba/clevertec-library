import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { RequireAuth } from './components/router/required-auth';
import { RoutePath } from './constants/routes';
import { AuthLayout } from './global/auth-layout/auth-layout';
import { Layout } from './global/layout/layout';
import { SidebarLayout } from './global/sidebar-layout/sidebar-layout';
import { AuthPage } from './pages/auth/auth';
import { ForgotPassPage } from './pages/auth/forgot-pass';
import { RegistrationPage } from './pages/auth/registration';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { Terms } from './pages/terms';
import { TermsContentView } from './constants/common';

import './index.css';

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route index={true} element={<Navigate to={RoutePath.auth} />} />
        <Route path={RoutePath.auth} element={<AuthPage contentView='auth' />} />
        <Route path={RoutePath.registration} element={<RegistrationPage contentView='registration' />} />
        <Route path={RoutePath.forgotPass} element={<ForgotPassPage />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path='/' element={<Layout />}>
          <Route element={<SidebarLayout />}>
            <Route path='/' element={<Navigate to={RoutePath.booksAll} />} />
            <Route path='/books' element={<Navigate to='all' />} />
            <Route path={RoutePath.booksCategory} element={<MainPage />} />
            <Route path={RoutePath.terms} element={<Terms contentView={TermsContentView.terms} />} />
            <Route path={RoutePath.contract} element={<Terms contentView={TermsContentView.contract} />} />
          </Route>
          <Route path={RoutePath.bookPage} element={<BookPage />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);
