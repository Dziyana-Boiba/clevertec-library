import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
        label={t('auth.NEW_PASSWORD')}
        type='password'
        showPassToggle={true}
        needValidation={true}
      />
      <AuthInput
        register={register('passwordConfirmation')}
        inputName='passwordConfirmation'
        label={t('auth.PASSWORD')}
        type='password'
        showPassToggle={true}
      />
      {passwordConfirmationInput && passwordInput !== passwordConfirmationInput && (
        <span className='error-message'>{t('auth.PASSWORDS_DO_NOT_MATCH')}</span>
      )}
      <button
        disabled={!validateInput('password', passwordInput).valid || passwordInput !== passwordConfirmationInput}
        type='submit'
        className='submit-btn'
      >
        {t('auth.SAVE_CHANGES')}
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
        assistiveText={t('auth.INSTRUCTIONS_SENT_TO_EMAIL')}
      />
      {wrongEmail && <span className='error-message'>{t('auth.EMAIL_NOT_REGISTERED')}</span>}
      <button disabled={!validateInput('email', emailInput).valid} type='submit' className='submit-btn'>
        {t('auth.RECOVER_PASSWORD')}
      </button>
    </form>
  );
};
