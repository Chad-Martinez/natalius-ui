import { FC } from 'react';
import pageStyles from '../PageWrapper.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import MonthlyBudgetWidget from './components/MonthlyBudgetWidget';
import styles from './Expenses.module.css';
import PageHeader from '../../components/ui/PageHeader/PageHeader';

const Expenses: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleAddExpense = () => {
    navigate('expense-form');
  };

  return (
    <>
      <div className={pageStyles.mainContent}>
        <PageHeader linkRight='view-expenses' linkRightText='View Expenses' />
        <div className={styles.widgetContainer}>
          <MonthlyBudgetWidget />
        </div>
      </div>
      <BottomNav>
        <Button text='Add Expense' onClick={handleAddExpense} />
      </BottomNav>
    </>
  );
};

export default Expenses;
