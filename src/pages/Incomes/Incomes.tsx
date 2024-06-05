import { FC } from 'react';
import styles from '../PageWrapper.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';

const Incomes: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleAddIncome = () => {
    navigate('income-form');
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>Income</div>
      <BottomNav>
        <Button text='Add Income' onClick={handleAddIncome} />
      </BottomNav>
    </div>
  );
};

export default Incomes;
