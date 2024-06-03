import { FC } from 'react';
import styles from './TopNav.module.css';
import Logo from '../ui/Logo';
import Menu from '../ui/Menu';

const TopNav: FC<{ title: string }> = ({ title }): JSX.Element => {
  return (
    <div className={styles.nav}>
      <div className={styles.navContainer}>
        <Logo addedStyles={{ width: '40px', margin: '0px' }} />
        <h1>{title}</h1>
        <Menu />
      </div>
    </div>
  );
};

export default TopNav;
