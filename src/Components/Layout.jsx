import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  min-height: calc(100vh - 16rem);
  display: block;
  margin-top: 7rem;
  div > h2 {
    text-align: center;
  }
  // Inner
  > div {
    /* padding: 1rem; */
    width: var(--content-width);
    margin: 0 auto;
    margin-top: 2rem;
  }
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <div>{children}</div>
    </Container>
  );
};

export default Layout;
