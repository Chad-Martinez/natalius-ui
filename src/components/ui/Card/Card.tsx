import { FC, PropsWithChildren } from 'react';
import styles from './Card.module.css';

const Card: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
