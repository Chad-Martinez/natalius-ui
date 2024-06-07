import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IExpenseBase } from '../interfaces/IExpense.interface';

const endpoint = process.env.API_ENDPOINT;

export const paginatedExpenses = async (
  page: number,
  limit: number
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/expenses/paginate?page=${page}&limit=${limit}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};

export const addExpense = async (
  payload: IExpenseBase
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/expenses`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};
