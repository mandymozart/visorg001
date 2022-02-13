import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import FadeInView from "../../Animations/FadeInView";
import { Button } from "../FormElements/Button";
import WalletCard from "./WalletCard";

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

  return (
    <Container>
      <FadeInView>
        <h2>My Wallet</h2>
        <WalletCard />
      </FadeInView>
      <FadeInView>
        <p>
          With Vienna Struggle tokens we simplify payments amongst our members.
          Together we automatically transfer tokens each time somebody is using
          your infrastructure or services. In simple words: Each time somebody
          uses your gear, you earn as well.
        </p>
        <p>Using tokens saves you 50% compared on our list prices.</p>

        <div className="actions">
          <Button>
            {!isAuthenticated ? "Compare plans" : "Upgrade plan"}
          </Button>
        </div>
      </FadeInView>
      <h5>Disclaimer</h5>
      <p>Tokens are currently not refundable. There are no payouts.</p>
    </Container>
  );
};

export default Wallet;
