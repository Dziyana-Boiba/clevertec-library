import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LoginRespond } from '../../components/auth-respond/login-respond';
import { LoginForm } from '../../components/forms/login-form';
import { TOKEN_JWT_LS } from '../../constants/auth';
import { RoutePath } from '../../constants/routes';
import { Loader } from '../../global/loader/loader';
import { loginSelector } from '../../redux/login/selector';

import './auth.scss';

export const LoginPage = () => {
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
    return <LoginRespond />;
  }

  return (
    <React.Fragment>
      {loading && <Loader />}

      <div className='auth-block'>
        <div className='auth-block_header'>
          <h4>Вход в личный кабинет</h4>
        </div>
        <LoginForm dataError={dataError} />

        <div className='auth-block_footer'>
          <span>Нет учётной записи?</span>
          <button type='button' onClick={openRegistrationForm}>
            Регистрация
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
