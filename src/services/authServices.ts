import { AxiosResponse } from 'axios';
import {
  Login,
  PasswordResetEmail,
  Register,
  VerifyEmail,
  ResetPassword,
} from '../types/auth-services-types';
import axiosInstance from './axiosConfig';

export const register = async (payload: Register): Promise<AxiosResponse> =>
  await axiosInstance.post('/auth/register', payload);

export const login = async (payload: Login): Promise<AxiosResponse> =>
  await axiosInstance.post('/auth/login', payload);

export const verifyEmail = async (token: VerifyEmail): Promise<AxiosResponse> =>
  await axiosInstance.get(`/auth/verify/${token}`);

export const passwordResetEmail = async (
  payload: PasswordResetEmail
): Promise<AxiosResponse> =>
  await axiosInstance.post('/auth/password-reset-email', payload);

export const resetPassword = async (
  payload: ResetPassword
): Promise<AxiosResponse> =>
  await axiosInstance.post('/auth/reset-password', payload);

export const logout = async (): Promise<AxiosResponse> =>
  await axiosInstance.get('/auth/logout');

export default {
  register,
  login,
  verifyEmail,
  passwordResetEmail,
  resetPassword,
  logout,
};
