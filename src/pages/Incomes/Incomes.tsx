import { FC } from 'react';
import pageStyles from '../PageWrapper.module.css';
import widgetStyles from '../../components/Widgets/Widget.module.css';
import { useLoaderData } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import AveragesWidget from '../../components/Widgets/AveragesWidget/AveragesWidget';
import { ISprint } from '../../interfaces/ISprint.interface';
import { IncomeAverages } from '../../types/IncomeAverages';
import SprintGoalWidget from '../../components/Widgets/SprintGoalWidget';
import BarGraphWidget from '../../components/Widgets/BarGraphWidget';
import { BarGraphData } from '../../types/GraphData';

const Incomes: FC = (): JSX.Element => {
  const incomeLoaderData = useLoaderData() as {
    sprint: ISprint;
    averages: IncomeAverages;
    graphData: BarGraphData;
  };

  return (
    <>
      <div className={pageStyles.mainContent}>
        <PageHeader linkRight='view-income' linkRightText='View Income' />
        <div className={widgetStyles.widgetContainer}>
          <SprintGoalWidget sprintData={incomeLoaderData?.sprint} />
          <AveragesWidget averages={incomeLoaderData?.averages} />
          <BarGraphWidget graphLoaderData={incomeLoaderData?.graphData} />
        </div>
      </div>
    </>
  );
};

export default Incomes;
