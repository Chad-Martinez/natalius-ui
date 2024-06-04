import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IExpenseBase } from '../interfaces/IExpense.interface';

const endpoint = process.env.API_ENDPOINT;

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
