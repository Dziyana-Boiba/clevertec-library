import React from 'react';
import './select-bar.scss';
import { ReactComponent as SearchIcon } from '../../../assets/images/Icon_Search.svg';
import { ReactComponent as RatingIcon } from '../../../assets/images/Icon_rating.svg';
import { ReactComponent as TableIcon } from '../../../assets/images/Icon_table.svg';
import { ReactComponent as ListIcon } from '../../../assets/images/Icon_List.svg';

type Props = {
  selectView: any;
  isListView: boolean;
};

export const SelectBar = ({ selectView, isListView }: Props) => (
  <div className='select-bar'>
    <div className='select-bar_left'>
      <div className='input-container'>
        <SearchIcon />
        <input type='text' placeholder='Поиск книги или автора…' />
      </div>
      <button type='button' className='rating-btn'>
        <RatingIcon />
        <span>По рейтингу</span>
      </button>
    </div>

    <div className='select-bar_right'>
      <button
        type='button'
        className={isListView ? '' : 'active'}
        onClick={() => selectView('table')}
        data-test-id='button-menu-view-window'
      >
        <TableIcon />
      </button>
      <button
        type='button'
        className={isListView ? 'active' : ''}
        onClick={() => selectView('list')}
        data-test-id='button-menu-view-list'
      >
        <ListIcon />
      </button>
    </div>
  </div>
);
