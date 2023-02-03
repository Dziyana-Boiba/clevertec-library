import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './common/layout/layout';
import { SidebarLayout } from './common/sidebar-layout/sidebar-layout';
import './index.css';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { Contract } from './pages/terms/contract';
import { Terms } from './pages/terms/terms';

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<SidebarLayout />}>
          <Route path='/' element={<Navigate to='books/all' />} />
          <Route path='/books' element={<Navigate to='all' />} />
          <Route path='books/:category' element={<MainPage />} />
          <Route path='terms' element={<Terms />} />
          <Route path='contract' element={<Contract />} />
        </Route>
        <Route path='books/:category/:id' element={<BookPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
