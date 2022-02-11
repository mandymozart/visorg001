import styled from "@emotion/styled";
import React from "react";
import FadeIn from "../../Animations/FadeIn";
import Transactions from "../../Components/Wallet/Transactions";
import Wallet from "../../Components/Wallet/Wallet";

const Container = styled.div`
  padding: 1rem;
`;

const WalletPage = () => {
  return (
    <Container>
      <Wallet />
      <FadeIn>
        <Transactions />
      </FadeIn>
    </Container>
  );
};

export default WalletPage;
