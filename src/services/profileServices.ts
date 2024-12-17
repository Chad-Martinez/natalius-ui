import { AxiosResponse } from 'axios';
import axiosInstance from './axiosConfig';

export const getUserInfo = async (): Promise<AxiosResponse> =>
  await axiosInstance.get('/profiles');

export const updateUserInfo = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
}): Promise<AxiosResponse> => await axiosInstance.put('/profiles', payload);

export const updatePassword = async (payload: {
  pw: string;
}): Promise<AxiosResponse> =>
  await axiosInstance.put('/profiles/auth', payload);
