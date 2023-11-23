import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { respondText, respondTextPath } from '../../constants/auth';
import { RoutePath } from '../../constants/routes';
import { clearLoginData } from '../../redux/login/slice';
import { clearRegistrationData } from '../../redux/registration/slice';
import { clearResetPassData } from '../../redux/reset-pass/slice';
import { AuthRespondType } from '../../types/auth';
import { Button } from '../common/button/button';

import './auth-respond.scss';

type Props = {
  respond: string;
};

export const AuthRespond = ({ respond }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (respond === respondTextPath.login.error) {
      dispatch(clearLoginData());
    }

    if (respond === respondTextPath.registration.exist || respond === respondTextPath.registration.error) {
      dispatch(clearRegistrationData());
    }

    if (respond === respondTextPath.forgotPass.error) {
      dispatch(clearResetPassData());
    }

    if (respond === respondTextPath.registration.success || respond === respondTextPath.forgotPass.success) {
      navigate(RoutePath.auth);
    }
  };

  const { header, text, button } = respondText[respond as keyof AuthRespondType];

  return (
    <div className='auth-respond-block'>
      <div className='auth-respond-block_header'>
        <h4>{t(header)}</h4>
      </div>
      <p>{t(text)}</p>
      <div className='auth-block_footer'>
        <Button width={410} onClick={clickHandler}>
          {t(button)}
        </Button>
      </div>
    </div>
  );
};
