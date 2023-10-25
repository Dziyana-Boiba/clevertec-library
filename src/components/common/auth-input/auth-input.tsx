import React, { useState } from 'react';
import { Path, useForm } from 'react-hook-form';

import { ReactComponent as IconEyeClosed } from '../../../assets/images/Icon_Eye_closed.svg';
import { ReactComponent as IconEyeOpen } from '../../../assets/images/Icon_Eye_Open.svg';
import { ReactComponent as IconTickGreen } from '../../../assets/images/Icon_Tick_green.svg';
import { validateInput } from '../../../utils/validation';

import { ErrorMessage } from './error-message';

interface InputObject {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

type Props = {
  inputName: Path<InputObject>;
  inputs: InputObject;
  error: InputObject;
  setInputs: (value: InputObject) => void;
  setError: (value: InputObject) => void;
  label: string;
  assistiveText?: string;
  type: string;
};
/* eslint-disable no-console */
export const AuthInput = ({ inputName, inputs, error, setError, setInputs, label, assistiveText, type }: Props) => {
  const { register, watch } = useForm<InputObject>();
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const checkEmptyField = (e) => {
    const { name, value } = e.target;

    const result = validateInput(name, value);

    setError((prevState: InputObject) => ({ ...prevState, [name]: result.messageType }));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const valueWithoutCode = value[0] === '+' ? value.replace(/^[+375]+/g, '') : value;
      const digitValue = valueWithoutCode.replace(/\D/g, '');
      const formatedValue = `+375 (${digitValue[0] ? digitValue[0] : 'x'}${digitValue[1] ? digitValue[1] : 'x'}) ${
        digitValue[2] ? digitValue[2] : 'x'
      }${digitValue[3] ? digitValue[3] : 'x'}${digitValue[4] ? digitValue[4] : 'x'}-${
        digitValue[5] ? digitValue[5] : 'x'
      }${digitValue[6] ? digitValue[6] : 'x'}-${digitValue[7] ? digitValue[7] : 'x'}${
        digitValue[8] ? digitValue[8] : 'x'
      }`;

      setInputs((prev: InputObject) => ({ ...prev, [name]: formatedValue }));
    } else {
      setInputs((prev: InputObject) => ({ ...prev, [name]: value }));
    }

    if (name === 'username' || name === 'password') {
      const result = validateInput(name, value);

      setError((prev: InputObject) => ({ ...prev, [name]: result.messageType }));
    }
  };

  return (
    <div className='input-container'>
      <div className='input-field'>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          {...register(inputName, {
            onBlur: (e) => checkEmptyField(e),
            onChange: (e) => onChangeHandler(e),
            required: true,
          })}
          value={inputs[inputName]}
          required={true}
        />
        <label>{label}</label>

        {inputName === 'password' && (
          <React.Fragment>
            {!error[inputName] && inputs[inputName] && <IconTickGreen />}
            <button type='button' onClick={showPasswordHandler}>
              {showPassword ? <IconEyeOpen /> : <IconEyeClosed />}
            </button>
          </React.Fragment>
        )}

        <span className={`input-bottom-line ${error[inputName] ? 'error' : ''}`} />
      </div>
      {!error[inputName] && <span className='assistive-text'>{assistiveText}</span>}
      {error[inputName] && <ErrorMessage error={error} inputType={inputName} />}
    </div>
  );
};
