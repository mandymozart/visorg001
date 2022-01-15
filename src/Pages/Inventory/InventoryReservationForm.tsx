import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import produce, { enableMapSet } from "immer";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgEuro } from "react-icons/cg";
import { FaUserAstronaut } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GiToken } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAddInventoryEvent, useGetProducts } from "../../Hooks/Queries";
import { errorHandler } from "../../Utilities/ErrorHandlers";
import { CartItem } from "./CartItem";
import { Product } from "./Product";

enableMapSet();

const Form = styled.form`
  background: none;
  box-shadow: none;
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


const InventoryReservationForm = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [alias, setAlias] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const { data: products, isLoading } = useGetProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mutation = useAddInventoryEvent();

  useEffect(() => {
    const options = productsToOptions(products);
    setOptions(options);
  }, [products]);

  const addItem = ({ value }: any) => {
    const id: unknown = value;
    // set selected
    if (products) {
      const selectedProduct = products.find((item) => item.id === value);
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

  const checkout = () => {
    if (fromDate !== "" && toDate !== "" && alias !== "") {
      setIsSubmitting(true);
      cart.forEach((item) => {
        // throttle requests
        setTimeout(()=>{
          mutation.mutate(
            {
              eventId: nanoid(8),
              renter: alias,
              type: "reservation",
              productId: item.product.productId,
              fromDate: fromDate,
              toDate: toDate,
              quantity: item.quantity,
            },
            {
              onSuccess: () => {
                toast.success(`Done!`, { icon: "✨" });
                setIsSubmitting(false);
                navigate('/inventory/reservations')
              },
              onError: errorHandler,
            }
          );
        },1000)
      });
    } else toast.error("All fields required!", { icon: "💣" });
  };

  if (!isAuthenticated) return null;
  return (
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
                max={dayjs().add(6, "month").add(1, "day").format("YYYY-MM-DD")}
                onChange={(event) => setToDate(event.target.value)}
                name="checkout"
              />
            </label>
          </div>
        </div>

        {cart.length > 0 && (
          <button type="button" onClick={checkout}>
            Checkout {cart.length} items
          </button>
        )}
      </fieldset>
      <fieldset className="options">
        <Select
          options={options}
          placeholder={"Select item ..."}
          isLoading={isLoading}
          onChange={addItem}
        />
      </fieldset>
      {cart.length === 0 && <>Your cart is empty.</>}
      {isSubmitting ? (
        <>
          We are submitting your reservations! Please wait!
        </>
      ) : (
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Form>
  );
};

export default InventoryReservationForm;
