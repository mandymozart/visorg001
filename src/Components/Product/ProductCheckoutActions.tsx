import styled from "@emotion/styled";
import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import FadeIn from "../../Animations/FadeIn";
import { useProductStore } from "../../Stores/ProductStore";
import { SquareButton } from "../FormElements/Button";
import ProductCheckoutButton from "./ProductCheckoutButton";

const Container = styled.div`
  width: 100vw;
  position: fixed;
  bottom: 1rem;
  left: 0;
  pointer-events: none;
  z-index: 1;
  > div {
    pointer-events: all;
    text-align: right;
    margin: 0 auto;
    width: var(--form-width);
    display: flex;
    padding: .5rem .5rem;
    gap: .5rem;
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
      padding: 0;
    }
  }
`;

const ProductCheckoutActions = () => {
  const {
    selectedProduct,
    quantity,
    reduceQuantity,
    increaseQuantity,
    availableQuantity,
  } = useProductStore();
  if (!selectedProduct) return <></>;
  return (
    <FadeIn>
      <Container>
        <div className="glassomorphism">
          {availableQuantity > 0 && (
            <>
              <div className="quantitySelector">
                <SquareButton
                  type="button"
                  className="reduceQuantity"
                  onClick={() => reduceQuantity()}
                >
                  <FiMinus />
                </SquareButton>
                <span className="quantity">
                  {quantity} of {availableQuantity}
                </span>
                <SquareButton
                  type="button"
                  className="increaseQuantity"
                  onClick={() => increaseQuantity()}
                >
                  <FiPlus />
                </SquareButton>
              </div>
            </>
          )}
          <ProductCheckoutButton />
        </div>
      </Container>
    </FadeIn>
  );
};

export default ProductCheckoutActions;
