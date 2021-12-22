import styled from "@emotion/styled";
import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Container = styled.div``;

const Content = styled.div`
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
  text-align: center;
  /* border-left: 1px solid black; */
  small {
    display: block;
    padding: 1rem;
  }
  a {
    display: block;
    padding: 1rem;
    img {
      width: 10rem;
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <Container>
        <Content>
          <div>{children}</div>
        </Content>
        {/* <Information>
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
        </Information> */}
        <Footer/>
      </Container>
    </>
  );
};

export default Layout;
