import axios from 'axios';

const API_ENDPOINT = process.env.API_ENDPOINT;

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
});

export default axiosInstance;
