import { FC } from 'react';
import styles from './Menu.module.css';

const Menu: FC = (): JSX.Element => {
  return (
    <div className={styles.menu}>
      <div className={styles.menuLine}></div>
      <div className={styles.menuLine}></div>
      <div className={styles.menuLine}></div>
    </div>
  );
};

export default Menu;
