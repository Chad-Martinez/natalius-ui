import {
  getExpenseDashboardData,
  paginatedExpenses,
} from '../services/expensesService';

export const paginatedExpenseLoader = async () => {
  try {
    const { data } = await paginatedExpenses(1, 10);
    return data;
  } catch (error) {
    console.error('Loader Error: Get Expenses ', error);
    return error;
  }
};

export const expenseDashboardLoader = async () => {
  try {
    const { data } = await getExpenseDashboardData();
    return data;
  } catch (error) {
    console.error('Loader Error: Get Averages ', error);
    return error;
  }
};
