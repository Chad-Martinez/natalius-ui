import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ISprint, ISprintBase } from '../interfaces/ISprint.interface';

const endpoint = process.env.API_ENDPOINT;

export const getActiveSprint = async (): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/sprints`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};

export const addSprint = async (
  payload: ISprintBase
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/sprints`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};

export const updateSprint = async (
  payload: ISprint
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/sprints`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};

export const markSprintComplete = async (
  payload: ISprint
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/sprints/complete-sprint`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};

export const deleteSprint = async (_id: string): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/sprints/${_id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};
