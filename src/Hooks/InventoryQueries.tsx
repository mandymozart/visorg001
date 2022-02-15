import { useMutation, useQuery } from "react-query";
import {
  AddTransactionParams,
  AddWalletParams,
  BalanceUpdateParams,
  fetchBenefactorTransactions,
  fetchBeneficiaryTransactions,
  fetchEvents,
  fetchProduct,
  fetchProducts,
  fetchReservationsByRenter,
  fetchReservationsForProduct,
  fetchWallet,
  fetchWalletForOwner,
  fetchWallets,
  postAddTransaction,
  postBalanceUpdate,
  postWallet
} from "./InventoryApi";

export const useGetWallets = () => {
  return useQuery("getWallets", () => fetchWallets());
};

export const useGetWallet = () => {
  return useMutation("getWallet", async (address: string) =>
    fetchWallet(address)
  );
};

export const useGetWalletForOwner = () => {
  return useMutation("getWalletForOwner", async (owner: string) =>
    fetchWalletForOwner(owner)
  );
};

export const useAddWallet = () => {
  return useMutation("addWallet", async (params: AddWalletParams) =>
    postWallet(params)
  );
};

export const useBalanceUpdate = () => {
  return useMutation("balanceUpdate", (params: BalanceUpdateParams) =>
    postBalanceUpdate(params)
  );
};

export const useGetInventoryEvents = () => {
  return useQuery("getInventoryEvents", () => fetchEvents());
};

export const useGetReservationsByRenter = () => {
  return useMutation("getGetReservationsForAddress", (address: string) =>
    fetchReservationsByRenter(address)
  );
};

export const useGetReservationsByRentedFrom = () => {
  return useMutation("getGetReservationsForAddress", (address: string) =>
    fetchReservationsByRenter(address)
  );
};

export const useGetReservationsForProduct = () => {
  return useMutation("getGetReservationsForProduct", (productId: string) =>
    fetchReservationsForProduct(productId)
  );
};

export const useGetBeneficiaryTransactions = () => {
  return useMutation("getBeneficiaryTransaction", (address: string) =>
    fetchBeneficiaryTransactions(address)
  );
};

export const useGetBenefactorTransactions = () => {
  return useMutation("getBenefactorTransaction", (address: string) =>
    fetchBenefactorTransactions(address)
  );
};

export const useAddTransaction = () => {
  return useMutation("addTransaction", (transaction: AddTransactionParams) =>
    postAddTransaction(transaction)
  );
};

export const useGetProducts = () => {
  return useQuery("getProducts", () => fetchProducts());
};

export const useGetProduct = () => {
  return useMutation("getProduct", (productId: string) =>
    fetchProduct(productId)
  );
};
