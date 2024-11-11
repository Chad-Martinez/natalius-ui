export const generateGraphColors = (dataSet: { id: string }[]): string[] =>
  dataSet.map((dataPoint) => {
    if (dataPoint.id === 'service_id') {
      return '#FF9966';
    } else if (dataPoint.id === 'misc_id') {
      return '#2BDA66';
    } else if (dataPoint.id === 'equipment_id') {
      return '#FF6666';
    } else if (dataPoint.id === 'shift_id') {
      return '#9966FF';
    } else if (dataPoint.id === 'income_id') {
      return '#eeeeee';
    }
  }) as string[];
