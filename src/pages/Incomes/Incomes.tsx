import { FC } from 'react';
import pageStyles from '../PageWrapper.module.css';
import widgetStyles from '../../components/Widgets/Widget.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import AveragesWidget from '../../components/Widgets/AveragesWidget/AveragesWidget';
import { ISprint } from '../../interfaces/ISprint.interface';
import { IncomeAverages } from '../../types/IncomeAverages';
import SprintGoalWidget from '../../components/Widgets/SprintGoalWidget';
import BarGraphWidget from '../../components/Widgets/BarGraphWidget';
import { BarGraphData } from '../../types/GraphData';

const Incomes: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const incomeLoaderData = useLoaderData() as {
    sprint: ISprint;
    averages: IncomeAverages;
    graphData: BarGraphData;
  };

  const handleAddIncome = () => {
    navigate('income-form');
  };
  return (
    <>
      <div className={pageStyles.mainContent}>
        <PageHeader linkRight='view-income' linkRightText='View Income' />
        <div className={widgetStyles.widgetContainer}>
          <SprintGoalWidget sprint={incomeLoaderData?.sprint} />
          <AveragesWidget averages={incomeLoaderData?.averages} />
          <BarGraphWidget graphLoaderData={incomeLoaderData?.graphData} />
        </div>
      </div>
      <BottomNav>
        <Button text='Add Income' onClick={handleAddIncome} />
      </BottomNav>
    </>
  );
};

export default Incomes;
