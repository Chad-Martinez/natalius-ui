import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import widgetStyles from './Widget.module.css';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardContent from '../ui/Card/CardContent';
import CardContentVacant from '../ui/Card/CardContentVacant';
import PieGraph from '../charts/Pie/PieGraph';
import PeriodSelector from '../charts/PeriodSelector/PeriodSelector';
import { DataSet, GraphData } from '../../types/GraphData';
import { PieChartSlotProps } from '@mui/x-charts';

const PieGraphWidget: FC<{
  graphLoaderData: GraphData;
  slotProps: PieChartSlotProps;
}> = ({ graphLoaderData, slotProps }): JSX.Element => {
  const [period, setPeriod] = useState<string>('Week');
  const [graphData, setGraphData] = useState<DataSet[]>([]);

  const handleSwitch = useCallback(
    (period: string) => {
      // @ts-expect-error @ts-ignore
      setGraphData(graphLoaderData[period.toLowerCase()]);
      setPeriod(period);
    },
    [graphLoaderData]
  );

  useEffect(() => {
    if (graphLoaderData) {
      handleSwitch(graphLoaderData.defaultDataSet);
    }
  }, [graphLoaderData, handleSwitch]);

  const loadGraphData = (event: ChangeEvent<HTMLInputElement>) => {
    handleSwitch(event.target.value);
  };

  return (
    <Card
      addedStyles={{
        maxWidth: '607.5px',
      }}
    >
      <CardHeader text={`${period} to Date`}>
        <FontAwesomeIcon
          className={widgetStyles.faIcon}
          icon={faGripVertical}
        />
      </CardHeader>
      <CardContent>
        {graphData ? (
          <>
            <PeriodSelector
              defaultChecked={graphLoaderData?.defaultDataSet}
              loadGraphData={loadGraphData}
              graphName='expense-pie'
            />
            <PieGraph graphData={graphData} slotProps={slotProps} />
          </>
        ) : (
          <CardContentVacant title='No Finance Data Available' />
        )}
      </CardContent>
    </Card>
  );
};

export default PieGraphWidget;
