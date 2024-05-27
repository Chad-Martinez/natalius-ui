import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const endpoint = process.env.API_ENDPOINT;

export const addIncome = async (payload: {
  gigId: string;
  date: string;
  amount: string;
  type: string;
}): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/income`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};
