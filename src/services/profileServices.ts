import { AxiosResponse } from 'axios';
import axiosInstance from './axiosConfig';
import { Register } from '../types/auth-services-types';

export const getUserInfo = async (): Promise<AxiosResponse> =>
  await axiosInstance.get('/profiles');

export const updateUserInfo = async (payload: {
  stageName: Register['stageName'];
  email: Register['email'];
}): Promise<AxiosResponse> => await axiosInstance.put('/profiles', payload);

export const updatePassword = async (payload: {
  pw: string;
}): Promise<AxiosResponse> =>
  await axiosInstance.put('/profiles/auth', payload);
