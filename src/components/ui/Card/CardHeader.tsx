import { FC } from 'react';
import styles from './Card.module.css';
import EditDeleteBtnGroup from '../EditDeleteBtnGroup';

const CardHeader: FC<{ text: string }> = ({ text }): JSX.Element => {
  return (
    <div className={styles.cardHeader}>
      <div className={styles.cardTitle}>{text}</div>
      <EditDeleteBtnGroup />
    </div>
  );
};

export default CardHeader;
