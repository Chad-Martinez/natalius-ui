import { FC } from 'react';
import Paginator from '../../../components/ui/Paginator/Paginator';
import styles from '../ViewExpenses.module.css';
import { IExpense } from '../../../interfaces/IExpense.interface';
import ViewExpensesListItem from './ViewExpensesListItem';
import { IShift } from '../../../interfaces/IShift.interface';

type ViewExpenseProps = {
  expenses: Array<IExpense | IShift>;
  currPage: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleMenu: (top: number, left: number, expense: IExpense | IShift) => void;
};

const ViewExpensesList: FC<ViewExpenseProps> = ({
  expenses,
  currPage,
  totalPages,
  handlePrev,
  handleNext,
  handleMenu,
}): JSX.Element => {
  const mappedExpenses = expenses.map((expense: IExpense | IShift) => (
    <ViewExpensesListItem
      key={expense._id}
      expense={expense}
      handleMenu={handleMenu}
    />
  ));

  return (
    <div className={styles.listContainer}>
      <div className={styles.header}>
        <div className={styles.date}>Date</div>
        <div className={styles.vendor}>Vendor</div>
        <div className={styles.amount}>Amount</div>
        <div className={styles.type}>Type</div>
        <div className={styles.actionsContainer}></div>
      </div>
      <div className={styles.listItemsContainer}>
        {expenses.length > 0 ? mappedExpenses : ''}
      </div>
      <div className={styles.footer}>
        <Paginator
          currPage={currPage}
          totalPages={totalPages}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
};

export default ViewExpensesList;
