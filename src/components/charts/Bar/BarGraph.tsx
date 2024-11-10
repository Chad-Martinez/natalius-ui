import { FC } from 'react';
import {
  AxisConfig,
  BarChart,
  BarChartSlotProps,
  ChartsXAxisProps,
  ScaleName,
  axisClasses,
} from '@mui/x-charts';
import { DataSet, BarSeriesKey } from '../../../types/GraphData';
import { generateGraphColors } from '../../../helpers/graph-helpers';

const BarGraph: FC<{
  graphData: DataSet[];
  slotProps?: BarChartSlotProps;
  xAxis: AxisConfig<ScaleName, string, ChartsXAxisProps>[];
  seriesKeys: {
    [key: string]: BarSeriesKey;
  };
}> = ({ graphData, slotProps, xAxis, seriesKeys }): JSX.Element => {
  const series: BarSeriesKey[] = [];

  for (const [key, value] of Object.entries(seriesKeys)) {
    graphData.forEach((dataPoint: DataSet) => {
      if (
        key === (dataPoint.type as string).toLowerCase() &&
        !series.some((item) => item.dataKey === key)
      ) {
        series.push(value);
      }
    });
  }

  return (
    <BarChart
      margin={{ top: 20 }}
      borderRadius={5}
      sx={() => ({
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: '#eeeeee',
            strokeWidth: 2,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: '#eeeeee',
          },
          [`.${axisClasses.label}`]: {
            fill: '#eeeeee',
            fontSize: '1rem',
          },
        },
      })}
      dataset={graphData}
      xAxis={xAxis}
      slotProps={slotProps}
      series={series}
      colors={generateGraphColors(series as { label: string }[])}
      height={300}
    />
  );
};

export default BarGraph;
