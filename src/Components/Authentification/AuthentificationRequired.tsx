import styled from "@emotion/styled";
import React from "react";
import LoginButton from "../LoginButton";

const Container = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    margin-bottom: 1rem;
  }
`;

const AuthentificationRequired = () => {
  return (
    <Container>
      <h2>Members only</h2>
      <p>Please login or register to access.</p>
      <LoginButton />
    </Container>
  );
};

export default AuthentificationRequired;
