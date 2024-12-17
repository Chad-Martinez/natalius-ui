import { AxiosResponse } from 'axios';
import { IExpense, IExpenseBase } from '../interfaces/IExpense.interface';
import axiosInstance from './axiosConfig';

export const paginatedExpenses = async (
  page: number,
  limit: number
): Promise<AxiosResponse> =>
  await axiosInstance.get(`/expenses/paginate?page=${page}&limit=${limit}`);

export const getExpenseDashboardData = async () =>
  await axiosInstance.get('/expenses/dashboard');

export const addExpense = async (
  payload: IExpenseBase
): Promise<AxiosResponse> => await axiosInstance.post('/expenses', payload);

export const updateExpense = async (
  payload: IExpense
): Promise<AxiosResponse> => await axiosInstance.put('/expenses', payload);

export const deleteExpense = async (_id: string): Promise<AxiosResponse> =>
  await axiosInstance.delete(`/expenses/${_id}`);
