import { getGigNames, getGigs } from '../services/gigsServices';

export const gigNamesLoader = async () => {
  try {
    const { data } = await getGigNames();
    return data;
  } catch (error) {
    console.error('Loader Error: Get GigNames ', error);
    return error;
  }
};

export const gigsLoader = async () => {
  try {
    const { data } = await getGigs();
    return data;
  } catch (error) {
    console.error('Loader Error: Get Gigs ', error);
    return error;
  }
};
