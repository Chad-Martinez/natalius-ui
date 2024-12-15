import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const endpoint = process.env.API_ENDPOINT;

export const refresh = async (
  axiosInstance: AxiosInstance
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/tokens`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axiosInstance(config);
};
