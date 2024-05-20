import { FC } from 'react';
import styles from '../styles/Nav.module.css';
import { Link } from 'react-router-dom';

const Nav: FC = (): JSX.Element => {
  return (
    <div className={styles.nav}>
      <div style={{ marginLeft: 'auto' }}>
        <Link className={styles.link} to='/login'>
          login
        </Link>
        <Link className={styles.link} to='/register'>
          register
        </Link>
      </div>
    </div>
  );
};

export default Nav;
