export interface IShiftBase {
  gigId: string;
  start: string;
  end: string;
  notes?: string;
}

export interface IShift extends IShiftBase {
  _id: string;
}
