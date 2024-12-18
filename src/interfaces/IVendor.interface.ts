export interface IVendorBase {
  name: string;
  defaultType: string;
  milage: number;
  useDefaults: boolean;
  notes?: string;
}

export interface IVendor extends IVendorBase {
  _id: string;
}
