import { FC } from 'react';
import styles from './PageWrapper.module.css';
import BottomNav from '../components/dashboard/BottomNav';
import Button from '../components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const handleAddIncome = () => {
    navigate('/income/income-form');
  };

  const handleAddExpense = () => {
    navigate('/expenses/expense-form');
  };
  return (
    <>
      <div className={styles.mainContent}></div>
      <BottomNav>
        <Button text='Add Income' onClick={handleAddIncome} />
        <Button text='Add Expense' onClick={handleAddExpense} />
      </BottomNav>
    </>
  );
};

export default Dashboard;
