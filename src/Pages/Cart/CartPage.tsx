import styled from "@emotion/styled";
import React from "react";
import Cart from "../../Components/Cart/Cart";
import Layout from "../../Components/Layout";

const Container = styled.div`
  padding: 1rem;
`;

const CartPage = () => {
  return (
    <Layout>
      <Container>
        <Cart />
      </Container>
    </Layout>
  );
};
export default CartPage;
