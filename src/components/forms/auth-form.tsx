import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ReactComponent as IconEyeClosed } from '../../assets/images/Icon_Eye_closed.svg';
import { ReactComponent as IconEyeOpen } from '../../assets/images/Icon_Eye_Open.svg';
import { loginRequest } from '../../redux/login/slice';
import { LoginType } from '../../types/auth';

import './form.scss';

type Props = {
  contentView: string;
  errorAPI: boolean;
};

export const AuthForm = ({ contentView, errorAPI }: Props) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [error, setError] = useState<LoginType>({
    identifier: '',
    password: '',
  });

  const { register, handleSubmit, control } = useForm<LoginType>({ mode: 'all' });

  const checkEmptyField = (e) => {
    const { name, value } = e.target;

    if (value === '') {
      setError((prevState: LoginType) => ({ ...prevState, [name]: 'required' }));
    } else {
      setError((prevState: LoginType) => ({ ...prevState, [name]: '' }));
    }
  };

  const submitFormHandler: SubmitHandler<LoginType> = (data) => {
    dispatch(loginRequest(data));
  };

  return (
    <form onSubmit={handleSubmit(submitFormHandler)}>
      <div className='input-container'>
        <div className='input-field'>
          <input
            type='text'
            {...register('identifier', {
              onBlur: (e) => checkEmptyField(e),
              required: true,
            })}
            required={true}
          />

          <label>Логин</label>
          <span className={`input-bottom-line ${error.identifier || errorAPI ? 'error' : ''}`} />
        </div>
        {error.identifier && <span className='assistive-text error'>Поле не может быть пустым</span>}
      </div>

      <div className='input-container'>
        <div className='input-field'>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              onBlur: (e) => checkEmptyField(e),
              required: true,
            })}
            required={true}
          />
          <label>Пароль</label>

          <button type='button' onClick={showPasswordHandler}>
            {showPassword ? <IconEyeOpen /> : <IconEyeClosed />}
          </button>

          <span className={`input-bottom-line ${error.password || errorAPI ? 'error' : ''}`} />
        </div>
        {error.password && <span className='assistive-text error'>Поле не может быть пустым</span>}
      </div>

      <NavLink className='forgot-btn' to='/forgot-pass'>
        {errorAPI ? (
          <span className='forgot-btn_error'>
            <span className='error_red'>Неверный логин или пароль!</span>
            <br />
            Восстановить?
          </span>
        ) : (
          'Забыли логин или пароль?'
        )}
      </NavLink>

      <button type='submit' className='submit-btn'>
        вход
      </button>
    </form>
  );
};
