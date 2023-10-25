import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { registrationRequest, setRegistrationData } from '../../redux/registration/slice';
import { RegistrationType } from '../../types/auth';
import { AuthInput } from '../common/auth-input/auth-input';

import './form.scss';

const registrationSteps = [
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
  contentView: string;
  registrationStep: number;
  setRegistrationStep: (value: any) => void;
};

export const RegistrationForm = ({ contentView, registrationStep, setRegistrationStep }: Props) => {
  const [inputs, setInputs] = useState<RegistrationType>({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [error, setError] = useState<RegistrationType>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  // const { handleSubmit } = useForm<InputObject>();

  /*  const submitFormHandler: SubmitHandler<InputObject> = (data) => {
    console.log('form data', data, error);
  };  */
  const dispatch = useDispatch();

  const submitFormHandler = () => {
    dispatch(setRegistrationData(inputs));
    dispatch(registrationRequest(inputs));
  };

  const toggleStepHandler = (event) => {
    event?.preventDefault();
    const firstInputName = registrationSteps[registrationStep - 1].firstInput.inputName;
    const secondInputName = registrationSteps[registrationStep - 1].secondInput.inputName;

    if (!inputs[firstInputName]) {
      setError((prevState: RegistrationType) => ({ ...prevState, [firstInputName]: 'required' }));
    }

    if (!inputs[secondInputName]) {
      setError((prevState: RegistrationType) => ({ ...prevState, [secondInputName]: 'required' }));
    }

    if (!error[firstInputName] && !error[secondInputName] && inputs[firstInputName] && inputs[secondInputName]) {
      if (registrationStep === 3) {
        submitFormHandler();
      } else {
        setRegistrationStep((prevState: number) => (prevState < 3 ? prevState + 1 : 3));
      }
    }
  };

  return (
    <form>
      <AuthInput
        inputName={registrationSteps[registrationStep - 1].firstInput.inputName}
        type={registrationSteps[registrationStep - 1].firstInput.type}
        inputs={inputs}
        error={error}
        setInputs={setInputs}
        setError={setError}
        label={contentView === 'registration' ? registrationSteps[registrationStep - 1].firstInput.label : 'Логин'}
        assistiveText={registrationSteps[registrationStep - 1].firstInput.assistiveText}
      />

      <AuthInput
        inputName={registrationSteps[registrationStep - 1].secondInput.inputName}
        type={registrationSteps[registrationStep - 1].secondInput.type}
        inputs={inputs}
        error={error}
        setInputs={setInputs}
        setError={setError}
        label={contentView === 'registration' ? registrationSteps[registrationStep - 1].secondInput.label : 'Логин'}
        assistiveText={registrationSteps[registrationStep - 1].secondInput.assistiveText}
      />

      {contentView === 'registration' ? (
        <span className='forgot-btn-field' />
      ) : (
        <NavLink className='forgot-btn' to='/forgot-pass'>
          Забыли логин или пароль?
        </NavLink>
      )}
      <button type='submit' className='submit-btn' onClick={(event) => toggleStepHandler(event)}>
        {registrationSteps[registrationStep - 1].buttonText}
      </button>
    </form>
  );
};
