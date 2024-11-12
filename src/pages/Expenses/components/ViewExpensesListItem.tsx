import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, memo, PointerEvent, SyntheticEvent } from 'react';
import styles from '../ViewExpenses.module.css';
import { IExpense } from '../../../interfaces/IExpense.interface';
import dayjs from 'dayjs';
import { IShift } from '../../../interfaces/IShift.interface';

const ViewExpensesListItem: FC<{
  expense: IExpense | IShift;
  handleMenu: (top: number, left: number, expense: IExpense | IShift) => void;
}> = memo(({ expense, handleMenu }): JSX.Element => {
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    const e = {
      ...event,
    } as PointerEvent;
    handleMenu(e.clientY, e.clientX, expense);
  };

  const generateListItem = (): JSX.Element => {
    if ('vendor' in expense) {
      expense as IExpense;
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
          <div className={styles.actionsContainer}>
            <div className={styles.actions} onClick={handleClick}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
          </div>
        </div>
      );
    } else if ('club' in expense) {
      const shift = { ...expense } as IShift;
      return (
        <div className={styles.listItem}>
          <div className={styles.date}>
            {dayjs(shift.start).format('MM/DD/YY')}
          </div>
          <div className={styles.vendor}>
            <span>{shift.club}</span>
          </div>
          <div className={styles.amount}>
            ${shift.expenses?.totalShiftExpenses}
          </div>
          <div className={styles.type}>{shift.expenses?.type.slice(0, 2)}</div>
          <div className={styles.actionsContainer}>
            <div className={styles.actions} onClick={handleClick}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return generateListItem();
});

export default ViewExpensesListItem;
