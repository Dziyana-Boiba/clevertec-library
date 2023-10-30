import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { forgotPassRequest } from '../../redux/forgot-pass/slice';
import { resetPassRequest } from '../../redux/reset-pass/slice';
import { ForgotPassType, PassInputsType } from '../../types/auth';
import { validateInput } from '../../utils/validation';
import { AuthInput } from '../common/auth-input/auth-input';

import './form.scss';

type Props = {
  wrongEmail: boolean;
};

export const ForgotPassForm = ({ wrongEmail }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const hasSearchParams = !!location.search;
  const code = location.search.slice(6);

  const { register, handleSubmit, watch } = useForm<PassInputsType>();

  const submitEmailHandler: SubmitHandler<ForgotPassType> = (data) => {
    dispatch(forgotPassRequest(data));
  };

  const submitPassHandler: SubmitHandler<PassInputsType> = (data) => {
    dispatch(resetPassRequest({ password: data.password, passwordConfirmation: data.passwordConfirmation, code }));
  };

  const emailInput = watch('email');
  const passwordInput = watch('password');
  const passwordConfirmationInput = watch('passwordConfirmation');

  return hasSearchParams ? (
    <form onSubmit={handleSubmit(submitPassHandler)}>
      <AuthInput
        register={register('password')}
        inputName='password'
        label='Новый пароль'
        type='password'
        showPassToggle={true}
        needValidation={true}
      />
      <AuthInput
        register={register('passwordConfirmation')}
        inputName='passwordConfirmation'
        label='Пароль'
        type='password'
        showPassToggle={true}
      />
      {passwordConfirmationInput && passwordInput !== passwordConfirmationInput && (
        <span className='error-message'>Пароли не совпадают</span>
      )}
      <button
        disabled={!validateInput('password', passwordInput).valid || passwordInput !== passwordConfirmationInput}
        type='submit'
        className='submit-btn'
      >
        сохранить изменения
      </button>
    </form>
  ) : (
    <form onSubmit={handleSubmit(submitEmailHandler)}>
      <AuthInput
        dataError={wrongEmail}
        register={register('email')}
        inputName='email'
        label='E-mail'
        type='email'
        needValidation={true}
        assistiveText='На это email будет отправлено письмо с инструкциями по восстановлению пароля'
      />
      {wrongEmail && <span className='error-message'>этот адрес электронной почты не зарегистрирован</span>}
      <button disabled={!validateInput('email', emailInput).valid} type='submit' className='submit-btn'>
        Восстановить
      </button>
    </form>
  );
};
