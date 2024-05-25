import { Shift } from './Shift';

export type Gig = {
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
  };
  contact: {
    name: string;
    phone: string;
  };
  shifts: Shift[];
  distance: number;
  name: string;
  _id: string;
};
