export const generateGraphColors = (dataSet: { label: string }[]): string[] => {
  console.log('graph set ', dataSet);
  return dataSet.map((dataPoint: { label: string }) => {
    if (dataPoint.label === 'SERVICE') {
      return '#FF9966';
    } else if (dataPoint.label === 'MISC') {
      return '#2BDA66';
    } else if (dataPoint.label === 'EQUIPMENT') {
      return '#FF6666';
    } else if (dataPoint.label === 'SHIFT') {
      return '#9966FF';
    }
  }) as string[];
};
