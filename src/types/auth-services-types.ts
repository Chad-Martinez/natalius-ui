import { AxiosInstance } from 'axios';

export type Register = {
  axiosInstance: AxiosInstance;
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
};

export type Login = {
  axiosInstance: AxiosInstance;
  payload: {
    email: string;
    password: string;
  };
};

export type VerifyEmail = {
  axiosInstance: AxiosInstance;
  token: string;
};

export type PasswordResetEmail = {
  axiosInstance: AxiosInstance;
  payload: {
    email: string;
  };
};

export type ResetPassword = {
  axiosInstance: AxiosInstance;
  payload: {
    token: string;
    password: string;
  };
};
