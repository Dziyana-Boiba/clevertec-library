import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
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
        label='Логин'
        type='text'
      />

      {/*       <div className='input-container'>
        <div className='input-field'>
          <input
            id='identifier'
            type='text'
            {...register('identifier', {
              onChange: (e) => setInputText(e.target.value),
              required: true,
            })}
            value={inputText}
            required={true}
          />

          <label htmlFor='identifier'>Логин</label>
          <span className={`input-bottom-line ${error.identifier || dataError ? 'error' : ''}`} />
        </div>
        {error.identifier && <span className='assistive-text error'>Поле не может быть пустым</span>} 
      </div> */}

      <AuthInput
        dataError={dataError}
        register={register('password')}
        inputName='password'
        label='Пароль'
        type='password'
        showPassToggle={true}
      />

      {/*       <div className='input-container'>
        <div className='input-field'>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              onBlur: (e) => checkEmptyField(e),
              required: true,
            })}
            required={true}
          />
          <label htmlFor='password'>Пароль</label>

          <button type='button' onClick={showPasswordHandler}>
            {showPassword ? <IconEyeOpen /> : <IconEyeClosed />}
          </button>

          <span className={`input-bottom-line ${error.password || dataError ? 'error' : ''}`} />
        </div>
        {error.password && <span className='assistive-text error'>Поле не может быть пустым</span>}
      </div> */}

      <NavLink className='forgot-btn' to='/forgot-pass'>
        {dataError ? (
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
