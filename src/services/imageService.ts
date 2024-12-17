import { AxiosResponse } from 'axios';
import { IShift, IShiftImage } from '../interfaces/IShift.interface';
import axiosInstance from './axiosConfig';

export const addImage = async (payload: FormData): Promise<AxiosResponse> =>
  await axiosInstance.post('/images', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const deleteImage = async (payload: {
  shiftId: IShift['_id'];
  public_id: IShiftImage['public_id'];
}): Promise<AxiosResponse> =>
  await axiosInstance.delete('/images', { data: payload });
