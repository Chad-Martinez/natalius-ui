import { IShift } from './IShift.interface';

export interface IIncomeBase {
  clubId: string;
  shiftId?: string;
  date: string;
  amount: number;
  type: string;
}

export interface IIncome extends IIncomeBase {
  _id: string;
  club?: string;
  shiftDetails?: IShift[];
}
