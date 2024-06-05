import { FC } from 'react';
import pageStyles from '../PageWrapper.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import MonthlyBudgetWidget from './components/MonthlyBudgetWidget';
import styles from './Expenses.module.css';

const Expenses: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleAddExpense = () => {
    navigate('expense-form');
  };
  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.mainContent}>
        <div className={styles.widgetContainer}>
          <MonthlyBudgetWidget />
        </div>
      </div>
      <BottomNav>
        <Button text='Add Expense' onClick={handleAddExpense} />
      </BottomNav>
    </div>
  );
};

export default Expenses;
