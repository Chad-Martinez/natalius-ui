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
import { GraphData } from '../../types/GraphData';
import { valueFormatter } from '../../utils/formatters';
import ShiftPredictionWidget from '../../components/Widgets/ShiftPredictionWidget';

const Incomes: FC = (): JSX.Element => {
  const incomeLoaderData = useLoaderData() as {
    sprint: ISprint;
    averages: IncomeAverages;
    graphData: GraphData;
    shiftPrediction: {
      prediction: number;
      nextShift: { start: Date; timezone: string };
    } | null;
  };

  return (
    <>
      <div className={pageStyles.mainContent}>
        <PageHeader linkRight='view-income' linkRightText='View Income' />
        <div className={widgetStyles.widgetContainer}>
          <SprintGoalWidget sprintData={incomeLoaderData?.sprint} />
          <ShiftPredictionWidget
            shiftPrediction={incomeLoaderData?.shiftPrediction}
          />
          <AveragesWidget averages={incomeLoaderData?.averages} />
          <BarGraphWidget
            graphLoaderData={incomeLoaderData?.graphData}
            defaultSet={incomeLoaderData?.graphData?.defaultDataSet}
            xAxis={[
              {
                scaleType: 'band',
                dataKey: 'label',
                tickPlacement: 'middle',
                id: 'income',
              },
            ]}
            seriesKeys={[
              {
                dataKey: 'income',
                valueFormatter,
                id: 'income_id',
                type: 'bar',
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Incomes;
