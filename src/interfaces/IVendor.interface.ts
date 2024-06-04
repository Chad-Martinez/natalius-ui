export interface IVendorBase {
  name: string;
  defaultType: string;
  distance?: number;
  notes?: string;
}

export interface IVendor extends IVendorBase {
  _id: string;
}
