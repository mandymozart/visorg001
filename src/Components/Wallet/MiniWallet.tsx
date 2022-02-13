import styled from "@emotion/styled";
import React from "react";
import { GiToken } from "react-icons/gi";
import Rates from "../../Pages/Products/Rates";
import { useWalletStore } from "../../Stores/WalletStore";
import { Button } from "../FormElements/Button";

const Container = styled.div`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--color);
  h5 {
    margin: 0;
  }
`;

const MiniWallet = () => {
  const { balance } = useWalletStore();
  return (
    <Container>
      <h5>Your current balance</h5>
      <GiToken /> {balance} <br />
      <Rates amountInTokens={balance} />
      <br />
      <Button>Top up</Button>
    </Container>
  );
};

export default MiniWallet;
