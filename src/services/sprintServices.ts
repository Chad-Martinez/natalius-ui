import { AxiosResponse } from 'axios';
import { ISprint, ISprintBase } from '../interfaces/ISprint.interface';
import axiosInstance from './axiosConfig';

export const getActiveSprint = async (): Promise<AxiosResponse> =>
  await axiosInstance.get('/sprints');

export const addSprint = async (payload: ISprintBase): Promise<AxiosResponse> =>
  await axiosInstance.post('/sprints', payload);

export const updateSprint = async (payload: ISprint): Promise<AxiosResponse> =>
  await axiosInstance.put('/sprints', payload);

export const markSprintComplete = async (
  payload: ISprint
): Promise<AxiosResponse> =>
  await axiosInstance.post('/sprints/complete-sprint', payload);

export const deleteSprint = async (_id: string): Promise<AxiosResponse> =>
  await axiosInstance.delete(`/sprints/${_id}`);
