import { PieChart, PieChartSlotProps, pieArcLabelClasses } from '@mui/x-charts';
import { FC } from 'react';
import { DataSet } from '../../../types/GraphData';
import { generateGraphColors } from '../../../helpers/graph-helpers';

const PieGraph: FC<{
  graphData: DataSet[];
  slotProps?: PieChartSlotProps;
}> = ({ graphData, slotProps }): JSX.Element => {
  return (
    <PieChart
      slotProps={slotProps}
      colors={generateGraphColors(graphData as { id: string }[])}
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
