import { FC, PropsWithChildren } from 'react';
import styles from './BottomNav.module.css';

const BottomNav: FC<PropsWithChildren> = (props): JSX.Element => {
  return (
    <div className={styles.nav}>
      <div className={styles.btnContainer}>{props.children}</div>
    </div>
  );
};

export default BottomNav;
