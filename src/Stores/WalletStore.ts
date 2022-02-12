import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { Wallet, WalletStatus } from "../Pages/Wallet/Wallet";

export const useWalletStore = create<State>((set, get) => ({
  id: -1,
  address: "",
  setAddress: (address) =>
    set(
      produce((state) => {
        state.address = address;
      })
    ),
  owner: "",
  setOwner: (owner) =>
    set(
      produce((state) => {
        state.owner = owner;
      })
    ),
  status: WalletStatus.UNAUTHORIZED,
  setStatus: (status) =>
    set(
      produce((state) => {
        state.status = status;
      })
    ),
  abbreviation: "",
  setAlias: (abbreviation) =>
    set(
      produce((state) => {
        state.abbreviation = abbreviation;
      })
    ),
  balance: 0,
  hydrate: (wallet) =>
    set(
      produce((state) => {
        state.id = wallet.id;
        state.address = wallet.address;
        state.owner = wallet.owner;
        state.status = wallet.status;
        state.balance = wallet.balance;
        state.abbreviation = wallet.abbreviation;
        state.lastUpdate = wallet.lastUpdate;
      })
    ),
  bakeWallet: () => ({
    id: get().id,
    address: get().address,
    owner: get().owner,
    status: get().status,
    balance: get().balance,
    abbreviation: get().abbreviation,
    lastUpdate: get().lastUpdate,
  }),
  addTokens: (amount) =>
    set(
      produce((state) => {
        state.balance = get().balance + amount;
      })
    ),
  deductTokens: (amount) =>
    set(
      produce((state) => {
        state.balance = get().balance - amount;
      })
    ),
  lastUpdate: "",
  setLastUpdate: (lastUpdate) =>
    set(
      produce((state) => {
        state.lastUpdate = lastUpdate;
      })
    ),
}));

type State = Wallet & {
  setAddress: (address: string) => void;
  setOwner: (owner: string) => void;
  setStatus: (status: WalletStatus) => void;
  setAlias: (abbreviation: string) => void;
  hydrate: (wallet: Wallet) => void;
  bakeWallet: () => Wallet;
  addTokens: (amount: number) => void;
  deductTokens: (amount: number) => void;
  setLastUpdate: (lastUpdate: string) => void;
};

if (process.env.REACT_APP_STAGE === undefined) {
  let root = document.createElement("div");
  root.id = "walletStore";
  document.body.appendChild(root);
  mountStoreDevtool("WalletStore", useWalletStore as any, root);
}
