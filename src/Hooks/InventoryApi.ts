import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { customAlphabet, nanoid } from "nanoid";
import { config } from "../config";
import {
  InventoryEvent,
  InventoryEventStatus,
  InventoryEventType
} from "../Pages/Products/InventoryEvent";
import { Product } from "../Pages/Products/Product";
import { Transaction, TransactionStatus } from "../Pages/Wallet/Transaction";
import { Wallet, WalletStatus } from "../Pages/Wallet/Wallet";

dayjs.extend(relativeTime);

const getUrl = (endpoint: string) => {
  return new URL(config.INVENTORY_API_ENDPOINT + endpoint).toString();
};

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export const fetchWallets = async (): Promise<Wallet[] | undefined> =>
  await axios.get(getUrl("/wallets")).then((response) => response.data.wallets);

export const fetchWallet = async (
  address: string
): Promise<Wallet | undefined> =>
  await axios
    .get(getUrl(`/wallets/?filter[address]=${address}`))
    .then((response) => {
      return response.data.wallets[0];
    });

export const fetchWalletForOwner = async (
  owner: string
): Promise<Wallet | undefined> => {
console.log("fetch", owner)
  return await axios
  .get(getUrl(`/wallets/?filter[owner]=${owner}`))
  .then((response) => {
    return response.data.wallets[0];
  });
}

export type AddWalletParams = {
  owner: string;
  email: string;
  name: string;
};

export const postWallet = async (
  params: AddWalletParams
): Promise<Wallet | undefined> => {
  const url = getUrl(`/wallets`);
  const nanoid = customAlphabet(config.WALLET_NANOID_ALPHABET, 8);
  return await axios
    .post(
      url,
      {
        wallet: {
          address: nanoid(),
          owner: params.owner,
          email: params.email,
          name: params.name,
          balance: config.WALLET_WELCOME_BALANCE,
          status: WalletStatus.ACTIVE,
          updatedDate: dayjs().format(),
          createdDate: dayjs().format(),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
};

export type BalanceUpdateParams = {
  id: number;
  balance: number;
};

export const postBalanceUpdate = async (params: BalanceUpdateParams) => {
  const url = getUrl(`/wallets/${params.id}`);
  await axios
    .put(
      url,
      {
        wallet: {
          balance: params.balance,
          updatedDate: dayjs().format(),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
};

export const fetchEvents = async (): Promise<InventoryEvent[] | undefined> =>
  await axios.get(getUrl("/events")).then((response) => response.data.events);

export const fetchReservationsForAddress = async (
  address: string
): Promise<InventoryEvent[] | undefined> =>
  await axios
    .get(getUrl(`/events?filter[renter]=${address}`))
    .then((response) => response.data.events);

export const fetchReservationsForProduct = async (
  productId: string
): Promise<InventoryEvent[] | undefined> =>
  await axios
    .get(getUrl(`/events?filter[productId]=${productId}`))
    .then((response) => response.data.events);

export type AddInventoryEventParams = {
  renter: string;
  type: InventoryEventType;
  productId: string;
  quantity: number;
  fromDate: string;
  toDate: string;
  status: InventoryEventStatus;
};

export const postAddInventoryEvent = async (params: AddInventoryEventParams) =>
  await axios
    .post(
      getUrl("/events"),
      {
        event: {
          eventId: nanoid(),
          renter: params.renter,
          type: params.type,
          productId: params.productId,
          quantity: params.quantity,
          fromDate: params.fromDate,
          toDate: params.toDate,
          status: params.status,
          createdDate: dayjs().format(),
          updatedDate: dayjs().format(),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);

export const fetchBeneficiaryTransactions = async (
  address: string
): Promise<Transaction[] | undefined> =>
  await axios
    .get(getUrl(`/transactions?filter[beneficiary]=${address}`))
    .then((response) => response.data.transactions);

export const fetchBenefactorTransactions = async (
  address: string
): Promise<Transaction[] | undefined> =>
  await axios
    .get(getUrl(`/transactions?filter[benefactor]=${address}`))
    .then((response) => response.data.transactions);

export type AddTransactionParams = {
  beneficiary: string;
  benefactor: string;
  amount: number;
  referenceText?: string | undefined;
};

export const postAddTransaction = async (
  params: AddTransactionParams
): Promise<Transaction | undefined> =>
  await axios
    .post(
      getUrl("/transactions"),
      {
        transaction: {
          transactionId: nanoid(),
          beneficiary: params.beneficiary,
          benefactor: params.benefactor,
          amount: params.amount,
          referenceText: params.referenceText,
          status: TransactionStatus.RECEIVED,
          createdDate: dayjs().format(),
          updatedDate: dayjs().format(),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);

export const fetchProducts = async (): Promise<Product[] | undefined> =>
  await axios
    .get(getUrl("/products"))
    .then((response) => response.data.products);

export const fetchProduct = async (
  productId: string
): Promise<Product | undefined> =>
  await axios
    .get(getUrl(`/products?filter[]=${productId}`))
    .then((response) => response.data.products[0]);
