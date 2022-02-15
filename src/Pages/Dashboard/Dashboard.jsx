import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import FadeInView from "../../Animations/FadeInView";
import AuthentificationRequired from "../../Components/Authentification/AuthentificationRequired";
import { Button } from "../../Components/FormElements/Button";
import Layout from "../../Components/Layout";
import LogoutButton from "../../Components/LogoutButton";

const Container = styled.div`
  .actions {
    margin: 2rem 0;
    text-align: center;
  }
`;
export default () => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated) return <AuthentificationRequired />;
  return (
    <Layout>
      <Container>
        <FadeInView>
          <h2>Welcome, {user.name}</h2>
          <p style={{ textAlign: "center" }}>
            At the moment you can rent inventory, check your wallet balance and
            view your profile.
          </p>
          <div className="actions">
            <Link to="/inventory">
              <Button>Inventory</Button>
            </Link>{" "}
            <Link to="/wallet">
              <Button>Wallet</Button>
            </Link>{" "}
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
            <br />
            <br />
            <LogoutButton />
          </div>
        </FadeInView>
      </Container>
    </Layout>
  );
};
