import { ActionFunction } from 'react-router-dom';
import { getClubNames } from '../services/clubsServices';
import { getShift } from '../services/shiftServices';

export const getShiftDetails: ActionFunction = async ({ params }) => {
  try {
    if (params.shiftId) {
      const { data: clubNames } = await getClubNames();
      const { data: shift } = await getShift(params.shiftId);
      return { clubNames, shift };
    }
  } catch (error) {
    console.error('Loader Error: Shift Details ', error);
    return error;
  }
};
