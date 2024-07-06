import { FC } from 'react';
import { BarChart, axisClasses } from '@mui/x-charts';

type BarGraphProps = {
  graphData: {
    label: string;
    total: number;
  }[];
};

const BarGraph: FC<BarGraphProps> = ({ graphData }): JSX.Element => {
  const valueFormatter = (value: number | null) => `$${value}`;

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
      xAxis={[{ scaleType: 'band', dataKey: 'label', tickPlacement: 'middle' }]}
      series={[
        {
          dataKey: 'total',
          valueFormatter,
          id: 'income_id',
        },
      ]}
      height={300}
      colors={['#eeeeee']}
    />
  );
};

export default BarGraph;
