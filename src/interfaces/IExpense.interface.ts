export interface IExpenseBase {
  vendorId: string;
  date: string;
  amount: number;
  type: string;
  distance?: number;
}

export interface IExpense extends IExpenseBase {
  _id: string;
}
