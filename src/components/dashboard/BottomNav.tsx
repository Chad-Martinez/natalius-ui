import { FC, ReactNode } from 'react';
import styles from './BottomNav.module.css';

type Props = {
  children: ReactNode | ReactNode[];
};

const BottomNav: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className={styles.nav}>
      <div className={styles.btnContainer}>{children}</div>
    </div>
  );
};

export default BottomNav;
