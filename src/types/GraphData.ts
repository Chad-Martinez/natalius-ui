export type DataSet = {
  label: string;
  value: number;
}[];

export type BarGraphData = {
  week: DataSet;
  month: DataSet;
  quarter: DataSet;
  year: DataSet;
  defaultDataSet: string;
};

export type PieGraphData = {
  month: DataSet;
  quarter: DataSet;
  year: DataSet;
  defaultDataSet: string;
};
