import { FC } from 'react';
import styles from '../PageWrapper.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader/PageHeader';

const Incomes: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleAddIncome = () => {
    navigate('income-form');
  };
  return (
    <>
      <div className={styles.mainContent}>
        <PageHeader linkRight='view-income' linkRightText='View Income' />
      </div>
      <BottomNav>
        <Button text='Add Income' onClick={handleAddIncome} />
      </BottomNav>
    </>
  );
};

export default Incomes;
