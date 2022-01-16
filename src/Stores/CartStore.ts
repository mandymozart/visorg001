import dayjs from "dayjs";
import produce from "immer";
import toast from "react-hot-toast";
import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { CartItem } from "../Pages/Products/CartItem";
import { Currency } from "../Pages/Products/Currency";
import { InventoryEvent } from "../Pages/Products/InventoryEvent";
import { Product } from "../Pages/Products/Product";
import { round } from "../utils";

type Items = CartItem[];

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
  fromDate: dayjs().format("YYYY-MM-DD"),
  setFromDate: (fromDate) =>
    set(
      produce((state: State) => {
        state.fromDate = fromDate;
      })
    ),
  toDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
  setToDate: (toDate) =>
    set(
      produce((state: State) => {
        state.toDate = toDate;
      })
    ),
  isLoading: false,
  setIsLoading: (value) =>
    set(
      produce((state: State) => {
        state.isLoading = value;
      })
    ),
  isSubmitting: false,
  setIsSubmitting: (value) =>
    set(
      produce((state: State) => {
        state.isSubmitting = value;
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
  getTotal: (currency = Currency.TOKEN) => {
    let sum = 0;
    get().items.forEach((item) => {
      let itemSum = 0;
      switch (currency) {
        case Currency.EUR:
          itemSum = parseFloat(item.product.listPrice);
          break;
        case Currency.TOKEN:
        default:
          itemSum = parseFloat(item.product.memberPrice);
          break;
      }
      sum = sum + itemSum * item.quantity;
    });
    return sum;
  },
  getItemSum: (id, currency = Currency.TOKEN) => {
    const item = get().items.find((item: CartItem) => item.product.id === id);
    let price = 0;
    if (item) {
      switch (currency) {
        case Currency.EUR:
          price = parseFloat(item.product.listPrice);
          break;
        case Currency.TOKEN:
        default:
          price = parseFloat(item.product.memberPrice);
          break;
      }
      return price * item.quantity;
    }
  },
  getFees: (currency = Currency.TOKEN) => {
    // Needs to extend depending on membership
    let sum = get().getTotal(currency);
    return round((sum / 100) * 30, 4);
  },
}));

type State = {
  items: Items;
  addItem: (id: string) => void;
  clearItems: () => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  getProduct: (productId: string) => Product | undefined;
  fromDate: string;
  setFromDate: (fromDate: string) => void;
  toDate: string;
  setToDate: (toDate: string) => void;
  products: Product[];
  replaceProducts: (products: Product[]) => void;
  selectedProduct: Product | undefined; // detail page makes this redundant
  events: InventoryEvent[];
  replaceEvents: (products: InventoryEvent[]) => void;
  reset: () => void;
  increaseQuantity: (id: string) => void;
  reduceQuantity: (id: string) => void;
  getTotal: (currency?: Currency) => number;
  getItemSum: (id: string, currency?: Currency) => number | undefined;
  getFees: (currency?: Currency) => number;
};

if (process.env.REACT_APP_STAGE === undefined) {
  let root = document.createElement("div");
  root.id = "cartStore";
  document.body.appendChild(root);
  mountStoreDevtool("CartStore", useCartStore as any, root);
}
