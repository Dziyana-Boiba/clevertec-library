import React from 'react';
import { Path } from 'react-hook-form';

interface InputObject {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  repeatPassword: string;
}

type Props = {
  error: InputObject;
  inputType: Path<InputObject>;
};

export const ErrorMessage = ({ error, inputType }: Props) => {
  const loginErrorMessage = (
    <span className={`assistive-text ${error.username === 'all' ? 'error' : ''}`}>
      Используйте для логина <span className={error.username === 'latin' ? 'error' : ''}>латинский алфавит</span> и{' '}
      <span className={error.username === 'number' ? 'error' : ''}>цифры</span>
    </span>
  );

  const passwordErrorMessage = (
    <span className={`assistive-text ${error.password === 'all' ? 'error' : ''}`}>
      Пароль
      <span className={error.password.includes('length') ? 'error' : ''}> не менее 8 символов</span>,
      <span className={error.password.includes('capital') ? 'error' : ''}> с заглавной буквой</span> и
      <span className={error.password.includes('number') ? 'error' : ''}> цифрой</span>
    </span>
  );

  const phoneNumberErrorMessage = (
    <span className={`assistive-text ${error.phone === 'notValid' ? 'error' : ''}`}>В формате +375 (xx) xxx-xx-xx</span>
  );

  const emailErrorMessage = (
    <span className={`assistive-text ${error.email === 'email' ? 'error' : ''}`}>Введите корректный e-mail</span>
  );

  const repeatPasswordErrorMessage = <span className='assistive-text error'>Пароли не совпадают</span>;

  return error[inputType] === 'required' ? (
    <span className='assistive-text error'>Поле не может быть пустым</span>
  ) : (
    <React.Fragment>
      {inputType === 'username' && loginErrorMessage}
      {inputType === 'password' && passwordErrorMessage}
      {inputType === 'phone' && phoneNumberErrorMessage}
      {inputType === 'email' && emailErrorMessage}
      {inputType === 'repeatPassword' && repeatPasswordErrorMessage}
    </React.Fragment>
  );
};
