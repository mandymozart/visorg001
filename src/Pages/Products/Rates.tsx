import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useGetRates } from "../../Hooks/Queries";
import { round } from "../../utils";

type Props = {
  amountInTokens: number;
};

const Container = styled.div`
`

const Rates = ({ amountInTokens }: Props) => {
  const { data: rates } = useGetRates();
  useEffect(() => {
    if (rates) console.log(rates.BTC, rates.ETH);
  }, [rates]);
  if (!rates) return <></>;
  return (
    <Container>
      <small>
        EUR: {round(amountInTokens * rates.EUR, 2).toFixed(2)}
        <br />
        USD: {round(amountInTokens * rates.USD, 2).toFixed(2)}
        <br />
        ETH: {round(amountInTokens * rates.ETH, 6)}
        <br />
        BTC: {round(amountInTokens * rates.BTC, 6)}
      </small>
    </Container>
  );
};

export default Rates;
