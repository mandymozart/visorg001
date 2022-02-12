export type Wallet = {
  id: number; // Sheety id for REST API
  address: string; // link to our database
  owner: string; // auth0 link to auth user
  status: WalletStatus;
  abbreviation: string; // vis abbreviation
  balance: number;
  lastUpdate: string;
};

export enum WalletStatus {
  ACTIVATE = "active",
  SUSPENDED = "suspended",
  UNAUTHORIZED = "unauhorized",
}
