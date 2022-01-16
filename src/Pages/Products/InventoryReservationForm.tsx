import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { enableMapSet } from "immer";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import MiniCart from "../../Components/Cart/MiniCart";
import { useAddInventoryEvent } from "../../Hooks/Queries";
import { useCartStore } from "../../Stores/CartStore";
import { errorHandler } from "../../Utilities/ErrorHandlers";
import { Product } from "./Product";

enableMapSet();

const Container = styled.div`
  max-width: var(width);
  margin: 0 auto;
  text-align: center;
`;

const Form = styled.form`
  max-width: var(--form-width);
  margin: 0 auto;
  
  .options {
    position: sticky;
    text-align: left;
    top: 6rem;
    z-index: 10;
    margin: 0;
    padding: 1rem 0;
    background: yellow;
  }
  .results {
    text-align: center;
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
  const { user } = useAuth0();

  const products = useCartStore((store) => store.products);
  const cart = useCartStore((store) => store.items);
  const isLoading = useCartStore((store) => store.isLoading);
  const addItem = useCartStore((store) => store.addItem);
  const clearItems = useCartStore((store) => store.clearItems);

  const [options, setOptions] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState<string>(
    dayjs().add(1, "day").format("YYYY-MM-DD")
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mutation = useAddInventoryEvent();

  useEffect(() => {
    const options = productsToOptions(products);
    setOptions(options);
  }, [products]);

  const checkout = () => {
    if (user)
      if (fromDate !== "" && toDate !== "" && user.nickname) {
        setIsSubmitting(true);
        cart.forEach((item) => {
          // throttle requests
          setTimeout(() => {
            mutation.mutate(
              {
                eventId: nanoid(8),
                renter: user.nickname,
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
                  clearItems();
                  // navigate("/inventory/reservations");
                },
                onError: errorHandler,
              }
            );
          }, 1000);
        });
      } else toast.error("All fields required!", { icon: "💣" });
  };

  if (!user) return <></>;
  return (
    <Container>
      <Form>
        <fieldset>
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
      </Form>

      {isSubmitting ? (
        <>We are submitting your reservations! Please wait!</>
      ) : (
        <MiniCart />
      )}
    </Container>
  );
};

export default InventoryReservationForm;
