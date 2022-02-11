import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { config } from "../config";
import { Currency } from "../Pages/Products/Currency";
import { InventoryEvent } from "../Pages/Products/InventoryEvent";
import { Product } from "../Pages/Products/Product";
import { Transaction } from "../Pages/Wallet/Transaction";
import { Wallet } from "../Pages/Wallet/Wallet";

const getUrl = (endpoint: string) => {
  return new URL(config.sheetyApiURL + endpoint).toString();
};


function fetchWallets(): Promise<Wallet[] | undefined> {
  return axios
  .get(getUrl("/wallets"))
  .then((response) => response.data.wallets);
}

export const useGetWallets = () => {
  return useQuery("getWallets", () => fetchWallets());
};

export const useUpdateWallets = () => {
  return useMutation(async (wallet: Wallet) => {
    const url = getUrl(`/wallets/${wallet.id}`);
    await axios
    .put(
      url,
      { wallet: wallet },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
      )
      .then((res) => res.data);
    });
  };

function fetchEvents(): Promise<InventoryEvent[] | undefined> {
  return axios.get(getUrl("/events")).then((response) => response.data.events);
}

export const useGetInventoryEvents = () => {
  return useQuery("getInventoryEvents", () => fetchEvents());
};
  
export const useAddInventoryEvent = () => {
  const url = getUrl("/events");
  return useMutation(async (data: InventoryEvent) => {
    await axios
    .post(
      url,
      { event: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
      )
      .then((res) => res.data);
    });
  };
  
  function fetchTransactions(): Promise<Transaction[] | undefined> {
    return axios.get(getUrl("/transactions")).then((response) => response.data.transactions);
  }
  
  export const useGetTransactions = () => {
    return useQuery("getTransactions", () => fetchTransactions());
  };
    
  export const useAddTransaction = () => {
  const url = getUrl("/transactions");
  return useMutation(async (data: Transaction) => {
    await axios
      .post(
        url,
        { transaction: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
  });
};

function fetchProducts(): Promise<Product[] | undefined> {
  return axios
    .get(getUrl("/products"))
    .then((response) => response.data.products);
}

export const useGetProducts = () => {
  return useQuery("getProducts", () => fetchProducts());
};

function fetchRates(currency:Currency): Promise<any | undefined> {
  return axios
    .get("https://api.coinbase.com/v2/exchange-rates?currency="+currency)
    .then((response) => response.data.data.rates);
}
export const useGetRates = (currency: Currency = Currency.EUR) => {
  return useQuery("getExchangeRates", () => fetchRates(currency));
};
