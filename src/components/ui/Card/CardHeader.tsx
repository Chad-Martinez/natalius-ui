import { FC, PropsWithChildren } from 'react';
import styles from './Card.module.css';

const CardHeader: FC<
  PropsWithChildren<{
    text: string;
  }>
> = ({ text, children }): JSX.Element => {
  return (
    <div className={styles.cardHeader}>
      <div className={styles.cardTitle}>{text}</div>
      <div className={styles.iconGroup}>{children}</div>
    </div>
  );
};

export default CardHeader;
