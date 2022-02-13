import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import FadeInView from "../../Animations/FadeInView";
import SelectedProduct from "../../Components/Product/SelectedProduct";
import { useCartStore } from "../../Stores/CartStore";
import { useProductStore } from "../../Stores/ProductStore";
import { useReservationSubmissionStore } from "../../Stores/ReservationSubmissionStore";
import { Product } from "./Product";

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

const InventoryProducts = () => {
  const { productId } = useParams();
  const { user } = useAuth0();

  const {
    products,
    isLoading,
    isSubmitting,
    getProduct,
    getProductByProductId,
  } = useCartStore();
  const { fromDate, toDate, setFromDate, setToDate } = useProductStore();

  const { setSelectedProduct, reset } = useProductStore();
  const { reset: resetReservation } = useReservationSubmissionStore();

  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const options = productsToOptions(products);
    setOptions(options);
  }, [products]);

  const select = ({ value }: any) => {
    const product = getProduct(value);

    if (product) {
      resetReservation();
      reset();
      setSelectedProduct(product);
    }
  };

  useEffect(() => {
    if (productId) {
      const product = getProductByProductId(productId);
      if (product) setSelectedProduct(product);
    }
  }, [productId, getProductByProductId, setSelectedProduct]);

  if (!user) return <></>;
  return (
    <Container>
      <FadeInView>
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
              placeholder={`Select item ... (${products.length})`}
              isLoading={isLoading}
              onChange={select}
            />
          </fieldset>
        </Form>
      </FadeInView>

      {isSubmitting ? (
        <FadeInView>
          We are submitting your reservations! Please wait!
        </FadeInView>
      ) : (
        <SelectedProduct />
      )}
    </Container>
  );
};

export default InventoryProducts;
