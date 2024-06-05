import { FC } from 'react';
import styles from './Card.module.css';

const CardContentVacant: FC<{ title: string }> = ({ title }): JSX.Element => {
  return <div className={styles.vacantTitle}>{title}</div>;
};

export default CardContentVacant;
