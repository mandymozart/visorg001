import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";

const Container = styled.div`
  img {
    border-radius: 3rem;
  }
`

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) return null;

  return (
    <Container>
      <h2>Your profile</h2>
      <img src={user.picture} alt={user.name} />
      <h3>{user.name} ({user.nickname})</h3>
      <p>
        {user.email} 
      </p>
      <code>{user.updated_at} | {user.sub}</code>
    </Container>
  );
};

export default Profile;
