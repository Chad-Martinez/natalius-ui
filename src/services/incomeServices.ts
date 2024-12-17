import { AxiosResponse } from 'axios';
import axiosInstance from './axiosConfig';

export const paginatedIncome = async (
  page: number,
  limit: number
): Promise<AxiosResponse> =>
  await axiosInstance.get(`/income/paginate?page=${page}&limit=${limit}`);

export const getIncomeDashboardData = async () =>
  await axiosInstance.get('/income/dashboard');
