import dayjs from "dayjs";
import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { persist } from "zustand/middleware";
import { config } from "../config";
import { CartItem } from "../Pages/Products/CartItem";
import { Product } from "../Pages/Products/Product";
import { round } from "../utils";

type Items = CartItem[];

export const useProductStore = create<State>(
  persist(
    (set, get) => ({
      reset: () =>
        set(
          produce((state: State) => {
            state.quantity = 0;
            state.selectedProduct = undefined;
          })
        ),
      fromDate: dayjs().format(config.DATE_FORMAT),
      setFromDate: (fromDate) =>
        set(
          produce((state: State) => {
            state.fromDate = fromDate;
          })
        ),
      toDate: dayjs().add(1, "day").format(config.DATE_FORMAT),
      setToDate: (toDate) =>
        set(
          produce((state: State) => {
            state.toDate = toDate;
          })
        ),
      selectedProduct: undefined,
      setSelectedProduct: (product: Product) => {
        set(
          produce((state: State) => {
            state.selectedProduct = product;
          })
        );
      },
      quantity: 0,
      increaseQuantity: () => {
        set(
          produce((state) => {
            const product = get().selectedProduct;
            if (product && get().quantity < product.amountInStock)
              state.quantity++;
          })
        );
      },
      reduceQuantity: () => {
        set(
          produce((state) => {
            const product = get().selectedProduct;
            if (product && get().quantity > 1) state.quantity--;
          })
        );
      },
      availableQuantity: 0,
      setAvailableQuantity: (quantity: number) => {
        set(
          produce((state: State) => {
            state.availableQuantity = quantity;
          })
        );
      },
      getItemSum: (abbreviation) => {
        let price = 0;
        const product = get().selectedProduct;
        if (product && product.abbreviation !== abbreviation) {
          price = parseFloat(product.memberPrice) * get().quantity;
        }
        return price;
      },
      getFees: (abbreviation) => {
        // TODO: Needs to extend depending on membership
        let fees = get().getItemSum(abbreviation);
        return round((fees / 100) * 30, 4); // 30 is percentage
      },
    }),
    {
      name: "product-storage", // unique name
      // getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

type State = {
  reset: () => void;
  fromDate: string;
  setFromDate: (fromDate: string) => void;
  toDate: string;
  setToDate: (toDate: string) => void;
  selectedProduct: Product | undefined; // detail page makes this redundant
  setSelectedProduct: (product: Product) => void;
  quantity: number;
  increaseQuantity: () => void;
  reduceQuantity: () => void;
  availableQuantity: number;
  setAvailableQuantity: (quantity: number)=> void;
  getItemSum: (abbreviation: string) => number;
  getFees: (abbreviation: string) => number;
};

if (process.env.REACT_APP_STAGE === undefined) {
  let root = document.createElement("div");
  root.id = "productStore";
  document.body.appendChild(root);
  mountStoreDevtool("ProductStore", useProductStore as any, root);
}
