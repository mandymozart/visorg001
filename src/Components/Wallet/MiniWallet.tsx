import styled from "@emotion/styled";
import React from "react";
import { GiToken } from "react-icons/gi";
import Rates from "../../Pages/Products/Rates";
import { useWalletStore } from "../../Stores/WalletStore";
import { PrimaryButton } from "../FormElements/Button";

const Container = styled.div`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--color);
  h5 {
    margin: 0;
  }
`;

const MiniWallet = () => {
  const tokens = useWalletStore((store) => store.tokens);
  return (
    <Container>
      <h5>Your current balance</h5>
      <GiToken /> {tokens} <br />
      <Rates amountInTokens={tokens} />
      <br />
      <PrimaryButton>Top up</PrimaryButton>
    </Container>
  );
};

export default MiniWallet;
