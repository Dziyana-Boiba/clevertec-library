import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { forgotPassRespond } from '../../constants/auth';
import { clearResetPassData } from '../../redux/reset-pass/slice';
import { Button } from '../common/button/button';

import './auth-respond.scss';

type Props = {
  respondType: string;
};

export const ForgotPassRespond = ({ respondType }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (respondType === 'success') {
      navigate('/auth');
    }
    if (respondType === 'error') {
      dispatch(clearResetPassData());
    }
  };

  const { header, text, button } = forgotPassRespond[respondType as keyof typeof forgotPassRespond];

  return (
    <div className='auth-respond-block'>
      <div className='auth-respond-block_header'>
        <h4>{header}</h4>
      </div>
      <p>{text}</p>
      {button && (
        <div className='auth-block_footer'>
          <Button width={410} onClick={clickHandler}>
            {button}
          </Button>
        </div>
      )}
    </div>
  );
};
