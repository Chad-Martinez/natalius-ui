import { FC, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import styles from './LandingLayout.module.css';
import Nav from '../components/ui/Nav/Nav';
import { AuthContext } from '../store/AuthContext';

const LandingLayout: FC = (): JSX.Element => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? (
    <Navigate to='/dashboard' replace />
  ) : (
    <>
      <Nav />
      <div className={styles.margin}>
        <Outlet />
      </div>
    </>
  );
};

export default LandingLayout;
