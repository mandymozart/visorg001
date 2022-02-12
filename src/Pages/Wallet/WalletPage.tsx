import styled from "@emotion/styled";
import React from "react";
import FadeInView from "../../Animations/FadeInView";
import Transactions from "../../Components/Wallet/Transactions";
import Wallet from "../../Components/Wallet/Wallet";

const Container = styled.div`
  padding: 1rem;
`;

const WalletPage = () => {
  return (
    <Container>
      <Wallet />
      <FadeInView>
        <Transactions />
      </FadeInView>
    </Container>
  );
};

export default WalletPage;
