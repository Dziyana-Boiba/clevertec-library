import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { ReactComponent as IconEyeClosed } from '../../assets/images/Icon_Eye_closed.svg';
import { ReactComponent as IconEyeOpen } from '../../assets/images/Icon_Eye_Open.svg';
import { ReactComponent as IconTickGreen } from '../../assets/images/Icon_Tick_green.svg';
import { forgotPassRequest } from '../../redux/forgot-pass/slice';
import { resetPassRequest } from '../../redux/reset-pass/slice';
import { ForgotPassType, PassInputsType } from '../../types/auth';
import { validateInput } from '../../utils/validation';
import { ErrorMessage } from '../common/auth-input/error-message';

import './form.scss';

type Props = {
  contentView: string;
  wrongEmail: boolean;
};

export const ForgotPassForm = ({ wrongEmail, contentView }: Props) => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState<PassInputsType>({
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [error, setError] = useState<PassInputsType>({
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const { register, handleSubmit, watch } = useForm<PassInputsType>();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const location = useLocation();
  const hasSearchParams = !!location.search;
  const code = location.search.slice(6);

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };
  const showRepeatPasswordHandler = () => {
    setShowRepeatPassword((prevState) => !prevState);
  };

  const onBlurHandler = (e) => {
    const { name, value } = e.target;

    setInputs((prevState: PassInputsType) => ({ ...prevState, [name]: value }));

    if (name === 'passwordConfirmation') {
      if (value === '') {
        setError((prevState: PassInputsType) => ({ ...prevState, [name]: 'required' }));
      } else if (value === inputs.password) {
        setError((prevState: PassInputsType) => ({ ...prevState, [name]: '' }));
      } else {
        setError((prevState: PassInputsType) => ({ ...prevState, [name]: 'error' }));
      }
    } else {
      const result = validateInput(name, value);

      setError((prevState: PassInputsType) => ({ ...prevState, [name]: result.messageType }));
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    const result = validateInput(name, value);

    setError((prev: PassInputsType) => ({ ...prev, [name]: result.messageType }));
  };

  const submitEmailHandler: SubmitHandler<ForgotPassType> = (data) => {
    dispatch(forgotPassRequest(data));
  };

  const submitPassHandler: SubmitHandler<PassInputsType> = (data) => {
    dispatch(resetPassRequest({ password: data.password, passwordConfirmation: data.passwordConfirmation, code }));
  };

  return hasSearchParams ? (
    <form onSubmit={handleSubmit(submitPassHandler)}>
      <div className='input-container'>
        <div className='input-field'>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              onBlur: (e) => onBlurHandler(e),
              onChange: (e) => onChangeHandler(e),
              required: true,
            })}
            // value={inputs.password}
            required={true}
          />
          <label>Новый пароль</label>

          {!error.password && inputs.password && <IconTickGreen />}
          <button type='button' onClick={showPasswordHandler}>
            {showPassword ? <IconEyeOpen /> : <IconEyeClosed />}
          </button>

          <span className={`input-bottom-line ${error.password ? 'error' : ''}`} />
        </div>
        {!error.password && (
          <span className='assistive-text'>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
        )}
        {error.password && <ErrorMessage error={error} inputType='password' />}
      </div>

      <div className='input-container'>
        <div className='input-field'>
          <input
            type={showRepeatPassword ? 'text' : 'password'}
            {...register('passwordConfirmation', {
              onBlur: (e) => onBlurHandler(e),
              required: true,
            })}
            // value={inputs.passwordConfirmation}
            required={true}
          />
          <label>Повторите пароль</label>

          <button type='button' onClick={showRepeatPasswordHandler}>
            {showRepeatPassword ? <IconEyeOpen /> : <IconEyeClosed />}
          </button>

          <span className={`input-bottom-line ${error.passwordConfirmation ? 'error' : ''}`} />
        </div>
        {error.passwordConfirmation && (
          <span className='assistive-text error'>
            {error.passwordConfirmation === 'required' ? 'Поле не может быть пустым' : 'Пароли не совпадают'}
          </span>
        )}
      </div>
      <button
        disabled={error.password && error.passwordConfirmation ? false : true}
        type='submit'
        className='submit-btn'
      >
        сохранить изменения
      </button>
    </form>
  ) : (
    <form onSubmit={handleSubmit(submitEmailHandler)}>
      <div className='input-container'>
        <div className='input-field'>
          <input
            type='email'
            {...register('email', {
              onBlur: (e) => onBlurHandler(e),
              required: true,
            })}
            // value={inputs.email}
            required={true}
          />
          <label>E-mail</label>
          <span className={`input-bottom-line ${error.email || wrongEmail ? 'error' : ''}`} />
        </div>
        {error.email && <ErrorMessage error={error} inputType='email' />}
        {wrongEmail && <ErrorMessage error='этот адрес электронной почты не зарегистрирован' inputType='email' />}
        <span className='assistive-text'>
          На это email будет отправлено письмо с инструкциями по восстановлению пароля
        </span>
      </div>
      <button disabled={!!error.email} type='submit' className='submit-btn'>
        Восстановить
      </button>
    </form>
  );
};
