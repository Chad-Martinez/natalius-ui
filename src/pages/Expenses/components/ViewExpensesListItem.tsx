import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, PointerEvent, SyntheticEvent } from 'react';
import styles from '../ViewExpenses.module.css';
import { IExpense } from '../../../interfaces/IExpense.interface';
import dayjs from 'dayjs';

const ViewExpensesListItem: FC<{
  expense: IExpense;
  handleMenu: (top: number, left: number, expense: IExpense) => void;
}> = ({ expense, handleMenu }): JSX.Element => {
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    const e = {
      ...event,
    } as PointerEvent;
    handleMenu(e.clientY, e.clientX, expense);
  };

  return (
    <div className={styles.listItem}>
      <div className={styles.date}>
        {dayjs(expense.date).format('MM/DD/YY')}
      </div>
      <div className={styles.vendor}>
        <span>{expense.vendor}</span>
      </div>
      <div className={styles.amount}>${expense.amount.toFixed(2)}</div>
      <div className={styles.type}>{expense.type[0]}</div>
      <div className={styles.actions}>
        <FontAwesomeIcon icon={faEllipsisVertical} onClick={handleClick} />
      </div>
    </div>
  );
};

export default ViewExpensesListItem;
