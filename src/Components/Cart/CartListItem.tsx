import styled from "@emotion/styled";
import clsx from "clsx";
import React from "react";
import { CgEuro } from "react-icons/cg";
import { FaUserAstronaut } from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import FadeInView from "../../Animations/FadeInView";
import { CartItem } from "../../Pages/Products/CartItem";
import { Currency } from "../../Pages/Products/Currency";
import { useCartStore } from "../../Stores/CartStore";
import { useProductStore } from "../../Stores/ProductStore";
import { useWalletStore } from "../../Stores/WalletStore";
import { Button } from "../FormElements/Button";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: space-between;
  border-bottom: var(--color) 1px solid;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  &.isOwner {
    color: var(--third);
  }
  .meta {
    flex: 1;
    .name {
      text-align: left;
      font-weight: bold;
    }
    .owner {
      text-align: left;
    }
  }
  .actions {
    display: flex;
    align-items: center;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    button {
      margin-left: 0.25rem;
    }
  }
`;

type Props = {
  item: CartItem;
};

const CartListItem = ({ item }: Props) => {
  const { getProduct, reduceQuantity } = useCartStore();
  const { setSelectedProduct } = useProductStore();
  const { abbreviation } = useWalletStore();
  const navigate = useNavigate();

  const select = ({ value }: any) => {
    const product = getProduct(value);
    console.log(value, product);
    if (product) setSelectedProduct(product);
    navigate("/inventory/product")
  };
  // TODO: get Alias from user
  return (
    <FadeInView>
      <Container className={clsx({ isOwner: item.product.abbreviation === abbreviation })}>
        <div className="meta">
          <div className="name">{item.product.name}</div>
          <div className="owner">
            <span>
              <FaUserAstronaut />
            </span>{" "}
            {item.product.abbreviation === abbreviation ? (
              <strong>You own this item</strong>
            ) : (
              item.product.abbreviation
            )}{" "}
            |{" "}
            <span className="rrp">
              <small>RRP</small>
              {item.product.listPriceCurrency === Currency.EUR && (
                <CgEuro />
              )}{" "}
              {item.product.listPrice}
            </span>{" "}
            |{" "}
            <span className="price">
              <GiToken /> {item.product.memberPrice}
            </span>{" "}
            | {item.product.amountInStock} in stock
          </div>
        </div>
        <div className="actions">
          <Button type="button" onClick={() => select(item.product.id)}>
            Select
          </Button>
          <Button type="button" onClick={() => reduceQuantity(item.product.id)}>
            Remove
          </Button>
        </div>
      </Container>
    </FadeInView>
  );
};

export default CartListItem;
