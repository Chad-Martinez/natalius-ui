export type DataSet = {
  [key: string]: string | number;
};

export type GraphData = {
  week: DataSet[];
  month: DataSet[];
  quarter: DataSet[];
  year: DataSet[];
  defaultDataSet: string;
};

export type BarSeriesKey = {
  [key: string]: string | ((v: number) => string);
};
