import { FC } from 'react';
import pageStyles from '../PageWrapper.module.css';
import styles from './Dashboard.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import UpcomingShiftsWidget from './components/UpcomingShiftsWidget';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import { IShift } from '../../interfaces/IShift.interface';

const Dashboard: FC = (): JSX.Element => {
  const dashboardData = useLoaderData() as IShift[];

  const navigate = useNavigate();
  const handleAddIncome = () => {
    navigate('/income/income-form');
  };

  const handleAddExpense = () => {
    navigate('/expenses/expense-form');
  };
  return (
    <>
      <div className={pageStyles.mainContent}>
        <PageHeader />
        <div className={styles.widgetContainer}>
          <UpcomingShiftsWidget shifts={dashboardData} />
        </div>
      </div>
      <BottomNav>
        <Button text='Add Income' onClick={handleAddIncome} />
        <Button text='Add Expense' onClick={handleAddExpense} />
      </BottomNav>
    </>
  );
};

export default Dashboard;
