import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconChevronRight } from '../../assets/images/Icon_Chevron_Right.svg';
import { RegistrationRespond } from '../../components/auth-respond/registration-respond';
import { RegistrationForm } from '../../components/forms/registration-form';
import { STATUS } from '../../constants/common';
import { RoutePath } from '../../constants/routes';
import { Loader } from '../../global/loader/loader';
import { registerSelector } from '../../redux/registration/selector';

import './auth.scss';

export const RegistrationPage = () => {
  const [registrationStep, setRegistrationStep] = useState<number>(1);

  const navigate = useNavigate();

  const openLoginForm = () => {
    navigate(RoutePath.auth);
  };
  const { loading, status, dataError, error } = useSelector(registerSelector);

  if (status === STATUS.ERROR) {
    return (
      <React.Fragment>
        <RegistrationRespond respondType={dataError ? 'exist' : 'error'} />;
      </React.Fragment>
    );
  }

  if (status === STATUS.SUCCESS) {
    return <RegistrationRespond respondType='success' />;
  }

  return (
    <React.Fragment>
      {loading && <Loader />}
      <div className='auth-block'>
        <div className='auth-block_header'>
          <h4>Регистрация</h4>
          <span>{registrationStep} шаг из 3</span>
        </div>
        <RegistrationForm registrationStep={registrationStep} setRegistrationStep={setRegistrationStep} />
        <div className='auth-block_footer'>
          <span>Есть учётная запись?</span>
          <button type='button' onClick={openLoginForm}>
            войти <IconChevronRight />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
