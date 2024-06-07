import { paginatedExpenses } from '../services/expensesService';

export const paginatedExpenseLoader = async () => {
  try {
    const { data } = await paginatedExpenses(1, 10);
    return data;
  } catch (error) {
    console.error('Loader Error: Get Vendors ', error);
    return error;
  }
};
