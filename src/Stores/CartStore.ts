import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { CartItem } from "../Pages/Inventory/CartItem";
import { InventoryEvent } from "../Pages/Inventory/InventoryEvent";
import { Product } from "../Pages/Inventory/Product";

export const useCartStore = create<State>((set, get) => ({
  items: [],
  addItem: ({ value }: any) => {
    const id: unknown = value;
    // set selected
    set(
      produce((state: State) => {
        if (state.products) {
          const selectedProduct = state.products.find(
            (item: Product) => item.id === value
          );
          if (selectedProduct) {
            // update cart
            const item = state.items.find(
              (item) =>
                item.product.id === id &&
                item.quantity < selectedProduct.amountInStock
            );
            if (item) {
              item.quantity++;
            } else {
              state.items.push({ quantity: 1, product: selectedProduct });
            }
          }
        }
      })
    );
  },
  clearItems: () =>
    set(
      produce((state: State) => {
        state.items = [];
      })
    ),
  isLoading: false,
  setIsLoading: (value) =>
    set(
      produce((state: State) => {
        state.isLoading = value;
      })
    ),
  products: [],
  replaceProducts: (products) =>
    set(
      produce((state: State) => {
        state.products = products;
      })
    ),
  selectedProduct: undefined,
  getProduct: (productId: string) =>
    get().products.find((item) => item.productId === productId),
  events: [],
  replaceEvents: (events) =>
    set(
      produce((state: State) => {
        state.events = events;
      })
    ),
  reset: () =>
    set(
      produce((state: State) => {
        state.items = [];
        state.selectedProduct = undefined;
      })
    ),
  increaseQuantity: (id) => {
    set(
      produce((state) => {
        const item = state.items.find(
          (item: CartItem) => item.product.id === id
        );
        if (item && item.quantity < item.product.amountInStock) item.quantity++;
      })
    );
  },
  reduceQuantity: (id) => {
    set(
      produce((state) => {
        const item = state.items.find(
          (item: CartItem) => item.product.id === id
        );
        const index = state.items.findIndex(
          (item: CartItem) => item.product.id === id
        );
        if (item) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            state.items.splice(index, 1);
          }
        }
      })
    );
  },
}));

type State = {
  items: Items;
  addItem: (id: string) => void;
  clearItems: () => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getProduct: (productId: string) => Product | undefined;
  products: Product[];
  replaceProducts: (products: Product[]) => void;
  selectedProduct: Product | undefined; // detail page makes this redundant
  events: InventoryEvent[];
  replaceEvents: (products: InventoryEvent[]) => void;
  reset: () => void;
  increaseQuantity: (id: string) => void;
  reduceQuantity: (id: string) => void;
};

type Items = CartItem[];

if (process.env.REACT_APP_STAGE === undefined) {
  let root = document.createElement("div");
  root.id = "cartStore";
  document.body.appendChild(root);
  mountStoreDevtool("CartStore", useCartStore as any, root);
}
