import styled from "@emotion/styled";
import React from "react";
import FadeIn from "../../Animations/FadeIn";
import { useCartStore } from "../../Stores/CartStore";
import { Button } from "../FormElements/Button";

const Container = styled.div`
  text-align: right;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  width: calc(100vw - 2rem);
  display: flex;
  padding: 1rem;
  gap: 1rem;
  z-index: 10;
  /* border-top: 1px solid var(--color); */
  border: 2px solid var(--color);
    box-sizing: border-box;
    /* Up 1 */
    box-shadow: 4px 4px 0px var(--color);
    border-radius: 8px;
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
    <FadeIn>
      <Container className="glassomorphism">
        <Button onClick={() => clearItems()}>Clear items</Button>
      </Container>
    </FadeIn>
  );
};

export default CartActions;
