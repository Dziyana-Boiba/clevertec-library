import { useNavigate } from 'react-router-dom';

import { RoutePath } from '../../constants/routes';

type Props = {
  isAutheticated: boolean;
};

export const NotFound = ({ isAutheticated }: Props) => {
  const navigate = useNavigate();

  return (
    <div id='not-found-page'>
      Ups, This page do not exist.
      <button type='button' onClick={() => navigate(isAutheticated ? RoutePath.booksAll : RoutePath.auth)}>
        {isAutheticated ? 'Go to Main Page' : 'Go to Sign up'}
      </button>
    </div>
  );
};
