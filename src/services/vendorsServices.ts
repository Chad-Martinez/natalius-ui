import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IVendorBase } from '../interfaces/IVendor.interface';

const endpoint = process.env.API_ENDPOINT;

export const getVendors = async () => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/vendors`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};

export const addVendor = async (
  payload: IVendorBase
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/vendors`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};
