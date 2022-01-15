import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { config } from "../config";
import {
  InventoryEvent
} from "../Pages/Inventory/InventoryEvent";
import { Product } from "../Pages/Inventory/Product";

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
