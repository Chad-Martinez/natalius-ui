import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const endpoint = process.env.API_ENDPOINT;

export const getGigs = async (): Promise<AxiosResponse> => {
  console.log('gig service firing');
  const config: AxiosRequestConfig = {
    url: `${endpoint}/gigs`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};
