export interface ISprintBase {
  start: string;
  goal: number;
}

export interface ISprint extends ISprintBase {
  _id: string;
  end?: string;
  incomes?: string[];
  progress?: number;
  isCompleted?: boolean;
}
