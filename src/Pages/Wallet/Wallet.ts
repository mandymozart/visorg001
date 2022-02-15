export type Wallet = {
  id: number; // Sheety id for REST API
  address: string; // link to our database
  owner: string; // auth0 link to auth user
  status: WalletStatus;
  abbreviation: string; // vis abbreviation
  balance: number;
  artistName: string,
  name: string,
  street: string,
  zipCode: string,
  city: string,
  country: string,
  phoneNumber: string,
  email: string,
  createdDate: string;
  updatedDate: string;
};

export enum WalletStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  UNAUTHORIZED = "unauhorized",
}
