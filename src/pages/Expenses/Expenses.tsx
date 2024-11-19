import { FC, useCallback, useEffect, useState } from 'react';
import pageStyles from '../PageWrapper.module.css';
import widgetStyles from '../../components/Widgets/Widget.module.css';
import BottomNav from '../../components/ui/BottomNav/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import PieGraphWidget from '../../components/Widgets/PieGraphWidget';
import { GraphData, DataSet, BarSeriesKey } from '../../types/GraphData';
import BarGraphWidget from '../../components/Widgets/BarGraphWidget';
import { valueFormatter } from '../../helpers/format-helpers';
import {
  DAYS_OF_WEEK,
  MONTHS_OF_YEAR,
  WEEKS_OF_MONTH,
} from '../../helpers/date-time-helpers';
import dayjs from 'dayjs';

type ExpenseGraphData = {
  expenseBarGraphSet: GraphData;
  shiftExpenseBarGraphSet: GraphData;
  mergedExpenseBarGraphSet: GraphData;
};

const Expenses: FC = (): JSX.Element => {
  const [expenseGraphData, setExpenseGraphData] = useState<
    ExpenseGraphData | undefined
  >(undefined);
  const navigate = useNavigate();

  const handleAddExpense = () => navigate('expense-form');

  const expenseLoaderData = useLoaderData() as {
    pieData: GraphData;
    graphData: ExpenseGraphData;
  };

  const addMissingPeriods = useCallback((data: DataSet[], period: string[]) => {
    const existingPeriods = new Set(data.map((item) => item.label));

    const missingPeriods = period.filter((day) => !existingPeriods.has(day));

    const missingEntries = missingPeriods.map((day) => ({
      label: day,
      type: 'NONE',
    }));

    const completeData: DataSet[] = [...data, ...missingEntries];

    return completeData.sort(
      (a, b) =>
        period.indexOf(a.label as string) - period.indexOf(b.label as string)
    );
  }, []);

  useEffect(() => {
    if (expenseLoaderData && expenseLoaderData.graphData) {
      const mappedDataSets: Partial<ExpenseGraphData> = {};
      const mappedDataSet: Partial<GraphData> = {};
      for (const [k, v] of Object.entries(expenseLoaderData.graphData)) {
        for (const [l, w] of Object.entries(v)) {
          switch (l) {
            case 'defaultDataSet':
              break;
            case 'month':
              {
                const monthData = addMissingPeriods(
                  w as DataSet[],
                  WEEKS_OF_MONTH
                );
                mappedDataSet[l] = monthData;
              }
              break;
            case 'quarter':
              {
                const monthsCopy = [...MONTHS_OF_YEAR];
                const monthsOfQuarter: string[] = monthsCopy.splice(
                  Math.floor(dayjs().month() / 3) * 3,
                  3
                );

                const quarterData = addMissingPeriods(
                  w as DataSet[],
                  monthsOfQuarter
                );
                mappedDataSet[l] = quarterData;
              }
              break;
            case 'year':
              {
                const yearData = addMissingPeriods(
                  w as DataSet[],
                  MONTHS_OF_YEAR
                );
                mappedDataSet[l] = yearData;
              }
              break;
            default:
              {
                const weekData = addMissingPeriods(
                  w as DataSet[],
                  DAYS_OF_WEEK
                );
                // @ts-expect-error @ts-ignore
                mappedDataSet[l] = weekData;
              }
              break;
          }
        }
        mappedDataSet.defaultDataSet = v.defaultDataSet;
        // @ts-expect-error @ts-ignore
        mappedDataSets[k] = { ...mappedDataSet };
      }
      setExpenseGraphData(mappedDataSets as ExpenseGraphData);
    }
  }, [setExpenseGraphData, expenseLoaderData, addMissingPeriods]);

  const barSeriesKeys: { [key: string]: BarSeriesKey } = {
    service: {
      dataKey: 'service',
      label: 'SERVICE',
      valueFormatter,
      type: 'bar',
    },
    misc: { dataKey: 'misc', label: 'MISC', valueFormatter, type: 'bar' },
    equipment: {
      dataKey: 'equipment',
      label: 'EQUIPMENT',
      valueFormatter,
      type: 'bar',
    },
    shift: {
      dataKey: 'shift',
      label: 'SHIFT',
      valueFormatter,
      type: 'bar',
    },
  };

  return (
    <>
      <div className={pageStyles.mainContent}>
        <PageHeader linkRight='view-expenses' linkRightText='View Expenses' />
        <div className={widgetStyles.widgetContainer}>
          <BarGraphWidget
            defaultSet={
              expenseLoaderData?.graphData.mergedExpenseBarGraphSet
                .defaultDataSet
            }
            graphLoaderData={expenseGraphData?.mergedExpenseBarGraphSet}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 1,
                labelStyle: {
                  fontSize: 11,
                  fill: '#eeeeee',
                },
              },
            }}
            xAxis={[{ scaleType: 'band', dataKey: 'label', id: 'expenses' }]}
            seriesKeys={barSeriesKeys}
          />
          <PieGraphWidget
            graphLoaderData={expenseLoaderData?.pieData}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 2,
                labelStyle: {
                  fontSize: 11,
                  fill: '#eeeeee',
                },
              },
            }}
          />
        </div>
      </div>
      <BottomNav>
        <Button text='Add Expense' onClick={handleAddExpense} />
      </BottomNav>
    </>
  );
};

export default Expenses;
