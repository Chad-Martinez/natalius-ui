import { getVendors } from '../services/vendorsServices';

export const vendorsLoader = async () => {
  try {
    const { data } = await getVendors();
    return data;
  } catch (error) {
    console.error('Loader Error: Get Vendors ', error);
    return error;
  }
};
