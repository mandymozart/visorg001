import styled from "@emotion/styled";
import React from "react";
import { CgEuro } from "react-icons/cg";
import { FaUserAstronaut } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GiToken } from "react-icons/gi";
import FadeIn from "../../Animations/FadeIn";
import { CartItem } from "../../Pages/Products/CartItem";
import { Currency } from "../../Pages/Products/Currency";
import { useCartStore } from "../../Stores/CartStore";
import { SquareButton } from "../FormElements/Button";

const Container = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  justify-content: space-between;
  border-bottom: var(--color) 1px solid;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  .name {
    text-align: left;
    font-weight: bold;
  }
  .owner {
    text-align: left;
  }
  .stock {
    flex: 0 0 8rem;
    .price {
      text-align: right;
    }
    .actions {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

type Props = {
  item: CartItem;
};

const CartListItem = ({ item }: Props) => {
  const { reduceQuantity, increaseQuantity, getItemSum } = useCartStore();

  return (
    <FadeIn>
      <Container>
        <div className="meta">
          <div className="name">{item.product.name}</div>
          <div className="owner">
            <span>
              <FaUserAstronaut />
            </span>{" "}
            {item.product.owner} |{" "}
            <span className="rrp">
              <small>RRP</small>
              {item.product.listPriceCurrency === Currency.EUR && (
                <CgEuro />
              )}{" "}
              {getItemSum(item.product.id, Currency.EUR)?.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="stock">
          <div className="price">
            <GiToken /> {getItemSum(item.product.id)}
          </div>
          <div className="actions">
            <SquareButton
              type="button"
              className="reduceQuantity"
              onClick={() => reduceQuantity(item.product.id)}
            >
              <FiMinus />
            </SquareButton>
            <span className="quantity">
              {item.quantity} of {item.product.amountInStock}
            </span>
            <SquareButton
              type="button"
              className="increaseQuantity"
              onClick={() => increaseQuantity(item.product.id)}
            >
              <FiPlus />
            </SquareButton>
          </div>
        </div>
      </Container>
    </FadeIn>
  );
};

export default CartListItem;
