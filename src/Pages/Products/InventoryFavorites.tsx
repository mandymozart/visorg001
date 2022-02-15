import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import FadeInView from "../../Animations/FadeInView";
import Cart from "../../Components/Cart/Cart";
import { useFavoriteStore } from "../../Stores/FavoritesStore";
import { Product } from "./Product";

const Container = styled.div`
  max-width: var(--content-width);
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

const InventoryFavorites = () => {
  const { user } = useAuth0();

  const products = useFavoriteStore((store) => store.products);
  const isLoading = useFavoriteStore((store) => store.isLoading);
  const isSubmitting = useFavoriteStore((store) => store.isSubmitting);
  const addItem = useFavoriteStore((store) => store.addItem);

  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const options = productsToOptions(products);
    setOptions(options);
  }, [products]);

  if (!user) return <></>;
  return (
    <Container>
      <FadeInView>
        <Form>
          <fieldset className="options">
            <Select
              options={options}
              placeholder={`Select item ... (${options.length})`}
              isLoading={isLoading}
              onChange={addItem}
            />
          </fieldset>
        </Form>
      </FadeInView>

      {isSubmitting ? (
        <FadeInView>We are submitting your reservations! Please wait!</FadeInView>
      ) : (
        <Cart />
      )}
    </Container>
  );
};

export default InventoryFavorites;
