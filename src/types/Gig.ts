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
  fullAddress: string;
  shifts: Shift[];
  distance: number;
  name: string;
  _id: string;
};

export type GigName = {
  _id: Gig['_id'];
  name: Gig['name'];
};

export type AddGig = {
  name: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: number;
  };
  contact?: {
    name?: string;
    phone?: string;
  };
  distance?: number;
};