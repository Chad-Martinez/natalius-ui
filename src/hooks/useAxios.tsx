import { useContext } from 'react';
import useRefreshToken from './useRefreshToken';
import { AuthContext } from '../store/AuthContext';
import axiosInstance from '../services/axiosConfig';
import IAxiosErrorResponse from '../interfaces/IAxiosErrorResponse';

const useAxios = () => {
  const { setIsAuth } = useContext(AuthContext);
  const { verifyRefreshToken } = useRefreshToken();

  const setupAxiosInterceptors = () => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          const accessToken = sessionStorage.getItem('at');
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest: IAxiosErrorResponse = error?.config;
        if (error.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const accessToken = await verifyRefreshToken();
          prevRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(prevRequest);
        }
        if (error.response?.status === 418) {
          sessionStorage.removeItem('at');
          setIsAuth(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  };

  return { setupAxiosInterceptors };
};

export default useAxios;
