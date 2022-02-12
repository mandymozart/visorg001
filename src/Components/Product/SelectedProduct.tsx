import styled from "@emotion/styled";
import clsx from "clsx";
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import FadeInView from "../../Animations/FadeInView";
import Rates from "../../Pages/Products/Rates";
import { useProductStore } from "../../Stores/ProductStore";
import { useWalletStore } from "../../Stores/WalletStore";
import Tag from "../Tag";
import ProductCheckoutActions from "./ProductCheckoutActions";

const Container = styled.div`
  max-width: var(--form-width);
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  margin: 0 auto;
  padding: 2rem 0;
  text-align: left;
  &.isOwner {
    .abbreviation {
      color: var(--third);
    }
  }
`;

const SelectedProduct = () => {
  const { selectedProduct, reset } = useProductStore();
  const { abbreviation } = useWalletStore();
  if (!selectedProduct) return <></>;
  return (
    <>
      <FadeInView>
        <Container
          className={clsx({
            isOwner: selectedProduct.abbreviation === abbreviation,
          })}
        >
          <div className="meta">
            <p className="availability">
              We can not guarantee, that the item is available for your selected
              period. Working on it.
            </p>
            <h3 className="name">{selectedProduct.name}</h3>
            <div className="abbreviation">
              <Tag>
                <FaUserAstronaut />{" "}
                {selectedProduct.abbreviation === abbreviation ? (
                  <strong>You own this item</strong>
                ) : (
                  selectedProduct.abbreviation
                )}
              </Tag>
            </div>
            <div className="status">
              <Tag>{selectedProduct.status}</Tag>
            </div>
          </div>
          <p>{selectedProduct.description}</p>
          <div className="rrp">
            <h4>RRP (recommended retail price):</h4>
            <Rates amountInTokens={parseInt(selectedProduct.listPrice)} />
          </div>
        </Container>
      </FadeInView>
      <ProductCheckoutActions />
    </>
  );
};

export default SelectedProduct;
