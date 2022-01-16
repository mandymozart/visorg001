import styled from "@emotion/styled";
import React from "react";
import { CgEuro } from "react-icons/cg";
import { FaUserAstronaut } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GiToken } from "react-icons/gi";
import { useCartStore } from "../../Stores/CartStore";

const Container = styled.div`
  max-width: var(--content-width);
  margin: 0 auto;
  .items {
    text-align: center;
    .item {
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
          button {
            padding: 0 0.5rem;
          }
        }
      }
    }
  }
`;

const MiniCart = () => {
  const items = useCartStore((store) => store.items);
  const reduceQuantity = useCartStore((store) => store.reduceQuantity);
  const increaseQuantity = useCartStore((store) => store.increaseQuantity);
  return (
    <Container>
      <h2>My Cart</h2>
      {items.length < 1 ? (
        <>Your cart is empty.</>
      ) : (
        <div className="items">
          {items?.map((item) => {
            return (
              <div className="item" key={item.product.id}>
                <div className="meta">
                  <div className="name">{item.product.name}</div>
                  <div className="owner">
                    <span>
                      <FaUserAstronaut />
                    </span>{" "}
                    {item.product.owner}
                  </div>
                </div>
                <div className="stock">
                  <div className="price">
                    {item.product.listPriceCurrency === "EUR" && <CgEuro />}{" "}
                    {item.product.listPriceConverted} <br />
                    <GiToken /> {item.product.memberPrice}
                  </div>
                  <div className="actions">
                    <button
                      type="button"
                      className="reduceQuantity"
                      onClick={() => reduceQuantity(item.product.id)}
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity">
                      {item.quantity} of {item.product.amountInStock}
                    </span>
                    <button
                      type="button"
                      className="increaseQuantity"
                      onClick={() => increaseQuantity(item.product.id)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
};

export default MiniCart;
