import styled from "@emotion/styled";
import React from "react";
import { GiToken } from "react-icons/gi";
import { config } from "../../config";
import { useWalletStore } from "../../Stores/WalletStore";
import { PrimaryButton } from "../Button";

const Container = styled.div``;

const MiniWallet = () => {
  const tokens = useWalletStore((store) => store.tokens);
  return (
    <Container>
      Current balance:
      <br />
      <GiToken /> {tokens} <br />
      <small>1 Token / {config.tokenExchangeRate} EUR</small><br />
      <PrimaryButton>Top up</PrimaryButton>
    </Container>
  );
};

export default MiniWallet;
