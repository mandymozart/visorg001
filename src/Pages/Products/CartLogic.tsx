import React, { useEffect } from "react";
import { useGetProducts } from "../../Hooks/InventoryQueries";
import { useCartStore } from "../../Stores/CartStore";

const CartLogic = () => {
  const { replaceProducts, setIsLoading } = useCartStore();
  const { data: products, isLoading } = useGetProducts();

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    if (products)
      replaceProducts(products.filter((product) => product.isRental === "1"));
  }, [products, replaceProducts]);

  return <></>;
};

export default CartLogic;
