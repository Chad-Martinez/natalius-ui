import { FC } from 'react';
import styles from './Card.module.css';
import EditDeleteBtnGroup from '../EditDeleteBtnGroup';

const CardHeader: FC<{
  text: string;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ text, onEdit, onDelete }): JSX.Element => {
  return (
    <div className={styles.cardHeader}>
      <div className={styles.cardTitle}>{text}</div>
      <EditDeleteBtnGroup onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default CardHeader;
