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

export interface IShiftImage {
  display_name: string;
  format: string;
  public_id: string;
  url: string;
}

export interface IShiftBase {
  clubId: string;
  start: string;
  end: string;
  timezone: string;
  notes?: string;
  shiftComplete?: boolean;
  expenses?: IShiftExpenses;
  income?: IShiftIncome;
  image?: IShiftImage | undefined;
  milage?: number;
}

export interface IShift extends IShiftBase {
  _id: string;
  club?: string;
}
