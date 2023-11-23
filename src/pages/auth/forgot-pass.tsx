import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as IconBack } from '../../assets/images/Icon_Chevron_Left.svg';
import { AuthRespond } from '../../components/auth-respond/auth-respond';
import { ForgotPassForm } from '../../components/forms/forgot-pass-form';
import { respondTextPath, TOKEN_JWT_LS } from '../../constants/auth';
import { STATUS } from '../../constants/common';
import { RoutePath } from '../../constants/routes';
import { Loader } from '../../global/loader/loader';
import { forgotPassSelector } from '../../redux/forgot-pass/selector';
import { resetPassSelector } from '../../redux/reset-pass/selector';

import './auth.scss';

export const ForgotPassPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const hasSearchParams = !!location.search;

  const openRegistrationForm = () => {
    navigate(RoutePath.registration);
  };

  const returnHandler = () => {
    navigate(RoutePath.auth);
  };

  const {
    loading: forgotPassLoading,
    error: forgotPassError,
    status: forgotPassStatus,
  } = useSelector(forgotPassSelector);

  const { loading: resetPassLoading, error: resetPassError, status: resetPassStatus } = useSelector(resetPassSelector);

  const tokenData = localStorage.getItem(TOKEN_JWT_LS);

  if (tokenData) {
    navigate(RoutePath.booksAll);
  }

  if (forgotPassStatus === STATUS.SUCCESS && !resetPassStatus) {
    return <AuthRespond respond={respondTextPath.forgotPass.emailSent} />;
  }

  if (resetPassError) {
    return <AuthRespond respond={respondTextPath.forgotPass.error} />;
  }

  if (resetPassStatus === STATUS.SUCCESS) {
    return <AuthRespond respond={respondTextPath.forgotPass.success} />;
  }

  return (
    <React.Fragment>
      {forgotPassLoading || (resetPassLoading && <Loader />)}
      <div className='auth-block'>
        <div className='return-field'>
          <button type='button' onClick={returnHandler} className='return-btn'>
            <IconBack />
            {t('auth.GO_TO_LOGIN')}
          </button>
        </div>

        <div className='auth-block_header'>
          <h4> {t('auth.FORGOT_PASS_TITLE')}</h4>
        </div>
        <ForgotPassForm wrongEmail={forgotPassError} />
        <div className='auth-block_footer'>
          {hasSearchParams ? (
            t('auth.AFTER_SAVING_LOGIN')
          ) : (
            <React.Fragment>
              <span> {t('auth.NO_ACCOUNT')}?</span>
              <button type='button' onClick={openRegistrationForm}>
                {t('auth.REGISTRATION')}
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
