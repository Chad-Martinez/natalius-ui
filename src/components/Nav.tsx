import { FC } from 'react';
import styles from '../styles/Nav.module.css';
import { Link, useLocation } from 'react-router-dom';

const Nav: FC = (): JSX.Element => {
  const location = useLocation();
  return (
    <div className={styles.nav}>
      <div style={{ marginLeft: 'auto' }}>
        {location.pathname !== '/' && (
          <Link className={styles.link} to='/'>
            home
          </Link>
        )}
        {location.pathname !== '/login' && (
          <Link className={styles.link} to='/login'>
            login
          </Link>
        )}
        {location.pathname !== '/register' && (
          <Link className={styles.link} to='/register'>
            register
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
