import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { ReactComponent as IconEyeClosed } from '../../../assets/images/Icon_Eye_closed.svg';
import { ReactComponent as IconEyeOpen } from '../../../assets/images/Icon_Eye_Open.svg';
import { ReactComponent as IconTickGreen } from '../../../assets/images/Icon_Tick_green.svg';
import { validateInput } from '../../../utils/validation';

import { ErrorMessage } from './error-message';

type Props = {
  register: UseFormRegisterReturn;
  inputName: string;
  label: string;
  assistiveText?: string;
  type: string;
  showPassToggle?: boolean;
  showTick?: boolean;
  dataError?: boolean;
  needValidation?: boolean;
};

export const AuthInput = ({
  register,
  needValidation,
  dataError,
  showPassToggle,
  showTick,
  inputName,
  label,
  assistiveText,
  type,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState('');

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    setInputText('');
    setInputError('');
  }, [inputName]);

  const checkEmptyField = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (needValidation) {
      const result = validateInput(name, value);

      setInputError(result.messageType);
    } else if (value === '') {
      setInputError('required');
    } else {
      setInputError('');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

      setInputText(formatedValue);
    } else {
      setInputText(value);
    }

    if (needValidation && (name === 'username' || name === 'password')) {
      const result = validateInput(name, value);

      setInputError(result.messageType);
    } else {
      setInputError('');
    }
  };

  return (
    <div className='input-container'>
      <div className='input-field'>
        <input
          id={inputName}
          type={showPassword ? 'text' : type}
          {...register}
          onBlur={(e) => {
            checkEmptyField(e);
            register.onBlur(e);
          }}
          onChange={(e) => {
            onChangeHandler(e);
            register.onChange(e);
          }}
          value={inputText}
          required={true}
        />
        <label htmlFor={inputName}>{label}</label>

        {showPassToggle && (
          <React.Fragment>
            {showTick && !inputError && inputText && <IconTickGreen />}
            <button type='button' onClick={showPasswordHandler}>
              {showPassword ? <IconEyeOpen /> : <IconEyeClosed />}
            </button>
          </React.Fragment>
        )}

        <span className={`input-bottom-line ${inputError || dataError ? 'error' : ''}`} />
      </div>
      {!inputError && <div className='assistive-text'>{assistiveText}</div>}
      {inputError && <ErrorMessage error={inputError} inputType={inputName} />}
    </div>
  );
};
