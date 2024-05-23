import { FC, useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import TopNav from '../components/dashboard/TopNav';

const ProtectedLayout: FC = (): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuth) return navigate('/login');
  }, [navigate, isAuth]);

  useEffect(() => {
    const paths = pathname.split('/');
    if (paths.length === 2) {
      setTitle(paths[1]);
    } else {
      setTitle(paths[2]);
    }
  }, [pathname]);

  return (
    <div>
      <TopNav title={title} />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
