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
  name:"",
  artistName:"",
  street:"",
  zipCode:"",
  city:"",
  country:"",
  phoneNumber:"",
  email:"",
  createdDate:"",
  updatedDate:"",
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
        state.name = wallet.name;
        state.artistName = wallet.artistName;
        state.street = wallet.street;
        state.zipCode = wallet.zipCode;
        state.city = wallet.city;
        state.country = wallet.country;
        state.phoneNumber = wallet.phoneNumber;
        state.email = wallet.email;
        state.createdDate = wallet.createdDate;
        state.updatedDate = wallet.updatedDate;
      })
    ),
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
