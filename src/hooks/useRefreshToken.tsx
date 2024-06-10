import { useCallback } from 'react';
import { refresh } from '../services/tokenServices';
import axios from 'axios';

axios.defaults.withCredentials = true;

const useRefreshToken = () => {
  const verifyRefreshToken = useCallback(async () => {
    const { data } = await refresh();
    const { accessToken } = data;
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    sessionStorage.setItem('at', accessToken);
    return accessToken;
  }, []);
  return { verifyRefreshToken };
};

export default useRefreshToken;
