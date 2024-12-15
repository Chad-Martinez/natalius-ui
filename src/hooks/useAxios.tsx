import axios, { AxiosInstance } from 'axios';
import { useCallback, useContext, useMemo } from 'react';
import useRefreshToken from './useRefreshToken';
import { AuthContext } from '../store/AuthContext';
import authServices from '../services/authServices';
import {
  Register,
  Login,
  VerifyEmail,
  PasswordResetEmail,
  ResetPassword,
} from '../types/auth-services-types';

const useAxios = () => {
  const { setIsAuth } = useContext(AuthContext);
  const { verifyRefreshToken } = useRefreshToken();

  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: process.env.API_ENDPOINT,
      withCredentials: true,
    });
  }, []);

  console.log('api endpoint ', process.env.API_ENDPOINT);

  const setupAxiosInterceptors = useCallback(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers?.Authorization) {
          const accessToken = sessionStorage.getItem('at');
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }

        // if (!config.headers.Authorization) {
        //   const accessToken = sessionStorage.getItem('at');
        //   config.headers.Authorization = `Bearer ${accessToken}`;
        // }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error.response?.status === 403 &&
          !prevRequest?.sent &&
          !prevRequest.url?.includes('refresh')
        ) {
          // Prevent refresh endpoint from triggering refresh
          prevRequest.sent = true;
          try {
            const accessToken = await verifyRefreshToken(axiosInstance);
            if (!accessToken) {
              throw new Error('No token received');
            }
            prevRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosInstance(prevRequest);
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            sessionStorage.removeItem('at');
            setIsAuth(false);
            return Promise.reject(refreshError);
          }
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
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance, setIsAuth, verifyRefreshToken]);

  const boundAuthServices = {
    register: (register: Register) => authServices.register(register),
    login: (login: Login) => authServices.login(login),
    verifyEmail: (verifyEmail: VerifyEmail) =>
      authServices.verifyEmail(verifyEmail),
    passwordResetEmail: (passwordResetEmail: PasswordResetEmail) =>
      authServices.passwordResetEmail(passwordResetEmail),
    resetPassword: (resetPassword: ResetPassword) =>
      authServices.resetPassword(resetPassword),
    logout: (axiosInstance: AxiosInstance) =>
      authServices.logout(axiosInstance),
  };

  return { setupAxiosInterceptors, axiosInstance, boundAuthServices };

  // const setupAxiosInterceptors = () => {
  //   const requestInterceptor = axios.interceptors.request.use(
  //     (config) => {
  //       if (!config.headers.Authorization) {
  //         const accessToken = sessionStorage.getItem('at');
  //         config.headers.Authorization = `Bearer ${accessToken}`;
  //       }
  //       return config;
  //     },
  //     (error) => Promise.reject(error)
  //   );

  //   const responseInterceptor = axios.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       const prevRequest = error?.config;
  //       if (error.response?.status === 403 && !prevRequest?.sent) {
  //         prevRequest.sent = true;
  //         const accessToken = await verifyRefreshToken();
  //         prevRequest.headers.Authorization = `Bearer ${accessToken}`;
  //         return axios(prevRequest);
  //       }
  //       if (error.response?.status === 418) {
  //         console.error('Intercept Response Error: ', error);
  //         sessionStorage.removeItem('at');
  //         setIsAuth(false);
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     axios.interceptors.request.eject(requestInterceptor);
  //     axios.interceptors.response.eject(responseInterceptor);
  //   };
  // };

  // return { setupAxiosInterceptors };
};

export default useAxios;
