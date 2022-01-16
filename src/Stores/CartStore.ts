import produce from "immer";
import toast from "react-hot-toast";
import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { CartItem } from "../Pages/Products/CartItem";
import { InventoryEvent } from "../Pages/Products/InventoryEvent";
import { Product } from "../Pages/Products/Product";

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
            // only add when not existing
            if (state.items.findIndex((item) => item.product.id === id) === -1)
              state.items.push({ quantity: 1, product: selectedProduct });
            else toast("Item exists! Consider increasing its quantity.");
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
  getTokenPriceSum: () => {
    let sum = 0;
    get().items.forEach((item) => {
      sum = sum + parseInt(item.product.memberPrice) * item.quantity;
    });
    return sum;
  },
  getItemPrice: (id) => {
    const item = get().items.find((item: CartItem) => item.product.id === id);
    if (item) return parseInt(item.product.listPrice) * item.quantity;
  },
  getItemTokenPrice: (id) => {
    const item = get().items.find((item: CartItem) => item.product.id === id);
    if (item) return parseInt(item.product.memberPrice) * item.quantity;
  },
  getPriceSum: () => {
    let sum = 0;
    get().items.forEach((item) => {
      sum = sum + parseInt(item.product.listPrice) * item.quantity;
    });
    return sum;
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
  getTokenPriceSum: () => number;
  getItemPrice: (id: string) => number | undefined;
  getItemTokenPrice: (id: string) => number | undefined;
  getPriceSum: () => number;
};

type Items = CartItem[];

if (process.env.REACT_APP_STAGE === undefined) {
  let root = document.createElement("div");
  root.id = "cartStore";
  document.body.appendChild(root);
  mountStoreDevtool("CartStore", useCartStore as any, root);
}
