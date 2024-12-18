export interface IExpenseBase {
  vendorId: string;
  date: string;
  amount: number;
  type: string;
  milage: number;
  notes?: string;
}

export interface IExpense extends IExpenseBase {
  _id: string;
  vendor?: string;
}
