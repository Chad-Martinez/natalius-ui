import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, PointerEvent, SyntheticEvent } from 'react';
import styles from '../ViewIncome.module.css';
import dayjs from 'dayjs';
import { IShift } from '../../../interfaces/IShift.interface';

const ViewIncomeListItem: FC<{
  shift: IShift;
  handleMenu: (top: number, left: number, shift: IShift) => void;
}> = ({ shift, handleMenu }): JSX.Element => {
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    const e = {
      ...event,
    } as PointerEvent;
    handleMenu(e.clientY, e.clientX, shift);
  };
  return (
    <div className={styles.listItem}>
      <div className={styles.date}>{dayjs(shift.start).format('MM/DD/YY')}</div>
      <div className={styles.club}>
        <span>{shift?.club}</span>
      </div>
      <div className={styles.amount}>${shift.income?.amount.toFixed(2)}</div>
      <div className={styles.actions}>
        <FontAwesomeIcon icon={faEllipsisVertical} onClick={handleClick} />
      </div>
    </div>
  );
};

export default ViewIncomeListItem;
