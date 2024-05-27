import { FC } from 'react';
import styles from './PageWrapper.module.css';
import BottomNav from '../components/dashboard/BottomNav';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const handleAddIncome = () => {
    navigate('/income/form');
  };

  const handleAddExpense = () => {
    // navigate('/expense/form');
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}></div>
      <BottomNav>
        <Button text='Add Income' onClick={handleAddIncome} />
        <Button text='Add Expense' onClick={handleAddExpense} />
      </BottomNav>
    </div>
  );
};

export default Dashboard;
