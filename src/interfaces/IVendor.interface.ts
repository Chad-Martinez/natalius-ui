export interface IVendorBase {
  name: string;
  defaultType: string;
  distance?: number;
}

export interface IVendor extends IVendorBase {
  _id: string;
}
