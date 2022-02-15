import styled from "@emotion/styled";
import React from "react";
import { GiToken } from "react-icons/gi";
import Rates from "../../Pages/Products/Rates";
import { useWalletStore } from "../../Stores/WalletStore";
import { round } from "../../utils";
import Tag from "../Tag";

const Container = styled.div`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--color);
  h5 {
    margin: 0;
  }
`;

const MiniWallet = () => {
  const {
    balance,
    address
  } = useWalletStore();
  return (
    <Container>
      <h5>Wallet address: <Tag>{address}</Tag><br />Your current balance</h5>
      <GiToken /> {round(balance, 3)} <br />
      <Rates amountInTokens={balance} />
      <small>
        Balance is rounded to 3 digits for display purposes. We do not reduct
        your earnings internally. Real time exchange rates provided by Coinbase.
      </small>
    </Container>
  );
};

export default MiniWallet;
