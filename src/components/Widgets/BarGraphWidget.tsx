import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import widgetStyles from './Widget.module.css';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardContent from '../ui/Card/CardContent';
import CardContentVacant from '../ui/Card/CardContentVacant';
import BarGraph from '../charts/Bar/BarGraph';
import PeriodSelector from '../charts/PeriodSelector/PeriodSelector';
import { DataSet, BarGraphData } from '../../types/GraphData';

const BarGraphWidget: FC<{ graphLoaderData: BarGraphData }> = ({
  graphLoaderData,
}): JSX.Element => {
  const [period, setPeriod] = useState<string>('Week');
  const [graphData, setGraphData] = useState<DataSet>([]);

  const handleSwitch = useCallback(
    (caseValue: string) => {
      const { week, month, quarter, year } = graphLoaderData;
      switch (caseValue) {
        case 'month':
          setPeriod('Month');
          setGraphData(month);
          break;
        case 'quarter':
          setPeriod('Quarter');
          setGraphData(quarter);
          break;
        case 'year':
          setPeriod('Year');
          setGraphData(year);
          break;
        default:
          setPeriod('Week');
          setGraphData(week);
          break;
      }
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
        {graphData && graphData.length > 0 ? (
          <>
            <PeriodSelector
              defaultChecked={graphLoaderData?.defaultDataSet}
              loadGraphData={loadGraphData}
            />
            <BarGraph graphData={graphData} />
          </>
        ) : (
          <CardContentVacant title='No Finance Data Available' />
        )}
      </CardContent>
    </Card>
  );
};

export default BarGraphWidget;
