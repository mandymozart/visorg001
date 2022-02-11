import axios from "axios";
import { useQuery } from "react-query";
import { Currency } from "../Pages/Products/Currency";

function fetchRates(currency: Currency): Promise<any | undefined> {
  return axios
    .get("https://api.coinbase.com/v2/exchange-rates?currency=" + currency)
    .then((response) => response.data.data.rates);
}
export const useGetRates = (currency: Currency = Currency.EUR) => {
  return useQuery("getExchangeRates", () => fetchRates(currency));
};
