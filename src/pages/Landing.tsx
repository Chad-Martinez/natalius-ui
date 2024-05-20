import { FC } from 'react';
import logo from '../assets/shell.png';
import Nav from '../components/Nav';
import styles from '../styles/common.module.css';

const Landing: FC = () => {
  return (
    <>
      <Nav />
      <div className={styles.containerCentered}>
        <div>
          <img className={styles.logo} src={logo} alt='natalius' />
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
