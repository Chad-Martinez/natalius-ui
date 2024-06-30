import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IClub, IClubBase } from '../interfaces/IClub.interface';

const endpoint = process.env.API_ENDPOINT;

export const getClubs = async (): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/clubs`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};

export const getClubNames = async (): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/clubs/names`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};

export const addClub = async (payload: IClubBase): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/clubs`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};

export const updateClub = async (payload: IClub) => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/clubs`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};
