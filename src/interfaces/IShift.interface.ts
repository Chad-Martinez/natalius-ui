export interface IShiftBase {
  clubId: string;
  start: string;
  end: string;
  notes?: string;
  incomeReported: boolean;
}

export interface IShift extends IShiftBase {
  _id: string;
}
