import { FC } from 'react';
import pageStyles from '../PageWrapper.module.css';
import widgetStyles from '../../components/Widgets/Widget.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import MonthlyBudgetWidget from './components/MonthlyBudgetWidget';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import PieGraphWidget from '../../components/Widgets/PieGraphWidget';
import { PieGraphData } from '../../types/GraphData';

const Expenses: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleAddExpense = () => {
    navigate('expense-form');
  };

  const dashboardLoaderData = useLoaderData() as { pieData: PieGraphData };

  return (
    <>
      <div className={pageStyles.mainContent}>
        <PageHeader linkRight='view-expenses' linkRightText='View Expenses' />
        <div className={widgetStyles.widgetContainer}>
          <MonthlyBudgetWidget />
          <PieGraphWidget graphLoaderData={dashboardLoaderData?.pieData} />
        </div>
      </div>
      <BottomNav>
        <Button text='Add Expense' onClick={handleAddExpense} />
      </BottomNav>
    </>
  );
};

export default Expenses;
