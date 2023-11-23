import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LangIcon } from '../../assets/images/Globe.svg';
import { languages } from '../../constants/languages';

import './languages-select.scss';

export const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const [value, setValue] = useState<string>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (code: string) => {
    setValue(code);
    i18n.changeLanguage(code);
  };

  const openMenuHandler = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const elementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (elementRef && elementRef.current && elementRef.current.contains(event.target as Node)) {
        return;
      }
      setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className='languages-menu'>
      <button ref={elementRef} type='button' className='main-btn' onClick={() => openMenuHandler()}>
        <LangIcon stroke={isMenuOpen ? '#f83600' : '#000'} /> {value}
      </button>
      <div className={isMenuOpen ? 'list-btn-container menu-open' : 'list-btn-container'}>
        {languages.map(({ code, name }) => (
          <button type='button' onClick={() => handleClick(code)}>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
