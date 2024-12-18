import { IShift } from './IShift.interface';

interface IAddress {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: number | null;
}

interface IContact {
  name?: string | null;
  phone?: string | null;
}

interface IDefaults {
  useDefaults: boolean;
  floorFee: number;
  pricePerDance: number;
  tips: number;
  other: number;
  milage: number;
  timezone: string;
}

export interface IClubBase {
  address: IAddress;
  contact: IContact;
  defaults: IDefaults;
  name: string;
  isArchived: boolean;
}

export interface IClub extends IClubBase {
  _id: string;
  fullAddress?: string;
  shifts?: IShift[];
}
