export interface IExpenseBase {
  vendorId: string;
  date: string;
  amount: number;
  type: string;
  notes?: string;
}

export interface IExpense extends IExpenseBase {
  _id: string;
}
