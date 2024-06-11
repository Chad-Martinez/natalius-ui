import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const endpoint = process.env.API_ENDPOINT;

export const getUpcomingShifts = async (): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/dashboard/upcoming-shifts`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};
