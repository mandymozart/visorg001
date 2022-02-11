import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import FadeIn from "../../Animations/FadeIn";
import Layout from "../../Components/Layout";
import { PageLoader } from "../../Components/Loader";
import MiniWallet from "../../Components/Wallet/MiniWallet";

const Container = styled.div`
padding: 1rem;
max-width: var(--form-width);
margin: 0 auto;
  img {
    border-radius: 5rem;
  }
`;

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <PageLoader/>;
  }

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <Container>
        <FadeIn>
          <h2>Your profile</h2>
          <img src={user.picture} alt={user.name} />
          <h3>
            {user.name} ({user.nickname})
          </h3>
          <p>{user.email}</p>
          <code>
            {user.updated_at} | {user.sub}
          </code>
          <p>
            <MiniWallet />
          </p>
        </FadeIn>
      </Container>
    </Layout>
  );
};

export default Profile;
