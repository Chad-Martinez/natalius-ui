import { useCallback } from 'react';
import { refresh } from '../services/tokenServices';
import axiosInstance from '../services/axiosConfig';

const useRefreshToken = () => {
  const verifyRefreshToken = useCallback(async () => {
    try {
      const { data } = await refresh();
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
  }, []);
  return { verifyRefreshToken };
};

export default useRefreshToken;
