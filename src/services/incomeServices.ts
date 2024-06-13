import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IIncome, IIncomeBase } from '../interfaces/IIncome.interface';

const endpoint = process.env.API_ENDPOINT;

export const paginatedIncome = async (
  page: number,
  limit: number
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/income/paginate?page=${page}&limit=${limit}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};

export const getIncomeDashboardData = async () => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/income/dashboard`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};

export const addIncome = async (
  payload: IIncomeBase
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/income`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};

export const updateIncome = async (
  payload: IIncome
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/income`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};

export const deleteIncome = async (_id: string): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/income/${_id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};