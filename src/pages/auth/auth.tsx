import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LoginRespond } from '../../components/auth-respond/login-respond';
import { AuthForm } from '../../components/forms/auth-form';
import { TOKEN_JWT_LS } from '../../constants/auth';
import { RoutePath } from '../../constants/routes';
import { Loader } from '../../global/loader/loader';
import { loginSelector } from '../../redux/login/selector';

import './auth.scss';

type Props = {
  contentView: string;
};

export const AuthPage = ({ contentView }: Props) => {
  const navigate = useNavigate();

  const openRegistrationForm = () => {
    navigate(RoutePath.registration);
  };

  const { data, loading, dataError, error } = useSelector(loginSelector);
  const tokenData = localStorage.getItem(TOKEN_JWT_LS);

  useEffect(() => {
    console.log(data, 'error: ', error, dataError, loading);
  }, [data, error, dataError, loading]);

  if (tokenData) {
    navigate('/books/all');
  }

  if (error) {
    return (
      <React.Fragment>
        {loading && <Loader />}
        <LoginRespond />;
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {loading && <Loader />}

      <div className='auth-block'>
        <div className='auth-block_header'>
          <h4>Вход в личный кабинет</h4>
        </div>
        <AuthForm contentView={contentView} errorAPI={dataError} />

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
