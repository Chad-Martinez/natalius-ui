export interface IShiftExpenses {
  floorFee: number;
  dances: {
    numOfDances: number;
    pricePerDance: number;
    danceFeeTotal: number;
  };
  tips: number;
  other: number;
  totalShiftExpenses: number;
  type: string;
}

export interface IShiftIncome {
  amount: number;
  type: string;
}

export interface IShiftBase {
  clubId: string;
  start: string;
  end: string;
  notes?: string;
  shiftComplete?: boolean;
  expenses?: IShiftExpenses;
  income?: IShiftIncome;
  milage?: number;
}

export interface IShift extends IShiftBase {
  _id: string;
  club: string;
}
