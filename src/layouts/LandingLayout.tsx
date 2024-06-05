import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './LandingLayout.module.css';
import Nav from '../components/ui/Nav/Nav';

const LandingLayout: FC = (): JSX.Element => {
  return (
    <>
      <Nav />
      <div className={styles.margin}>
        <Outlet />
      </div>
    </>
  );
};

export default LandingLayout;
