import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useDispatch } from 'react-redux';

import { registrationRequest } from '../../redux/registration/slice';
import { RegistrationType } from '../../types/auth';
import { validateInput } from '../../utils/validation';
import { AuthInput } from '../common/auth-input/auth-input';

import './form.scss';

type Input = {
  inputName: string;
  type: string;
  label: string;
  assistiveText: string;
};

type Steps = {
  firstInput: Input;
  secondInput: Input;
  buttonText: string;
};

const registrationSteps: Steps[] = [
  {
    firstInput: {
      inputName: 'username',
      type: 'text',
      label: 'Придумайте логин для входа',
      assistiveText: 'Используйте для логина латинский алфавит и цифры',
    },
    secondInput: {
      inputName: 'password',
      type: 'password',
      label: 'Пароль',
      assistiveText: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
    },
    buttonText: 'следующий шаг',
  },
  {
    firstInput: {
      inputName: 'firstName',
      type: 'text',
      label: 'Имя',
      assistiveText: '',
    },
    secondInput: { inputName: 'lastName', type: 'text', label: 'Фамилия', assistiveText: '' },
    buttonText: 'последний шаг',
  },
  {
    firstInput: {
      inputName: 'phone',
      type: 'text',
      label: 'Номер телефона',
      assistiveText: 'В формате +375 (xx) xxx-xx-xx',
    },
    secondInput: { inputName: 'email', type: 'text', label: 'E-mail', assistiveText: '' },
    buttonText: 'зарегистрироваться',
  },
];

type Props = {
  registrationStep: number;
  setRegistrationStep: (value: number) => void;
};

export const RegistrationForm = ({ registrationStep, setRegistrationStep }: Props) => {
  const { register, handleSubmit, watch } = useForm<RegistrationType>();

  const dispatch = useDispatch();

  const submitFormHandler: SubmitHandler<RegistrationType> = (data) => {
    if (registrationStep === 3) {
      dispatch(registrationRequest(data));
    } else {
      setRegistrationStep(registrationStep + 1);
    }
  };

  const { firstInput, secondInput, buttonText } = registrationSteps[registrationStep - 1];

  const inputText = {
    username: watch('username'),
    password: watch('password'),
    firstName: watch('firstName'),
    lastName: watch('lastName'),
    phone: watch('phone') ? watch('phone').replace('x', '') : watch('phone'),
    email: watch('email'),
  };

  return (
    <form onSubmit={handleSubmit(submitFormHandler)}>
      <AuthInput
        register={register(
          firstInput.inputName as 'username' | 'password' | 'firstName' | 'lastName' | 'phone' | 'email',
          { value: '' }
        )}
        needValidation={true}
        showPassToggle={firstInput.type === 'password' ? true : false}
        showTick={firstInput.type === 'password' ? true : false}
        inputName={firstInput.inputName}
        label={firstInput.label}
        assistiveText={firstInput.assistiveText}
        type={firstInput.type}
      />
      <AuthInput
        register={register(
          secondInput.inputName as 'username' | 'password' | 'firstName' | 'lastName' | 'phone' | 'email',
          { value: '' }
        )}
        needValidation={true}
        showPassToggle={secondInput.type === 'password' ? true : false}
        showTick={secondInput.type === 'password' ? true : false}
        inputName={secondInput.inputName}
        label={secondInput.label}
        assistiveText={secondInput.assistiveText}
        type={secondInput.type}
      />
      <button
        disabled={
          !validateInput(firstInput.inputName, inputText[firstInput.inputName as keyof typeof inputText]).valid ||
          !validateInput(secondInput.inputName, inputText[secondInput.inputName as keyof typeof inputText]).valid
        }
        type='submit'
        className='submit-btn'
      >
        {buttonText}
      </button>
    </form>
  );
};
