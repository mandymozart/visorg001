import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import produce, { enableMapSet } from "immer";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useState } from "react";
import { CgEuro } from "react-icons/cg";
import { FaUserAstronaut } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GiToken } from "react-icons/gi";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import Layout from "../../Components/Layout";
import {
  useAddInventoryEvent,
  useGetInventoryEvents,
  useGetProducts
} from "../../Hooks/Queries";
import { Product } from "./Product";

enableMapSet();

const Form = styled.form`
  background: none;
  box-shadow: none;
  padding: 0;
  line-height: 1.3;
  fieldset {
    border: 0;
    padding: 0;
    margin-bottom: 2rem;
  }
  .options {
    position: sticky;
    top: 6rem;
    z-index: 10;
    margin: 0;
    padding: 1rem 0;
    background: yellow;
  }
  .item {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    justify-content: space-between;
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
`;

const productsToOptions = (products: Product[] | undefined) => {
  let options: any = [];
  if (products)
    products.forEach((product) => {
      if (
        product.status === "Available" &&
        product.categoryName === "AV Rental"
      ) {
        options.push({ value: product.id, label: product.name });
      }
    });
  return options;
};

type CartItem = {
  quantity: number;
  product: Product;
};

const Inventory = () => {
  const { isAuthenticated } = useAuth0();
  const { addToast } = useToasts();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selected, setSelected] = useState<Product>();
  const [options, setOptions] = useState<any[]>([]);
  const [alias, setAlias] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const { data: products, isLoading, isSuccess } = useGetProducts();
  const {
    data: events,
    isLoading: isLoadingEvents,
    isSuccess: isSuccessEvents,
  } = useGetInventoryEvents();
  const mutation = useAddInventoryEvent();

  useEffect(() => {
    const options = productsToOptions(products);
    setOptions(options);
  }, [products]);

  const handleChange = ({ value }: any) => {
    const id: unknown = value;
    // set selected
    if (products) {
      const selectedProduct = products.find((item) => item.id === value);
      setSelected(selectedProduct);

      if (selectedProduct) {
        // update cart
        setCart(
          produce((draft) => {
            const item = draft.find(
              (item) =>
                item.product.id === id &&
                item.quantity < selectedProduct.amountInStock
            );
            if (item) {
              item.quantity++;
            } else {
              draft.push({ quantity: 1, product: selectedProduct });
            }
          })
        );
      }
    }
  };

  const increaseQunatity = useCallback((id) => {
    setCart(
      produce((draft) => {
        const item = draft.find((item) => item.product.id === id);
        if (item && item.quantity < item.product.amountInStock) item.quantity++;
      })
    );
  }, []);

  const reduceQuantity = useCallback((id) => {
    setCart(
      produce((draft) => {
        const item = draft.find((item) => item.product.id === id);
        const index = draft.findIndex((item) => item.product.id === id);
        if (item) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            draft.splice(index, 1);
          }
        }
      })
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart(
      produce((draft) => {
        const index = draft.findIndex((item) => item.product.id === id);
        if (index !== -1) draft.splice(index, 1);
      })
    );
  }, []);

  const checkout = () => {
    const body = {
      event: {
        eventId: nanoid(8),
        renter: alias,
        type: "reservation",
        productId: "testID",
        fromDate: fromDate,
        toDate: toDate,
        quantity: 2,
      },
    };
    // mutation.mutate(body)
  };

  if (!isAuthenticated) return null;
  return (
    <Layout>
      <h2>Rent items from portal</h2>
      <Form>
        <fieldset>
          <legend></legend>
          <div className="field">
            <label>
              Alias
              <input
                type="text"
                value={alias}
                onChange={(event) => setAlias(event.target.value)}
                name="alias"
                maxLength={3}
              />
            </label>
          </div>

          <div className="fieldGroup">
            <div className="field">
              <label>
                From
                <input
                  type="date"
                  value={fromDate}
                  min={dayjs().format("YYYY-MM-DD")}
                  max={dayjs().add(6, "month").format("YYYY-MM-DD")}
                  onChange={(event) => setFromDate(event.target.value)}
                  name="checkin"
                />
              </label>
            </div>

            <div className="field">
              <label>
                To
                <input
                  type="date"
                  value={toDate}
                  min={dayjs(fromDate).add(1, "day").format("YYYY-MM-DD")}
                  max={dayjs()
                    .add(6, "month")
                    .add(1, "day")
                    .format("YYYY-MM-DD")}
                  onChange={(event) => setToDate(event.target.value)}
                  name="checkout"
                />
              </label>
            </div>
          </div>

          <button type="button" onClick={checkout}>
            Checkout {cart.length} items
          </button>
        </fieldset>
        <fieldset className="options">
          {/* <h3>Cart</h3> */}
          <Select
            options={options}
            placeholder={"Select item ..."}
            isLoading={isLoading}
            onChange={handleChange}
          />
          {/* {selected && (
            <div className="item" key={selected.id}>
              <div className="actions">
                <button type="button" onClick={() => remove(selected.id)}>
                  <FiTrash />
                </button>
              </div>
              <div>{selected.name}</div>
              <div>Owner: {selected.owner}</div>
              <div>Amount available: {selected.amountInStock}</div>
              <div>
                Price:
                {selected.listPriceConverted} {selected.listPriceCurrency}
              </div>
              <div>Member Price: {selected.memberPrice}</div>
            </div>
          )} */}
        </fieldset>
        {cart.length === 0 && <>Your cart is empty.</>}
        <div className="results">
          {cart?.map((item) => {
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
                      onClick={() => increaseQunatity(item.product.id)}
                    >
                      <FiPlus />
                    </button>
                    {/* <button
                      type="button"
                      className="removeItem"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <FiTrash />
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Form>
    </Layout>
  );
};

export default Inventory;
