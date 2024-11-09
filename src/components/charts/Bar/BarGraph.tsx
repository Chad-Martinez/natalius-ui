import { FC } from 'react';
import {
  AxisConfig,
  BarChart,
  BarChartSlotProps,
  BarSeriesType,
  ChartsXAxisProps,
  ScaleName,
  axisClasses,
} from '@mui/x-charts';
import { DataSet, BarSeriesKeys } from '../../../types/GraphData';

const BarGraph: FC<{
  graphData: DataSet[];
  slotProps?: BarChartSlotProps;
  xAxis: AxisConfig<ScaleName, string, ChartsXAxisProps>[];
  series: (BarSeriesKeys & BarSeriesType)[];
  colors?: string[];
}> = ({ graphData, slotProps, xAxis, series, colors }): JSX.Element => {
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
      colors={colors}
      height={300}
    />
  );
};

export default BarGraph;
