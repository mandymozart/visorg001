import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import Layout from "../../Components/Layout";

const Container = styled.div`
  img {
    border-radius: 5rem;
  }
`

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <Container>
        <h2>Your profile</h2>
        <img src={user.picture} alt={user.name} />
        <h3>{user.name} ({user.nickname})</h3>
        <p>
          {user.email} 
        </p>
        <code>{user.updated_at} | {user.sub}</code>
      </Container>
    </Layout>
  );
};

export default Profile;
