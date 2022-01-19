import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { useWalletStore } from "../../Stores/WalletStore";
import { Button, PrimaryButton } from "../Button";
import WalletCard from "./WalletCard";
import WalletConnectButton from "./WalletConnectButton";

const Container = styled.div`
  max-width: var(--form-width);
  margin: 0 auto;
  margin-top: 4rem;
  padding: 1rem;
  h2 {
    text-align: center;
  }
  .actions {
    text-align: center;
  }
`;

const Wallet = () => {
  const { isAuthenticated } = useAuth0();
  const tokens = useWalletStore((store) => store.tokens);
  const address = useWalletStore((store) => store.address);
  const status = useWalletStore((store) => store.status);
  const lastUpdate = useWalletStore((store) => store.lastUpdate);
  

  return (
    <Container>
      <h2>My Wallet</h2>
      <WalletCard
        address={address}
        tokens={tokens}
        lastUpdate={lastUpdate}
        status={status}
      />

      <p>
        With Vienna Struggle tokens we simplify payments amongst our members.
        Together we automatically transfer tokens each time somebody is using
        your infrastructure or services. In simple words: Each time somebody
        uses your gear, you earn as well.
      </p>
      <p>Using tokens saves your 50% compared to our EUR prices.</p>
      <div className="actions">
        <Button>
          <FiPlus />
          Add funds
        </Button>{" "}
        <WalletConnectButton />{" "}
        <PrimaryButton>
          {!isAuthenticated ? "Compare plans" : "Upgrade plan"}
        </PrimaryButton>
      </div>
      <h5>Disclaimer</h5>
      <p>Tokens are currently not refundable. There are no payouts.</p>
    </Container>
  );
};

export default Wallet;
