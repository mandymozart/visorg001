import styled from "@emotion/styled";
import React from "react";
import { useGetRates } from "../../Hooks/CoinbaseQueries";
import { round } from "../../utils";

type Props = {
  amountInTokens: number;
};

const Container = styled.div``

const Rates = ({ amountInTokens }: Props) => {
  const { data: rates } = useGetRates();
  if (!rates) return <></>;
  return (
    <Container>
      <small>
        EUR: {round(amountInTokens * 2 * rates.EUR , 2).toFixed(2)}
        <br />
        USD: {round(amountInTokens * 2 * rates.USD, 2).toFixed(2)}
        <br />
        ETH: {round(amountInTokens * 2 * rates.ETH, 6)}
        <br />
        BTC: {round(amountInTokens * 2 * rates.BTC, 6)}
      </small>
    </Container>
  );
};

export default Rates;
