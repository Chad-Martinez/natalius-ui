import { useCallback } from 'react';
import { refresh } from '../services/tokenServices';
import axios, { AxiosInstance } from 'axios';

// axios.defaults.withCredentials = true;

const useRefreshToken = () => {
  const verifyRefreshToken = useCallback(
    async (axiosInstance: AxiosInstance) => {
      try {
        const { data } = await refresh(axiosInstance);
        const { accessToken } = data;
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        sessionStorage.setItem('at', accessToken);
        return accessToken;
      } catch (error) {
        console.error('Error refreshing token:', error);
        throw new Error('Failed to refresh token');
      }
    },
    []
  );
  return { verifyRefreshToken };
};

export default useRefreshToken;
