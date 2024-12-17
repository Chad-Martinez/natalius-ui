import { AxiosResponse } from 'axios';
import axiosInstance from './axiosConfig';

export const getDashboardData = async (): Promise<AxiosResponse> =>
  await axiosInstance.get('/dashboard');
