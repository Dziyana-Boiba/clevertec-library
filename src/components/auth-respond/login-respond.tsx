import { useDispatch } from 'react-redux';

import { clearLoginData } from '../../redux/login/slice';
import { Button } from '../common/button/button';

import './auth-respond.scss';

export const LoginRespond = () => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(clearLoginData());
  };

  return (
    <div className='auth-respond-block'>
      <div className='auth-respond-block_header'>
        <h4>Вход не выполнен</h4>
      </div>
      <p>Что-то пошло не так. Попробуйте ещё раз</p>
      <div className='auth-block_footer'>
        <Button width={410} onClick={clickHandler}>
          повторить
        </Button>
      </div>
    </div>
  );
};
