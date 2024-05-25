import { FC, PropsWithChildren } from 'react';
import styles from './Card.module.css';

const CardContent: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <div className={styles.cardContent}>{children}</div>;
};

export default CardContent;
