import { AxiosResponse } from 'axios';
import { IClub, IClubBase } from '../interfaces/IClub.interface';
import axiosInstance from './axiosConfig';

export const getClubs = async (): Promise<AxiosResponse> =>
  await axiosInstance.get('/clubs');

export const getClubNames = async (): Promise<AxiosResponse> =>
  await axiosInstance.get('/clubs/names');

export const addClub = async (payload: IClubBase): Promise<AxiosResponse> =>
  await axiosInstance.post('/clubs', payload);

export const updateClub = async (payload: IClub) =>
  await axiosInstance.put('/clubs', payload);
