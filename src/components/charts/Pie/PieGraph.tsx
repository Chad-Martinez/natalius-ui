import { PieChart, pieArcLabelClasses } from '@mui/x-charts';
import { FC } from 'react';
import { DataSet } from '../../../types/GraphData';

const PieGraph: FC<{ graphData: DataSet }> = ({ graphData }): JSX.Element => {
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) =>
            `${item.label ? item.label[0] : ''} - $${item.value}`,
          arcLabelMinAngle: 60,
          data: graphData,
        },
      ]}
      margin={{ top: 10, bottom: 50, left: 0, right: 0 }}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          padding: 2,
          labelStyle: {
            fontSize: 15,
            fill: '#eeeeee',
          },
        },
      }}
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
