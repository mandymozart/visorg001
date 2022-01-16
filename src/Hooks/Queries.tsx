import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { config } from "../config";
import { InventoryEvent } from "../Pages/Products/InventoryEvent";
import { Product } from "../Pages/Products/Product";
import { Wallet } from "../Pages/Wallet/Wallet";

const getUrl = (endpoint: string) => {
  return new URL(config.sheetyApiURL + endpoint);
};

function fetchEvents(): Promise<InventoryEvent[] | undefined> {
  return axios
    .get(getUrl("/events").toString())
    .then((response) => response.data.events);
}

export const useGetInventoryEvents = () => {
  return useQuery("getInventoryEvents", () => fetchEvents());
};

function fetchWallet(sub: string): Promise<Wallet | undefined> {
  return axios
    .get(getUrl("/wallets").toString())
    .then((response) =>
      response.data.wallets.find((wallet: Wallet) => wallet.owner === sub)
    );
}
function fetchWallets(): Promise<Wallet[] | undefined> {
  return axios
    .get(getUrl("/wallets").toString())
    .then((response) => response.data.wallets);
}

export const useGetWallet = (sub: string) => {
  return useQuery("getWallet" + sub, () => fetchWallet(sub));
};
export const useGetWallets = () => {
  return useQuery("getWallets", () => fetchWallets());
};

export const useUpdateWallet = () => {
  const url = getUrl("/wallets").toString();
  return useMutation(async (data: Wallet) => {
    await axios
      .post(
        url,
        { wallet: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
  });
};

export const useAddInventoryEvent = () => {
  const url = getUrl("/events").toString();
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

function fetchProducts(): Promise<Product[] | undefined> {
  return axios
    .get(getUrl("/products").toString())
    .then((response) => response.data.products);
}

export const useGetProducts = () => {
  return useQuery("getProducts", () => fetchProducts());
};
