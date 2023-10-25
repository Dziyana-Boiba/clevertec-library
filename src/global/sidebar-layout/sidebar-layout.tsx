import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Menu } from '../../components/menu/menu';
import { appStateSelector } from '../../redux/app-state/selector';
import { setBurgerOpen } from '../../redux/app-state/slice';

import './sidebar-layout.scss';

export const SidebarLayout = () => {
  const dispatch = useDispatch();
  const { isBurgerOpen } = useSelector(appStateSelector);
  const closeMenuHandler = () => {
    dispatch(setBurgerOpen());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch(setBurgerOpen());
    }
  };

  return (
    <section className='sidebar-layout'>
      {isBurgerOpen && (
        <div
          className='backdrop'
          onClick={closeMenuHandler}
          onKeyDown={handleKeyDown}
          role='button'
          aria-label='close'
          tabIndex={0}
        />
      )}

      <Menu />
      <Outlet />
    </section>
  );
};
