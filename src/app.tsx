import { Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { RequireAuth } from './components/router/required-auth';
import { TermsContentView } from './constants/common';
import { RoutePath } from './constants/routes';
import { AuthLayout } from './global/auth-layout/auth-layout';
import { Layout } from './global/layout/layout';
import { Loader } from './global/loader/loader';
import { SidebarLayout } from './global/sidebar-layout/sidebar-layout';
import { ForgotPassPage } from './pages/auth/forgot-pass';
import { LoginPage } from './pages/auth/login';
import { RegistrationPage } from './pages/auth/registration';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { NotFound } from './pages/not-found/not-found';
import { Terms } from './pages/terms';

import './index.css';

export const App = () => (
  <Suspense fallback={<Loader />}>
    <HashRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index={true} element={<Navigate to={RoutePath.auth} />} />
          <Route path={RoutePath.auth} element={<LoginPage />} />
          <Route path={RoutePath.registration} element={<RegistrationPage />} />
          <Route path={RoutePath.forgotPass} element={<ForgotPassPage />} />
          <Route path='*' element={<NotFound isAutheticated={false} />} />
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
            <Route path='*' element={<NotFound isAutheticated={true} />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  </Suspense>
);
