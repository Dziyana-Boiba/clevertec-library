import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { registrationSteps } from '../../constants/auth';
import { registrationRequest } from '../../redux/registration/slice';
import { RegistrationType } from '../../types/auth';
import { validateInput } from '../../utils/validation';
import { AuthInput } from '../common/auth-input/auth-input';

import './form.scss';

type Props = {
  registrationStep: number;
  setRegistrationStep: (value: number) => void;
};

export const RegistrationForm = ({ registrationStep, setRegistrationStep }: Props) => {
  const { t } = useTranslation();
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
        label={t(firstInput.label)}
        assistiveText={t(firstInput.assistiveText)}
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
        label={t(secondInput.label)}
        assistiveText={t(secondInput.assistiveText)}
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
        {t(buttonText)}
      </button>
    </form>
  );
};
