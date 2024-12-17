import { AxiosResponse } from 'axios';
import { IShift, IShiftBase } from '../interfaces/IShift.interface';
import axiosInstance from './axiosConfig';

export const getShiftsByClub = async (
  clubId: IShift['clubId']
): Promise<AxiosResponse> => await axiosInstance.get(`/shifts/club/${clubId}`);

export const getShift = async (
  shiftId: IShift['_id']
): Promise<AxiosResponse> => await axiosInstance.get(`/shifts/${shiftId}`);

export const addShift = async (payload: IShiftBase): Promise<AxiosResponse> =>
  await axiosInstance.post('/shifts', payload);

export const updateShift = async (payload: IShift): Promise<AxiosResponse> =>
  await axiosInstance.put('/shifts', payload);

export const deleteShift = async (payload: {
  shiftId: IShift['_id'];
  clubId: IShift['clubId'];
}): Promise<AxiosResponse> =>
  await axiosInstance.delete('/shifts', { data: payload });

export const getShiftsToComplete = async (): Promise<AxiosResponse> =>
  await axiosInstance.get('/shifts/shifts-to-complete');
