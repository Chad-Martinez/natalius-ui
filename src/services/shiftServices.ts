import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IShift, IShiftBase } from '../interfaces/IShift.interface';

const endpoint = process.env.API_ENDPOINT;

export const getShiftsByGig = async (
  gigId: IShift['gigId']
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/shifts/gig/${gigId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios(config);
};

export const addShift = async (payload: IShiftBase): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/shifts`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};

export const updateShift = async (payload: IShift) => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/shifts`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};

export const deleteShift = async (payload: {
  shiftId: IShift['_id'];
  gigId: IShift['gigId'];
}): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    url: `${endpoint}/shifts`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return await axios(config);
};
