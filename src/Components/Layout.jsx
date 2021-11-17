import styled from "@emotion/styled";
import React from "react";
import Navigation from "./Navigation";

const Container = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: var(--header-height) 1fr;
  grid-template-columns: auto var(--sidebar-width);
  grid-template-areas:
    "header header"
    "content information";
  margin: 0;
  transition: all 1s;
`;

const Content = styled.div`
  grid-area: content;
  min-height: var(--content-height);
  div > h2 {
    text-align: center;
  }
  // Inner
  > div {
    padding: 1rem;
    width: var(--content-width);
    margin: 0 auto;
  }
`;

const Information = styled.div`
  grid-area: information;
  height: var(--content-height);
  text-align: center;
  overflow: auto;
  /* border-left: 1px solid black; */
  small {
    display: block;
    padding: 1rem;
  }
  a {
    display: block;
    padding: 1rem;
    img {
      width: 100%;
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Navigation/>
    <Container>
      <Content>
        <div>{children}</div>
      </Content>
      <Information>
        <small>Adverstiment</small>
        <a
          href="https://fanlink.to/snawcrosh"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src={"https://f4.bcbits.com/img/a3814062337_2.jpg"}
            alt="Advertisment - Snaw Crosh"
          />
        </a>
      </Information>
    </Container>
    </>
  );
};

export default Layout;
