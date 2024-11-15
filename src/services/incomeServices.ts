import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const endpoint = process.env.API_ENDPOINT;

export const paginatedIncome = async (
  page: number,
  limit: number
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/income/paginate?page=${page}&limit=${limit}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};

export const getIncomeDashboardData = async () => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/income/dashboard`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};
