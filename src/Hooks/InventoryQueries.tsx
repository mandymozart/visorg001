import { useMutation, useQuery } from "react-query";
import {
  AddTransactionParams,
  BalanceUpdateParams, fetchBenefactorTransactions, fetchBeneficiaryTransactions, fetchEvents, fetchProduct, fetchProducts, fetchReservationsForAddress, fetchReservationsForProduct, fetchWallet, fetchWallets, postAddTransaction, postBalanceUpdate
} from "./InventoryApi";

export const useGetWallets = () => {
  return useQuery("getWallets", () => fetchWallets());
};

export const useGetWallet = () => {
  return useMutation("getWallet", async (address: string) =>
    fetchWallet(address)
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

export const useGetReservationsForAddress = () => {
  return useMutation("getGetReservationsForAddress", (address: string) =>
    fetchReservationsForAddress(address)
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
