import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const endpoint = process.env.API_ENDPOINT;

export const register = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/register`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};

export const login = async (payload: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/login`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};

export const verifyEmail = async (token: string): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/verify/${token}`,
    method: 'GET',
  };
  return await axios(config);
};

export const passwordResetEmail = async (payload: {
  email: string;
}): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/password-reset-email`,
    method: 'POST',
    data: payload,
  };
  return await axios(config);
};

export const resetPassword = async (payload: {
  token: string;
  password: string;
}): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/reset-password`,
    method: 'POST',
    data: payload,
  };
  return await axios(config);
};

export const logout = async (): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/auth/logout`,
    method: 'GET',
  };
  return await axios(config);
};

export default {
  register,
  login,
  verifyEmail,
  passwordResetEmail,
  resetPassword,
  logout,
};
