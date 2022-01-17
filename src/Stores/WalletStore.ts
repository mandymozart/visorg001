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
  alias: "",
  setAlias: (alias) =>
    set(
      produce((state) => {
        state.alias = alias;
      })
    ),
  tokens: 0,
  hydrate: (wallet) =>
    set(
      produce((state) => {
        state.id = wallet.id;
        state.address = wallet.address;
        state.owner = wallet.owner;
        state.status = wallet.status;
        state.tokens = wallet.tokens;
        state.alias = wallet.alias;
        state.lastUpdate = wallet.lastUpdate;
      })
    ),
  bake: () => ({
    id: get().id,
    address: get().address,
    owner: get().owner,
    status: get().status,
    tokens: get().tokens,
    alias: get().alias,
    lastUpdate: get().lastUpdate,
  }),
  addTokens: (tokens) =>
    set(
      produce((state) => {
        state.tokens = get().tokens + tokens;
      })
    ),
  deductTokens: (tokens) =>
    set(
      produce((state) => {
        state.tokens = get().tokens - tokens;
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
  setAlias: (alias: string) => void;
  hydrate: (wallet: Wallet) => void;
  bake: () => Wallet;
  addTokens: (tokens: number) => void;
  deductTokens: (tokens: number) => void;
  setLastUpdate: (lastUpdate: string) => void;
};

if (process.env.REACT_APP_STAGE === undefined) {
  let root = document.createElement("div");
  root.id = "walletStore";
  document.body.appendChild(root);
  mountStoreDevtool("WalletStore", useWalletStore as any, root);
}
