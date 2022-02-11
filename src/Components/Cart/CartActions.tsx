import styled from "@emotion/styled";
import React from "react";
import { useCartStore } from "../../Stores/CartStore";
import { Button } from "../FormElements/Button";
import CartTokenCheckoutButton from "./CartTokenCheckoutButton";

const Container = styled.div`
  text-align: right;
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100vw - 2rem);
  display: flex;
  padding: 1rem;
  gap: 1rem;
  z-index: 1;
  background: var(--background);
  border-top: 1px solid var(--color);
  button {
    flex: 1;
    &:last-of-type {
      margin: 0;
    }
  }
`;

const CartActions = () => {
  const { items, clearItems } = useCartStore();
  if (items.length <= 0) return <></>;
  return (
    <Container>
      <Button onClick={() => clearItems()}>Clear items</Button>
      <CartTokenCheckoutButton />
    </Container>
  );
};

export default CartActions;
