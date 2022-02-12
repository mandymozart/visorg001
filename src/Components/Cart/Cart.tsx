import styled from "@emotion/styled";
import React from "react";
import FadeInView from "../../Animations/FadeInView";
import { useCartStore } from "../../Stores/CartStore";
import CartActions from "./CartActions";
import CartListItem from "./CartListItem";
import CartSummary from "./CartSummary";

const Container = styled.div``;

const Cart = () => {
  const { items } = useCartStore();
  return (
    <Container>
      <FadeInView>
        <h2>Favorites</h2>
      </FadeInView>
      {items.length < 1 ? (
        <>Your cart is empty.</>
      ) : (
        <>
          <div className="items">
            {items?.map((item) => {
              return <CartListItem item={item} key={item.product.productId} />;
            })}
          </div>
          <CartSummary />
          <CartActions />
        </>
      )}
    </Container>
  );
};

export default Cart;
