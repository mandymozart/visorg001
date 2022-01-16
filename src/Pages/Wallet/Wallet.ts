export type Wallet = {
  address: string; // link to our database
  owner: string; // auth0 link to auth user
  status: WalletStatus;
  alias: string;
  tokens: number;
  lastUpdate: string;
};

export enum WalletStatus {
  ACTIVATE = "active",
  SUSPENDED = "suspended",
  UNAUTHORIZED = "suspended",
}
