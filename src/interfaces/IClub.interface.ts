import { IShift } from './IShift.interface';

export interface IClubBase {
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

export interface IClub extends IClubBase {
  _id: string;
  fullAddress?: string;
  shifts?: IShift[];
}
