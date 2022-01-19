import styled from "@emotion/styled";
import React from "react";
import MiniCart from "../../Components/Cart/MiniCart";
import Layout from "../../Components/Layout";


const Container = styled.div`
  padding: 1rem;
`

const CartPage = () => {
  return (
    <Layout>
      <Container>
      <MiniCart />
      </Container>
    </Layout>
  );
};
export default CartPage;
