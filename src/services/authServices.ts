import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  Login,
  PasswordResetEmail,
  Register,
  VerifyEmail,
  ResetPassword,
} from '../types/auth-services-types';

const endpoint = process.env.API_ENDPOINT;

export const register = async ({
  axiosInstance,
  payload,
}: Register): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/register`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axiosInstance(config);
};

export const login = async ({
  axiosInstance,
  payload,
}: Login): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/login`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axiosInstance(config);
};

export const verifyEmail = async ({
  axiosInstance,
  token,
}: VerifyEmail): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/verify/${token}`,
    method: 'GET',
  };
  return await axiosInstance(config);
};

export const passwordResetEmail = async ({
  axiosInstance,
  payload,
}: PasswordResetEmail): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/password-reset-email`,
    method: 'POST',
    data: payload,
  };
  return await axiosInstance(config);
};

export const resetPassword = async ({
  axiosInstance,
  payload,
}: ResetPassword): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/reset-password`,
    method: 'POST',
    data: payload,
  };
  return await axiosInstance(config);
};

export const logout = async (
  axiosInstance: AxiosInstance
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/logout`,
    method: 'GET',
  };
  return await axiosInstance(config);
};

export default {
  register,
  login,
  verifyEmail,
  passwordResetEmail,
  resetPassword,
  logout,
};
