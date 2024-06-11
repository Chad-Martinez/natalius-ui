import { getUpcomingShifts } from '../services/dashboardServices';

export const dashboardLoader = async () => {
  try {
    const { data } = await getUpcomingShifts();
    return data;
  } catch (error) {
    console.error('Loader Error: Get Upcoming Shifts ', error);
    return error;
  }
};
