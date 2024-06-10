import { IShift } from './IShift.interface';

export interface IIncomeBase {
  gigId: string;
  shiftId?: string;
  date: string;
  amount: number;
  type: string;
}

export interface IIncome extends IIncomeBase {
  _id: string;
  gig?: string;
  shiftDetails?: IShift[];
}
