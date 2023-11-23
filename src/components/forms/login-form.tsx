import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { loginRequest } from '../../redux/login/slice';
import { LoginType } from '../../types/auth';
import { AuthInput } from '../common/auth-input/auth-input';

import './form.scss';

type Props = {
  dataError: boolean;
};

export const LoginForm = ({ dataError }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { handleSubmit, register } = useForm<LoginType>({ mode: 'all' });

  const submitFormHandler: SubmitHandler<LoginType> = (data) => {
    dispatch(loginRequest(data));
  };

  return (
    <form onSubmit={handleSubmit(submitFormHandler)}>
      <AuthInput
        dataError={dataError}
        register={register('identifier')}
        inputName='identifier'
        label={t('auth.LOGIN')}
        type='text'
      />

      <AuthInput
        dataError={dataError}
        register={register('password')}
        inputName='password'
        label={t('auth.PASSWORD')}
        type='password'
        showPassToggle={true}
      />

      <NavLink className='forgot-btn' to='/forgot-pass'>
        {dataError ? (
          <span className='forgot-btn_error'>
            <span className='error_red'>{t('auth.INVALID_LOGIN_OR_PASSWORD')}!</span>
            <br />
            {t('auth.RECOVER_QUESTION')}?
          </span>
        ) : (
          t('auth.FORGOT_LOGIN_OR_PASSWORD')
        )}
      </NavLink>

      <button type='submit' className='submit-btn'>
        {t('auth.LOGIN_ACTION')}
      </button>
    </form>
  );
};
