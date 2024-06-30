import { getClubNames, getClubs } from '../services/clubsServices';

export const clubNamesLoader = async () => {
  try {
    const { data } = await getClubNames();
    return data;
  } catch (error) {
    console.error('Loader Error: Get ClubNames ', error);
    return error;
  }
};

export const clubsLoader = async () => {
  try {
    const { data } = await getClubs();
    return data;
  } catch (error) {
    console.error('Loader Error: Get Clubs ', error);
    return error;
  }
};
