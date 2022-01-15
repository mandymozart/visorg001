import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import produce, { enableMapSet } from "immer";
import React, { useCallback, useEffect, useState } from "react";
import { CgEuro } from "react-icons/cg";
import { FaUserAstronaut } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GiToken } from "react-icons/gi";
import Select from "react-select";
import Layout from "../../Components/Layout";

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

const productsToOptions = (products: Product[]) => {
  let options: any = [];
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

type Product = {
  id: string;
  name: string;
  status: string;
  partNumber: string;
  url: string;
  description: string;
  pricingType: string;
  pricingFactor: string;
  costPrice: string;
  listPrice: string;
  unitPrice: string;
  createdAt: string;
  modifiedAt: string;
  weight: string;
  isTaxFree: string;
  owner: string;
  amount: number;
  amountInStock: number;
  isRental: string;
  isOnPremiseUseOnly: string;
  memberPrice: string;
  costPriceCurrency: string;
  listPriceCurrency: string;
  unitPriceCurrency: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  costPriceConverted: string;
  listPriceConverted: string;
  unitPriceConverted: string;
  createdById: string;
  createdByName: string;
  modifiedById: string;
  modifiedByName: string;
  contactId: string;
  contactName: string;
};

type CartItem = {
  quantity: number;
  product: Product;
};

const Inventory = () => {
  const { isAuthenticated } = useAuth0();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selected, setSelected] = useState<Product>();
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = () => {
      let url =
        "https://api.sheety.co/6f92f2531f272b85130005f9d671fb6e/inventory/products";
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          const options = productsToOptions(json.products);
          setOptions(options);
          setProducts(json.products);
        });
    };
    getProducts();
  }, []);

  const handleChange = ({ value }: any) => {
    const id: unknown = value;
    // set selected
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

  if (!isAuthenticated) return null;
  if (!products) return null;
  return (
    <Layout>
      <h2>Rent items from portal</h2>
      <Form>
        <fieldset>
          <legend></legend>
          <div className="field">
            <label>
              Alias
              <input type="text" name="alias" maxLength={3} />
            </label>
          </div>

          <div className="fieldGroup">
            <div className="field">
              <label>
                From
                <input type="date" name="checkin" />
              </label>
            </div>

            <div className="field">
              <label>
                To
                <input type="date" name="checkout" />
              </label>
            </div>
          </div>
          
          <button type="button">Checkout {cart.length} items</button>
        </fieldset>
        <fieldset>
          <h3>Itineary</h3>
          <label>
            <Select
              options={options}
              placeholder={"Select item ..."}
              onChange={handleChange}
            />
          </label>
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
        <hr />
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
