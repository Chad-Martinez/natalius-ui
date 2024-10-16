import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IExpense, IExpenseBase } from '../interfaces/IExpense.interface';

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

export const getExpenseDashboardData = async () => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/expenses/dashboard`,
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

export const updateExpense = async (
  payload: IExpense
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/expenses`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};

export const deleteExpense = async (_id: string): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/expenses/${_id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};
