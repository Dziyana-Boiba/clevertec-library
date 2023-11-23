import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as CloserIcon } from '../../assets/images/Icon_Close_black.svg';
import { ReactComponent as ErrorIcon } from '../../assets/images/Icon_Error.svg';

import './error-toast.scss';

export const ErrorToast = () => {
  const { t } = useTranslation();
  const [showError, setShowError] = useState(true);
  const closeErrorToastHandler = () => {
    setShowError(false);
  };

  return (
    <div className={showError ? 'error-container' : 'error-container close'}>
      <div className='error-block' data-test-id='error'>
        <ErrorIcon />
        <span>{t('main.SOMETHING_WENT_WRONG')}</span>
        <CloserIcon onClick={closeErrorToastHandler} />
      </div>
    </div>
  );
};
