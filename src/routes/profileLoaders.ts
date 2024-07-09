import { getUserInfo } from '../services/profileServices';

export const profileLoader = async () => {
  try {
    const { data } = await getUserInfo();
    return data;
  } catch (error) {
    console.error('Loader Error: Get UserInfo ', error);
    return error;
  }
};
