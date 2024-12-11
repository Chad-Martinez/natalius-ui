import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IShift, IShiftImage } from '../interfaces/IShift.interface';

const endpoint = process.env.API_ENDPOINT;

export const addImage = async (payload: FormData): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/images`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: payload,
  };
  return await axios(config);
};

export const deleteImage = async (payload: {
  shiftId: IShift['_id'];
  public_id: IShiftImage['public_id'];
}): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/images`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};
