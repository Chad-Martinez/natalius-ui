import { FC } from 'react';
import pageStyles from '../PageWrapper.module.css';
import styles from './Dashboard.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { IShift } from '../../interfaces/IShift.interface';
import { ISprint } from '../../interfaces/ISprint.interface';
import SprintGoalWidget from '../../components/Widgets/SprintGoalWidget';
import UpcomingShiftsWidget from '../../components/Widgets/UpcomingShiftsWidget';
import GaugeWidget from '../../components/Widgets/GaugeWidget';

const Dashboard: FC = (): JSX.Element => {
  const dashboardData = useLoaderData() as {
    sprint: ISprint;
    upcomingShifts: IShift[];
    ytdExpenses: number;
    ytdIncome: number;
  };

  const navigate = useNavigate();

  const handleAddIncome = (): void => {
    navigate('/income/income-form');
  };

  const handleAddExpense = (): void => {
    navigate('/expenses/expense-form');
  };

  return (
    <>
      <div className={pageStyles.mainContent}>
        <div className={styles.widgetContainer}>
          <SprintGoalWidget sprintData={dashboardData.sprint} />
          <UpcomingShiftsWidget shifts={dashboardData?.upcomingShifts} />
          <GaugeWidget
            ytdIncome={dashboardData?.ytdIncome}
            ytdExpenses={dashboardData?.ytdExpenses}
          />
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
