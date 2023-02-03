import { Outlet } from 'react-router-dom';
import { Menu } from '../../components/organisms/menu';
import './sidebar-layout.scss';

export const SidebarLayout = () => (
  <section className='sidebar-layout'>
    <Menu />
    <Outlet />
  </section>
);
