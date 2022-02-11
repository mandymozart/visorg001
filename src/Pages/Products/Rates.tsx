import styled from "@emotion/styled";
import React from "react";
import { config } from "../../config";
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
        EUR: {round(amountInTokens * config.EUR_TO_TOKEN_EXCHANGE_RATE * rates.EUR , 2).toFixed(2)}
        <br />
        USD: {round(amountInTokens * config.EUR_TO_TOKEN_EXCHANGE_RATE * rates.USD, 2).toFixed(2)}
        <br />
        ETH: {round(amountInTokens * config.EUR_TO_TOKEN_EXCHANGE_RATE * rates.ETH, 6)}
        <br />
        BTC: {round(amountInTokens * config.EUR_TO_TOKEN_EXCHANGE_RATE * rates.BTC, 6)}
      </small>
    </Container>
  );
};

export default Rates;
