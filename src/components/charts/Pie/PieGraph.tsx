import { PieChart, PieChartSlotProps, pieArcLabelClasses } from '@mui/x-charts';
import { FC } from 'react';
import { DataSet } from '../../../types/GraphData';

const PieGraph: FC<{
  graphData: DataSet[];
  slotProps?: PieChartSlotProps;
  colors?: string[];
  generateColors: (graphSet: DataSet[]) => string[];
}> = ({ graphData, slotProps, generateColors }): JSX.Element => {
  const col: string[] = generateColors(graphData);
  return (
    <PieChart
      slotProps={slotProps}
      colors={col}
      series={[
        {
          arcLabel: (item) => `$${item.value}`,
          arcLabelMinAngle: 60,
          data: graphData as { label: string; value: number }[],
        },
      ]}
      margin={{ top: 10, bottom: 50, left: 0, right: 0 }}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: '1rem',
        },
      }}
      height={300}
    />
  );
};

export default PieGraph;
