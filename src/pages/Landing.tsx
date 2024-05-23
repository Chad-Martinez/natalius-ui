import { FC } from 'react';
import Nav from '../components/ui/Nav';
import styles from '../styles/common.module.css';
import Logo from '../components/ui/Logo';

const Landing: FC = () => {
  return (
    <>
      <Nav />
      <div className={styles.containerCentered}>
        <div>
          <Logo addedStyles={{ width: '45%' }} />
          <h2>Natalius</h2>
          <div className={styles.subtitle}>
            An app for independent contractors
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
