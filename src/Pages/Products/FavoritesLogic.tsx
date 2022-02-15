import React, { useEffect } from "react";
import { useGetProducts } from "../../Hooks/InventoryQueries";
import { useFavoriteStore } from "../../Stores/FavoritesStore";

const FavoritesLogic = () => {
  const { replaceProducts, setIsLoading } = useFavoriteStore();
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

export default FavoritesLogic;
