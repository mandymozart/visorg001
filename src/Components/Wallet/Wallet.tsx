import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import FadeInView from "../../Animations/FadeInView";
import { BaseSection } from "../../Pages/LandingPage/BaseSection";
import AuthentificationRequired from "../Authentification/AuthentificationRequired";
import { PrimaryButton } from "../FormElements/Button";
import WalletCard from "./WalletCard";

const Container = styled.div`
  max-width: var(--content-width-narrow);
  margin: 0 auto;
  margin-top: 4rem;
  padding: 1rem;
  h2 {
    text-align: center;
  }
  .actions {
    text-align: center;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Wallet = () => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) return <AuthentificationRequired />;
  return (
    <Container>
      <BaseSection>
        <FadeInView>
          <h2>My Wallet</h2>
          <WalletCard />
        </FadeInView>
      </BaseSection>
      <BaseSection>
        <FadeInView>
          <p>
            With Vienna Struggle tokens we simplify payments amongst our
            members. Together we automatically transfer tokens each time
            somebody is using your infrastructure or services. In simple words:
            Each time somebody uses something made by you, you profit as well.
          </p>
          <p>
            Paying with tokens already saves you 50% on
            our list prices which you can invoice to your clients. And that is just our standard plan!
          </p>

          <div className="actions">
            <PrimaryButton>Compare plans</PrimaryButton>
          </div>
        </FadeInView>
        <FadeInView>
          <h5>Disclaimer</h5>
          <p>Tokens are currently not refundable. There are no payouts.</p>
        </FadeInView>
      </BaseSection>
    </Container>
  );
};

export default Wallet;
