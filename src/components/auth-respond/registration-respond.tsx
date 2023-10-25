import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { registerSelector } from '../../redux/registration/selector';
import { Button } from '../common/button/button';

import './auth-respond.scss';

const registerRespond = {
  exist: {
    header: 'Данные не сохранились',
    text: 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
    button: 'назад к регистрации',
  },
  error: {
    header: 'Данные не сохранились',
    text: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
    button: 'повторить',
  },
  success: {
    header: 'Регистрация успешна',
    text: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
    button: 'вход',
  },
};

type Props = {
  respondType: string;
};

export const RegistrationRespond = ({ respondType }: Props) => {
  const navigate = useNavigate();
  const inputs = useSelector(registerSelector);
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (respondType === 'success') {
      navigate('/auth');
    }
    if (respondType === 'error') {
      /* dispatch({ type: REGISTER, inputs }); */
      console.log(inputs);
    }
    if (respondType === 'exist') {
      /*  dispatch({ type: REMOVE_INPUTS }); */
      navigate('/registration');
    }
  };

  console.log('respond type', respondType);

  return (
    <div className='auth-respond-block'>
      <div className='auth-respond-block_header'>
        <h4>{registerRespond.success.header}</h4>
      </div>
      <p>{registerRespond.success.text}</p>
      <div className='auth-block_footer'>
        <Button width={410} onClick={clickHandler}>
          {registerRespond.success.button}
        </Button>
      </div>
    </div>
  );
};
