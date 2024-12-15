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
  console.log('axios tokenServices config ', config);
  return await axiosInstance(config);
};
