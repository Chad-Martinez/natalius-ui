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
import { DataSet, GraphData, BarSeriesKey } from '../../types/GraphData';
import {
  AxisConfig,
  BarChartSlotProps,
  ChartsXAxisProps,
  ScaleName,
} from '@mui/x-charts';

const BarGraphWidget: FC<{
  graphLoaderData: GraphData | undefined;
  defaultSet: string;
  slotProps?: BarChartSlotProps;
  xAxis: AxisConfig<ScaleName, string, ChartsXAxisProps>[];
  seriesKeys:
    | {
        [key: string]: BarSeriesKey;
      }
    | BarSeriesKey[];
}> = ({
  graphLoaderData,
  defaultSet,
  slotProps,
  xAxis,
  seriesKeys,
}): JSX.Element => {
  const [period, setPeriod] = useState<string>('Week');
  const [graphData, setGraphData] = useState<DataSet[]>([]);

  const handleSwitch = useCallback(
    (period: string | null) => {
      if (!period) return;
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
      <CardHeader text={!defaultSet ? 'Income Graph' : `${period} to Date}`}>
        <FontAwesomeIcon
          className={widgetStyles.faIcon}
          icon={faGripVertical}
        />
      </CardHeader>
      <CardContent>
        {defaultSet ? (
          <>
            <PeriodSelector
              defaultChecked={defaultSet}
              loadGraphData={loadGraphData}
              graphName='expense-bar'
            />
            <BarGraph
              graphData={graphData}
              slotProps={slotProps}
              xAxis={xAxis}
              seriesKeys={seriesKeys}
            />
          </>
        ) : (
          <CardContentVacant title='No Finance Data Available' />
        )}
      </CardContent>
    </Card>
  );
};

export default BarGraphWidget;
