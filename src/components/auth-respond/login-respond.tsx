import { useDispatch, useSelector } from 'react-redux';

import { loginSelector } from '../../redux/login/selector';
import { Button } from '../common/button/button';

import './auth-respond.scss';

export const LoginRespond = () => {
  const { data } = useSelector(loginSelector);
  const dispatch = useDispatch();

  const clickHandler = () => {
    /* dispatch({ type: LOGIN, inputs }); */
    console.log(data);
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
