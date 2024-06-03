export interface IIncomeBase {
  gigId: string;
  shiftId?: string;
  date: string;
  amount: string;
  type: string;
}

export interface IIncome extends IIncomeBase {
  _id: string;
}
