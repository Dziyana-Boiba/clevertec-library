import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { resetPassSelector } from '../../redux/reset-pass/selector';
import { Button } from '../common/button/button';

import './auth-respond.scss';

const forgotPassRespond = {
  emailSent: {
    header: 'Письмо выслано',
    text: 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля',
    button: '',
  },
  error: {
    header: 'Данные не сохранились',
    text: 'Что-то пошло не так. Попробуйте ещё раз',
    button: 'повторить',
  },
  success: {
    header: 'Новые данные сохранены',
    text: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
    button: 'вход',
  },
};

type Props = {
  respondType: string;
};
/* eslint-disable no-console */
export const ForgotPassRespond = ({ respondType }: Props) => {
  const navigate = useNavigate();
  const { data } = useSelector(resetPassSelector);
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (respondType === 'success') {
      navigate('/auth');
    }
    if (respondType === 'error') {
      /* dispatch({ type: RESETPASS, inputs }); */
      console.log(data);
    }
  };

  return (
    <div className='auth-respond-block'>
      <div className='auth-respond-block_header'>
        <h4>{forgotPassRespond[respondType].header}</h4>
      </div>
      <p>{forgotPassRespond[respondType].text}</p>
      {forgotPassRespond[respondType].button && (
        <div className='auth-block_footer'>
          <Button width={410} onClick={clickHandler}>
            {forgotPassRespond[respondType].button}
          </Button>
        </div>
      )}
    </div>
  );
};
