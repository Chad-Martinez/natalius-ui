import {
  getIncomeDashboardData,
  paginatedIncome,
} from '../services/incomeServices';

export const paginatedIncomeLoader = async () => {
  try {
    const { data } = await paginatedIncome(1, 10);
    return data;
  } catch (error) {
    console.error('Loader Error: Get Income ', error);
    return error;
  }
};

export const incomeDashboardLoader = async () => {
  try {
    const { data } = await getIncomeDashboardData();
    return data;
  } catch (error) {
    console.error('Loader Error: Get Averages ', error);
    return error;
  }
};
