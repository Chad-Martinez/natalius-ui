import { FC, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

const ProtectedLayout: FC = (): JSX.Element => {
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) return navigate('/login');
  }, [navigate, isAuth]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
