import styled from "@emotion/styled";
import React from "react";
import { CgEuro } from "react-icons/cg";
import { FaUserAstronaut } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GiToken } from "react-icons/gi";
import { Currency } from "../../Pages/Products/Currency";
import Rates from "../../Pages/Products/Rates";
import { useCartStore } from "../../Stores/CartStore";
import { SquareButton } from "../FormElements/Button";
import MiniCartActions from "./MiniCartActions";

const Container = styled.div`
  max-width: var(--content-width);
  margin: 0 auto;
  text-align: center;
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
        }
      }
    }
  }
  .summary {
    text-align: right;
    margin-bottom: 1rem;
  }
`;

const MiniCart = () => {
  const items = useCartStore((store) => store.items);
  const reduceQuantity = useCartStore((store) => store.reduceQuantity);
  const increaseQuantity = useCartStore((store) => store.increaseQuantity);
  const getItemSum = useCartStore((store) => store.getItemSum);
  const getTotal = useCartStore((store) => store.getTotal);
  const getFees = useCartStore((store) => store.getFees);

  return (
    <Container>
      <h2>My Cart</h2>
      {items.length < 1 ? (
        <>Your cart is empty.</>
      ) : (
        <>
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
                      {" "}|{" "}
                    <span className="rrp">
                    <small>
                        RRP
                        </small>
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
                </div>
              );
            })}
          </div>
          <div className="summary">
            <small>
              Sum: <GiToken /> {getTotal()}
            </small>
            <br />
            <small>
              Estimated fees: <GiToken /> {getFees()}
            </small>
            <br />
            Total: <GiToken /> {getTotal() + getFees()}
            <br />
            <Rates amountInTokens={getTotal(Currency.TOKEN)}/>
          </div>
          <MiniCartActions/>
        </>
      )}
    </Container>
  );
};

export default MiniCart;
