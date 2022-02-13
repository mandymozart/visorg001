import styled from "@emotion/styled";
import clsx from "clsx";
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import FadeInView from "../../Animations/FadeInView";
import Rates from "../../Pages/Products/Rates";
import { useProductStore } from "../../Stores/ProductStore";
import { useWalletStore } from "../../Stores/WalletStore";
import PlaintextParagraph from "../PlaintextParagraph";
import Tag from "../Tag";
import ProductCheckoutActions from "./ProductCheckoutActions";
import ProductReservations from "./ProductReservations";

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
  const { selectedProduct } = useProductStore();
  const { abbreviation } = useWalletStore();
  if (!selectedProduct) return <></>;
  return (
    <>
      <Container
        className={clsx({
          isOwner: selectedProduct.abbreviation === abbreviation,
        })}
      >
        <FadeInView>
          <h2 className="name">{selectedProduct.name}</h2>
        </FadeInView>
        <div className="meta">
          <FadeInView>
            <p className="availability">
              We can not guarantee, that the item is available for your selected
              period. Working on it.
            </p>
          </FadeInView>
          <FadeInView>
            <div className="tags">
              <span className="abbreviation">
                <Tag>
                  <FaUserAstronaut />{" "}
                  {selectedProduct.abbreviation === abbreviation ? (
                    <strong>You own this item</strong>
                  ) : (
                    selectedProduct.abbreviation
                  )}
                </Tag>
              </span>
              <span className="status">
                <Tag>{selectedProduct.status}</Tag>
              </span>
            </div>
          </FadeInView>
        </div>
        <FadeInView>
          <PlaintextParagraph text={selectedProduct.description} />
        </FadeInView>
        <FadeInView>
          <div className="rrp">
            <h4>RRP (recommended retail price):</h4>
            <Rates amountInTokens={parseInt(selectedProduct.listPrice)} />
          </div>
        </FadeInView>
        <FadeInView>
          <ProductReservations product={selectedProduct} />
        </FadeInView>
      </Container>
      <ProductCheckoutActions />
    </>
  );
};

export default SelectedProduct;
