import { FC } from 'react';
import styles from '../PageWrapper.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Expenses: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleAddExpense = () => {
    navigate('expense-form');
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>Expenses</div>
      <BottomNav>
        <Button text='Add Expense' onClick={handleAddExpense} />
      </BottomNav>
    </div>
  );
};

export default Expenses;
