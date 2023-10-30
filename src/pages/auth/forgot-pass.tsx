import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as IconBack } from '../../assets/images/Icon_Chevron_Left.svg';
import { ForgotPassRespond } from '../../components/auth-respond/forgot-pass-respond';
import { ForgotPassForm } from '../../components/forms/forgot-pass-form';
import { TOKEN_JWT_LS } from '../../constants/auth';
import { STATUS } from '../../constants/common';
import { RoutePath } from '../../constants/routes';
import { Loader } from '../../global/loader/loader';
import { forgotPassSelector } from '../../redux/forgot-pass/selector';
import { resetPassSelector } from '../../redux/reset-pass/selector';

import './auth.scss';

export const ForgotPassPage = () => {
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
    return (
      <React.Fragment>
        <ForgotPassRespond respondType='emailSent' />;
      </React.Fragment>
    );
  }

  if (resetPassError) {
    return (
      <React.Fragment>
        <ForgotPassRespond respondType='error' />;
      </React.Fragment>
    );
  }

  if (resetPassStatus === STATUS.SUCCESS) {
    return <ForgotPassRespond respondType='success' />;
  }

  return (
    <React.Fragment>
      {forgotPassLoading || (resetPassLoading && <Loader />)}
      <div className='auth-block'>
        <div className='return-field'>
          <button type='button' onClick={returnHandler} className='return-btn'>
            <IconBack />
            вход в личный кабинет
          </button>
        </div>

        <div className='auth-block_header'>
          <h4>Восстановление пароля</h4>
        </div>
        <ForgotPassForm wrongEmail={forgotPassError} />
        <div className='auth-block_footer'>
          {hasSearchParams ? (
            'После сохранения войдите в библиотеку, используя новый пароль'
          ) : (
            <React.Fragment>
              <span>Нет учётной записи?</span>
              <button type='button' onClick={openRegistrationForm}>
                Регистрация
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
