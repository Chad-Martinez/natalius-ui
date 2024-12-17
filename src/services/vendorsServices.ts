import { AxiosResponse } from 'axios';
import { IVendorBase } from '../interfaces/IVendor.interface';
import axiosInstance from './axiosConfig';

export const getVendors = async () => await axiosInstance.get('/vendors');

export const addVendor = async (payload: IVendorBase): Promise<AxiosResponse> =>
  await axiosInstance.post('/vendors', payload);
