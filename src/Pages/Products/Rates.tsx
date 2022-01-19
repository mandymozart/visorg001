import React, { useEffect } from "react";
import { useGetRates } from "../../Hooks/Queries";
import { round } from "../../utils";

type Props = {
  amountInEUR: number;
};

const Rates = ({ amountInEUR }: Props) => {
  const { data: rates } = useGetRates();
  useEffect(() => {
    if (rates) console.log(rates.BTC, rates.ETH);
  }, [rates]);
  if (!rates) return <></>;
  return (
    <small>
      ETH: {round(amountInEUR * rates.ETH, 6)}
      <br />
      BTC: {round(amountInEUR * rates.BTC, 6)}
      <br />
      USD: {round(amountInEUR * rates.USD, 2)}
      <br />
      VIS: {amountInEUR * 0.5}
    </small>
  );
};

export default Rates;
