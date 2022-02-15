import dayjs from "dayjs";
import produce from "immer";
import toast from "react-hot-toast";
import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../Pages/Products/CartItem";
import { Product } from "../Pages/Products/Product";
import { round } from "../utils";

type Items = CartItem[];

// TODO: Simplify and remove quantities
export const useFavoriteStore = create<State>(
  persist(
    (set, get) => ({
      items: [],
      addItem: ({ value }: { value: string }) => {
        const id: unknown = value;
        console.log("addItem",value);
        // set selected
        set(
          produce((state: State) => {
            if (state.products) {
              const selectedProduct = state.products.find(
                (item: Product) => item.id === value
              );
              if (selectedProduct) {
                if (isNaN(parseFloat(selectedProduct.memberPrice))) {
                  toast("Item has no member price set.");
                } else {
                  // only add when not existing
                  if (
                    state.items.findIndex((item) => item.product.id === id) ===
                    -1
                  )
                    state.items.push({ quantity: 1, product: selectedProduct });
                  else toast("Item exists! Consider increasing its quantity.");
                }
              }
            }
          })
        );
      },
      hasItem: (productId: string) =>
        !!get().items.findIndex((item) => item.product.productId === productId),
      removeItem: (productId: string) => {
        const index = get().items.findIndex(
          (item) => item.product.productId === productId
        );
        if (index > 0) {
          set(
            produce((state: State) => {
              state.items.splice(index);
            })
          );
        }
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
      selectProduct: ({ value }: any) => {
        // set selected
        set(
          produce((state: State) => {
            if (state.products) {
              const selectedProduct = state.products.find(
                (item: Product) => item.id === value
              );
              state.selectedProduct = selectedProduct;
            }
          })
        );
      },
      getProductByProductId: (id: string) =>
        get().products.find((item) => item.productId === id),
      getProduct: (id: string) => get().products.find((item) => item.id === id),
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
            if (item && item.quantity < item.product.amountInStock)
              item.quantity++;
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
      getTotal: (abbreviation) => {
        let price = 0;
        get().items.forEach((item) => {
          if (item.product.abbreviation !== abbreviation)
            price =
              price + parseFloat(item.product.memberPrice) * item.quantity;
        });
        return price;
      },
      getItemSum: (abbreviation, id) => {
        const item = get().items.find(
          (item: CartItem) => item.product.id === id
        );
        let price = 0;
        if (item && item.product.abbreviation !== abbreviation) {
          price = parseFloat(item.product.memberPrice) * item.quantity;
        }
        return price;
      },
      getFees: (abbreviation) => {
        // TODO: Needs to extend depending on membership
        let fees = get().getTotal(abbreviation);
        return round((fees / 100) * 30, 4); // 30 is percentage
      },
      getGrandTotal: (owner) => {
        return get().getTotal(owner) + get().getFees(owner);
      },
    }),
    {
      name: "cart-storage", // unique name
      // getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

type State = {
  items: Items;
  addItem: ({ value }: { value: string }) => void;
  hasItem: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  clearItems: () => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  getProduct: (id: string) => Product | undefined;
  getProductByProductId: (id: string) => Product | undefined;
  fromDate: string;
  setFromDate: (fromDate: string) => void;
  toDate: string;
  setToDate: (toDate: string) => void;
  products: Product[];
  replaceProducts: (products: Product[]) => void;
  selectedProduct: Product | undefined; // detail page makes this redundant
  selectProduct: (product: Product) => void;
  reset: () => void;
  increaseQuantity: (id: string) => void;
  reduceQuantity: (id: string) => void;
  getTotal: (owner: string) => number;
  getItemSum: (owner: string, id: string) => number;
  getFees: (owner: string) => number;
  getGrandTotal: (owner: string) => number;
};

if (process.env.REACT_APP_STAGE === undefined) {
  let root = document.createElement("div");
  root.id = "cartStore";
  document.body.appendChild(root);
  mountStoreDevtool("CartStore", useFavoriteStore as any, root);
}
