import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthRespond } from '../../components/auth-respond/auth-respond';
import { LoginForm } from '../../components/forms/login-form';
import { respondTextPath, TOKEN_JWT_LS } from '../../constants/auth';
import { RoutePath } from '../../constants/routes';
import { Loader } from '../../global/loader/loader';
import { loginSelector } from '../../redux/login/selector';

import './auth.scss';

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const openRegistrationForm = () => {
    navigate(RoutePath.registration);
  };

  const { loading, dataError, error } = useSelector(loginSelector);
  const tokenData = localStorage.getItem(TOKEN_JWT_LS);

  if (tokenData) {
    navigate(RoutePath.booksAll);
  }

  if (error) {
    return <AuthRespond respond={respondTextPath.login.error} />;
  }

  return (
    <React.Fragment>
      {loading && <Loader />}

      <div className='auth-block'>
        <div className='auth-block_header'>
          <h4>{t('auth.LOGIN_TO_ACCOUNT')}</h4>
        </div>
        <LoginForm dataError={dataError} />

        <div className='auth-block_footer'>
          <span>{t('auth.NO_ACCOUNT')}?</span>
          <button type='button' onClick={openRegistrationForm}>
            {t('auth.REGISTRATION')}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
