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
import { DataSet, PieGraphData } from '../../types/GraphData';

const PieGraphWidget: FC<{
  graphLoaderData: PieGraphData;
}> = ({ graphLoaderData }): JSX.Element => {
  const [period, setPeriod] = useState<string>('Month');
  const [graphData, setGraphData] = useState<DataSet>([]);

  const handleSwitch = useCallback(
    (caseValue: string) => {
      const { month, quarter, year } = graphLoaderData;
      switch (caseValue) {
        case 'quarter':
          setPeriod('Quarter');
          setGraphData(quarter);
          break;
        case 'year':
          setPeriod('Year');
          setGraphData(year);
          break;
        default:
          setPeriod('Month');
          setGraphData(month);
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
        {graphData ? (
          <>
            <PeriodSelector
              defaultChecked={graphLoaderData?.defaultDataSet}
              loadGraphData={loadGraphData}
              hasWeek={false}
            />
            <PieGraph graphData={graphData} />
          </>
        ) : (
          <CardContentVacant title='No Finance Data Available' />
        )}
      </CardContent>
    </Card>
  );
};

export default PieGraphWidget;
