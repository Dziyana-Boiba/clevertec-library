import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  error: string;
  inputType: string;
};

export const ErrorMessage = ({ error, inputType }: Props) => {
  const { t } = useTranslation();

  const loginErrorMessage = (
    <span className={`assistive-text ${error === 'all' ? 'error' : ''}`}>
      {t('auth.USERNAME_RULES.part1')}{' '}
      <span className={error === 'latin' ? 'error' : ''}>{t('auth.USERNAME_RULES.part2')}</span>{' '}
      {t('auth.USERNAME_RULES.part3')}{' '}
      <span className={error === 'number' ? 'error' : ''}>{t('auth.USERNAME_RULES.part4')}</span>
    </span>
  );

  const passwordErrorMessage = (
    <span className={`assistive-text ${error === 'all' ? 'error' : ''}`}>
      {t('auth.PASSWORD_RULES.part1')}
      <span className={error.includes('length') ? 'error' : ''}> {t('auth.PASSWORD_RULES.part2')}</span>,
      <span className={error.includes('capital') ? 'error' : ''}> {t('auth.PASSWORD_RULES.part3')}</span>{' '}
      {t('auth.PASSWORD_RULES.part4')}
      <span className={error.includes('number') ? 'error' : ''}> {t('auth.PASSWORD_RULES.part5')}</span>
    </span>
  );

  const phoneNumberErrorMessage = (
    <span className={`assistive-text ${error === 'notValid' ? 'error' : ''}`}>{t('auth.PHONE_NUMBER_FORMAT')}</span>
  );

  const emailErrorMessage = (
    <span className={`assistive-text ${error === 'email' ? 'error' : ''}`}>{t('auth.ENTER_VALID_EMAIL')}</span>
  );

  const repeatPasswordErrorMessage = <span className='assistive-text error'>{t('auth.PASSWORDS_DO_NOT_MATCH')}</span>;

  return error === 'required' ? (
    <span className='assistive-text error'>{t('auth.FIELD_CANNOT_BE_EMPTY')}</span>
  ) : (
    <React.Fragment>
      {inputType === 'username' && loginErrorMessage}
      {inputType === 'password' && passwordErrorMessage}
      {inputType === 'phone' && phoneNumberErrorMessage}
      {inputType === 'email' && emailErrorMessage}
      {inputType === 'passwordConfirmation' && repeatPasswordErrorMessage}
    </React.Fragment>
  );
};
