import { Outlet } from 'react-router-dom';
import './layout.scss';
import { Footer } from './footer';
import { Header } from './header';

export const Layout = () => (
  <div className='layout'>
    <Header />
    <main className='content-container'>
      <Outlet />
    </main>
    <Footer />
  </div>
);
