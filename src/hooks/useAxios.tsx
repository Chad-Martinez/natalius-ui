import axios from 'axios';
import { useContext } from 'react';
import useRefreshToken from './useRefreshToken';
import { AuthContext } from '../store/AuthContext';

const useAxios = () => {
  const { setIsAuth } = useContext(AuthContext);
  const { verifyRefreshToken } = useRefreshToken();

  const setupAxiosInterceptors = () => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          const accessToken = sessionStorage.getItem('at');
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const accessToken = await verifyRefreshToken();
          prevRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(prevRequest);
        }
        if (error.response?.status === 418) {
          console.error('Intercept Response Error: ', error);
          sessionStorage.removeItem('at');
          setIsAuth(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  };

  return { setupAxiosInterceptors };
};

export default useAxios;
