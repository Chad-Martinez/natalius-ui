import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Shift } from '../types/Shift';

const endpoint = process.env.API_ENDPOINT;

export const addShift = async (payload: Shift): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/shifts`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};
