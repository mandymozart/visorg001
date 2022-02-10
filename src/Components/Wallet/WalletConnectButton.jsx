import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { PrimaryButton } from "../FormElements/Button";
import { injected } from "./../../wallet/Connect";
const Container = styled(PrimaryButton)``;

const WalletConnectButton = () => {
  const { active, account, library, activate, deactivate } = useWeb3React();
  // Add minting toggle listener
  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }
  if (active) {
    return <Container onClick={disconnect}>Disconnect Wallet</Container>;
  } else {
    return <Container onClick={connect}>Connect Wallet</Container>;
  }
};

export default WalletConnectButton;
