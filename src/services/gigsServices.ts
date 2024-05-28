import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AddGig } from '../types/Gig';

const endpoint = process.env.API_ENDPOINT;

export const getGigs = async (): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/gigs`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};

export const getGigNames = async (): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/gigs/names`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};

export const addGig = async (payload: AddGig): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/gigs`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};