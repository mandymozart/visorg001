import styled from "@emotion/styled";
import React from "react";

const Container = styled.footer`
    margin-top: 1rem;
`
const Footer = () => {
  return (
    <Container>
      <small>&copy; 2020 Vienna Struggle</small>
    </Container>
  );
};

export default Footer;
