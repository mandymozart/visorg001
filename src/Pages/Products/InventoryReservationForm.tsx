import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { enableMapSet } from "immer";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import FadeIn from "../../Animations/FadeIn";
import Cart from "../../Components/Cart/Cart";
import { useCartStore } from "../../Stores/CartStore";
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
  const isLoading = useCartStore((store) => store.isLoading);
  const isSubmitting = useCartStore((store) => store.isSubmitting);
  const addItem = useCartStore((store) => store.addItem);
  const fromDate = useCartStore((store) => store.fromDate);
  const toDate = useCartStore((store) => store.toDate);
  const setFromDate = useCartStore((store) => store.setFromDate);
  const setToDate = useCartStore((store) => store.setToDate);

  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const options = productsToOptions(products);
    setOptions(options);
  }, [products]);

  if (!user) return <></>;
  return (
    <Container>
      <FadeIn>
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
      </FadeIn>

      {isSubmitting ? (
        <FadeIn>We are submitting your reservations! Please wait!</FadeIn>
      ) : (
        <Cart />
      )}
    </Container>
  );
};

export default InventoryReservationForm;
