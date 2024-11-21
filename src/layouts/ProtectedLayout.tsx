import { FC, useState, useEffect, useContext } from 'react';
import styles from './ProtectedLayout.module.css';
import { AuthContext } from '../store/AuthContext';
import TopNav from '../components/TopNav/TopNav';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedLayout: FC = (): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const { isAuth, isLoading } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const path: string[] = pathname.split('/');
    if (path[1].includes('-')) {
      setTitle(path[1].replace('-', ' '));
    } else {
      setTitle(path[1]);
    }
  }, [pathname]);

  return isAuth ? (
    <>
      <TopNav title={title} />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <Navigate to='/login' replace />
  );
};

export default ProtectedLayout;
