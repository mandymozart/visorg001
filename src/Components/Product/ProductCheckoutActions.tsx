import styled from "@emotion/styled";
import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import FadeIn from "../../Animations/FadeIn";
import { useProductStore } from "../../Stores/ProductStore";
import { SquareButton } from "../FormElements/Button";
import ProductCheckoutButton from "./ProductCheckoutButton";

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
  .quantitySelector {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0 1rem;
    }
`;

const ProductCheckoutActions = () => {
  const {
    selectedProduct,
    quantity,
    reduceQuantity,
    increaseQuantity,
  } = useProductStore();
  if (!selectedProduct) return <></>;
  return (
    <FadeIn>
        <div>

        </div>
      <Container className="glassomorphism">
        <div className="quantitySelector">
            <SquareButton
              type="button"
              className="reduceQuantity"
              onClick={() => reduceQuantity()}
            >
              <FiMinus />
            </SquareButton>
            <span className="quantity">
              {quantity} of {selectedProduct.amountInStock}
            </span>
            <SquareButton
              type="button"
              className="increaseQuantity"
              onClick={() => increaseQuantity()}
            >
              <FiPlus />
            </SquareButton>
          </div>
          {quantity > 0 && (<ProductCheckoutButton />)}
      </Container>
    </FadeIn>
  );
};

export default ProductCheckoutActions;
