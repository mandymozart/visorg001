import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { Wallet, WalletStatus } from "../Pages/Wallet/Wallet";

export const useWalletStore = create<State>((set, get) => ({
  id: -1,
  address: "",
  owner: "",
  status: WalletStatus.UNAUTHORIZED,
  abbreviation: "",
  balance: 0,
  hydrate: (wallet) =>
    set(
      produce((state) => {
        state.id = wallet.id;
        state.address = wallet.address;
        state.owner = wallet.owner;
        state.balance = wallet.balance;
        state.abbreviation = wallet.abbreviation;
        state.createdDate = wallet.createdDate;
        state.updatedDate = wallet.updatedDate;
        state.status = wallet.status;
      })
    ),
  createdDate: "",
  updatedDate: "",
}));

type State = Wallet & {
  hydrate: (wallet: Wallet) => void;
};

if (process.env.REACT_APP_STAGE === undefined) {
  let root = document.createElement("div");
  root.id = "walletStore";
  document.body.appendChild(root);
  mountStoreDevtool("WalletStore", useWalletStore as any, root);
}
