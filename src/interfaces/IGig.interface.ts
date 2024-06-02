import { Shift } from '../types/Shift';

export interface IGigBase {
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
  name: string;
  isArchived: boolean;
}

export interface IGig extends IGigBase {
  _id: string;
  fullAddress?: string;
  shifts?: Shift[];
}
