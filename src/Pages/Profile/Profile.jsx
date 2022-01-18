import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import Layout from "../../Components/Layout";
import MiniWallet from "../../Components/Wallet/MiniWallet";

const Container = styled.div`
padding: 1rem;
  img {
    border-radius: 5rem;
  }
`;

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log(user);
  }, [user]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <Container>
        <h3>Your profile</h3>
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
      </Container>
    </Layout>
  );
};

export default Profile;
