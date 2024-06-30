import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, PointerEvent, SyntheticEvent } from 'react';
import styles from '../ViewIncome.module.css';
import { IIncome } from '../../../interfaces/IIncome.interface';
import dayjs from 'dayjs';

const ViewIncomeListItem: FC<{
  income: IIncome;
  handleMenu: (top: number, left: number, income: IIncome) => void;
}> = ({ income, handleMenu }): JSX.Element => {
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    const e = {
      ...event,
    } as PointerEvent;
    handleMenu(e.clientY, e.clientX, income);
  };
  return (
    <div className={styles.listItem}>
      <div className={styles.date}>{dayjs(income.date).format('MM/DD/YY')}</div>
      <div className={styles.club}>
        <span>{income.club}</span>
      </div>
      <div className={styles.amount}>${income.amount.toFixed(2)}</div>
      <div className={styles.actions}>
        <FontAwesomeIcon icon={faEllipsisVertical} onClick={handleClick} />
      </div>
    </div>
  );
};

export default ViewIncomeListItem;
