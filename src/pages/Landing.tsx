import { FC } from 'react';
import styles from './Landing.module.css';
import Logo from '../components/ui/Logo';

const Landing: FC = () => {
  return (
    <div>
      <Logo addedStyles={{ width: '60%', maxWidth: '300px' }} />
      <h1>Natalius</h1>
      <div className={styles.subtitle}>An app for independent contractors</div>
    </div>
  );
};

export default Landing;
