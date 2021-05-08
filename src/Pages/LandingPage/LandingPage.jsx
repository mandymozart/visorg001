import styled from "@emotion/styled";
import React from "react";
import LoginButton from "../../Components/LoginButton";
import PublicBazar from "../Projects/PublicBazar";

const Container = styled.div`
  padding: 2rem;
  margin: 0 auto;
  width: min(calc(100% - 4rem), 1440px);
`;

const Notification = styled.div`
  background: #ffee00;
  border-radius: 1rem;
  padding: 1rem;
`;

const LandingPage = () => {
  return (
    <Container>
      <Notification>
        We are an invite-only platform. Please become a member of our Patreon
        and gain access to participate in our projects.
        <LoginButton />
      </Notification>
      <PublicBazar />
    </Container>
  );
};

export default LandingPage;
