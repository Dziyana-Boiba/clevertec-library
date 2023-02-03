import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './menu.scss';
import { categoriesData } from './categories-data.js';

export const Menu = () => {
  const [category, setCategory] = useState('all');
  const [menuSection, setMenuSection] = useState('books');
  return (
    <div className='menu-container'>
      <nav>
        <ul className='main-menu'>
          <li>
            <NavLink to='/books' className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}>
              Витрина книг
            </NavLink>

            <ul className='categories'>
              <li>
                <NavLink to='books/all' className={({ isActive }) => (isActive ? 'active' : '')}>
                  Все книги
                </NavLink>
              </li>
              {categoriesData.map((category) => (
                <li key={category.id}>
                  <NavLink to={`/books/${category.category}`} className={({ isActive }) => (isActive ? 'active' : '')}>
                    {category.name} <span>{category.amount}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <NavLink to='/terms' className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}>
              Правила пользования
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/contract'
              className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}
            >
              Договор оферты
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
