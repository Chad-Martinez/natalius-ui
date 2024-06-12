import { getDashboardData } from '../services/dashboardServices';
import { getActiveSprint } from '../services/sprintServices';

export const dashboardLoader = async () => {
  try {
    const { data } = await getDashboardData();
    return data;
  } catch (error) {
    console.error('Loader Error: Get Upcoming Shifts ', error);
    return error;
  }
};

export const sprintLoader = async () => {
  try {
    const { data } = await getActiveSprint();
    return data;
  } catch (error) {
    console.error('Loader Error: Get Sprint Form Data ', error);
    return error;
  }
};
