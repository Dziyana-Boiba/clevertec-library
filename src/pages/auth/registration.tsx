import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconChevronRight } from '../../assets/images/Icon_Chevron_Right.svg';
import { AuthRespond } from '../../components/auth-respond/auth-respond';
import { RegistrationForm } from '../../components/forms/registration-form';
import { respondTextPath } from '../../constants/auth';
import { STATUS } from '../../constants/common';
import { RoutePath } from '../../constants/routes';
import { Loader } from '../../global/loader/loader';
import { registerSelector } from '../../redux/registration/selector';

import './auth.scss';

export const RegistrationPage = () => {
  const { t } = useTranslation();
  const [registrationStep, setRegistrationStep] = useState<number>(1);

  const navigate = useNavigate();

  const openLoginForm = () => {
    navigate(RoutePath.auth);
  };
  const { loading, status, dataError, error } = useSelector(registerSelector);

  if (status === STATUS.ERROR) {
    return (
      <AuthRespond respond={dataError ? respondTextPath.registration.exist : respondTextPath.registration.error} />
    );
  }

  if (status === STATUS.SUCCESS) {
    return <AuthRespond respond={respondTextPath.registration.success} />;
  }

  return (
    <React.Fragment>
      {loading && <Loader />}
      <div className='auth-block'>
        <div className='auth-block_header'>
          <h4>{t('auth.REGISTRATION')}</h4>
          <span>
            {registrationStep} {t('auth.STEP_FROM')} 3
          </span>
        </div>
        <RegistrationForm registrationStep={registrationStep} setRegistrationStep={setRegistrationStep} />
        <div className='auth-block_footer'>
          <span>{t('auth.HAVE_ACCOUNT')}?</span>
          <button type='button' onClick={openLoginForm}>
            {t('auth.ENTER')} <IconChevronRight />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
