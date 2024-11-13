import { FC } from 'react';
import pageStyles from '../PageWrapper.module.css';
import styles from './Dashboard.module.css';
import BottomNav from '../../components/ui/BottomNav/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { IShift } from '../../interfaces/IShift.interface';
import { ISprint } from '../../interfaces/ISprint.interface';
import SprintGoalWidget from '../../components/Widgets/SprintGoalWidget';
import UpcomingShiftsWidget from '../../components/Widgets/UpcomingShiftsWidget';
import GaugeWidget from '../../components/Widgets/GaugeWidget';
import ShiftPredictionWidget from '../../components/Widgets/ShiftPredictionWidget';

const Dashboard: FC = (): JSX.Element => {
  const dashboardData = useLoaderData() as {
    sprint: ISprint;
    upcomingShifts: IShift[];
    shiftPrediction: {
      prediction: number;
      nextShift: { start: Date; timezone: string };
    } | null;
    ytdExpenses: number;
    ytdIncome: number;
  };

  const navigate = useNavigate();

  const handleAddShift = (): void => {
    navigate('/clubs/shift-form');
  };

  const handleAddExpense = (): void => {
    navigate('/expenses/expense-form');
  };

  return (
    <>
      <div className={pageStyles.mainContent}>
        <div className={styles.widgetContainer}>
          <SprintGoalWidget sprintData={dashboardData?.sprint} />
          <UpcomingShiftsWidget shifts={dashboardData?.upcomingShifts} />
          <ShiftPredictionWidget
            shiftPrediction={dashboardData?.shiftPrediction}
          />
          <GaugeWidget
            ytdIncome={dashboardData?.ytdIncome}
            ytdExpenses={dashboardData?.ytdExpenses}
          />
        </div>
      </div>
      <BottomNav>
        <Button text='Add Shift' onClick={handleAddShift} />
        <Button text='Add Expense' onClick={handleAddExpense} />
      </BottomNav>
    </>
  );
};

export default Dashboard;
