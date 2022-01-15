import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { CartItem } from "../Pages/Inventory/CartItem";
import { Product } from "../Pages/Inventory/Product";

export const useCartStore = create<State>((set, get) => ({
  selectedProduct: undefined,
  items: [],
  reset: () =>
    set(
      produce((state: State) => {
        state.items = [];
        state.selectedProduct = undefined;
      })
    ),
}));

type State = {
  items: Items;
  selectedProduct: Product | undefined;
  reset: () => void;
};

type Items = CartItem[];

if (process.env.REACT_APP_STAGE === undefined) {
  let root = document.createElement("div");
  root.id = "cartStore";
  document.body.appendChild(root);
  mountStoreDevtool("CartStore", useCartStore as any, root);
}
