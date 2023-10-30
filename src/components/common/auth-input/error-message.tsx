import React from 'react';

type Props = {
  error: string;
  inputType: string;
};

export const ErrorMessage = ({ error, inputType }: Props) => {
  const loginErrorMessage = (
    <span className={`assistive-text ${error === 'all' ? 'error' : ''}`}>
      Используйте для логина <span className={error === 'latin' ? 'error' : ''}>латинский алфавит</span> и{' '}
      <span className={error === 'number' ? 'error' : ''}>цифры</span>
    </span>
  );

  const passwordErrorMessage = (
    <span className={`assistive-text ${error === 'all' ? 'error' : ''}`}>
      Пароль
      <span className={error.includes('length') ? 'error' : ''}> не менее 8 символов</span>,
      <span className={error.includes('capital') ? 'error' : ''}> с заглавной буквой</span> и
      <span className={error.includes('number') ? 'error' : ''}> цифрой</span>
    </span>
  );

  const phoneNumberErrorMessage = (
    <span className={`assistive-text ${error === 'notValid' ? 'error' : ''}`}>В формате +375 (xx) xxx-xx-xx</span>
  );

  const emailErrorMessage = (
    <span className={`assistive-text ${error === 'email' ? 'error' : ''}`}>Введите корректный e-mail</span>
  );

  const repeatPasswordErrorMessage = <span className='assistive-text error'>Пароли не совпадают</span>;

  return error === 'required' ? (
    <span className='assistive-text error'>Поле не может быть пустым</span>
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
