import { AxiosResponse } from 'axios';
import axiosInstance from './axiosConfig';

export const refresh = async (): Promise<AxiosResponse> =>
  await axiosInstance.get('/tokens');
