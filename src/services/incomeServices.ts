import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IIncomeBase } from '../interfaces/IIncome.interface';

const endpoint = process.env.API_ENDPOINT;

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
