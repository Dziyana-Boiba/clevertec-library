import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as CloseIcon } from '../../../assets/images/Icon_Close.svg';
import { ReactComponent as ListIcon } from '../../../assets/images/Icon_List.svg';
import { ReactComponent as RatingIcon } from '../../../assets/images/Icon_rating.svg';
import { ReactComponent as SearchIcon } from '../../../assets/images/Icon_Search.svg';
import { ReactComponent as TableIcon } from '../../../assets/images/Icon_table.svg';
import { appStateSelector } from '../../../redux/app-state/selector';
import { setFilter, setSearch } from '../../../redux/app-state/slice';

import './select-bar.scss';

type Props = {
  selectView: (value: string) => void;
  isListView: boolean;
};

export const SelectBar = ({ selectView, isListView }: Props) => {
  const { t } = useTranslation();
  const [isInputOpen, setIsInputOpen] = useState(false);
  const dispatch = useDispatch();

  const { ratingDown } = useSelector(appStateSelector);

  const openInputHandler = () => {
    setIsInputOpen(true);
  };
  const closeInputHandler = () => {
    setIsInputOpen(false);
  };

  const setFilterHandler = () => {
    dispatch(setFilter());
  };

  const setSearchHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    dispatch(setSearch(target.value.trim().toLowerCase()));
  };

  return (
    <div className='select-bar'>
      <div className='select-bar_left'>
        <div className={isInputOpen ? 'input-container open' : 'input-container'}>
          <SearchIcon className='search-icon' onClick={openInputHandler} data-test-id='button-search-open' />
          <input
            type='text'
            data-test-id='input-search'
            onChange={(e) => setSearchHandler(e)}
            placeholder={t('main.SEARCH_BOOK_OR_AUTHOR')}
          />
          <CloseIcon className='close-icon' onClick={closeInputHandler} data-test-id='button-search-close' />
        </div>
        <button type='button' onClick={setFilterHandler} className='rating-btn' data-test-id='sort-rating-button'>
          <RatingIcon className={ratingDown ? '' : 'rating-up'} />
          <span>{t('main.BY_RATING')}</span>
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
};
