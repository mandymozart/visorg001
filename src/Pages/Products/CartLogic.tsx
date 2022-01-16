import React, { useEffect } from "react";
import { useGetInventoryEvents, useGetProducts } from "../../Hooks/Queries";
import { useCartStore } from "../../Stores/CartStore";

const CartLogic = () => {
  const replaceProducts = useCartStore((store) => store.replaceProducts);
  const replaceEvents = useCartStore((store) => store.replaceEvents);
  const setIsLoading = useCartStore((store) => store.setIsLoading);
  const { data: products, isLoading } = useGetProducts();
  const {
    data: events,
    isLoading: isLoadingEvents,
  } = useGetInventoryEvents();

  useEffect(() => {
    setIsLoading(isLoading)
  },[isLoading, isLoadingEvents,setIsLoading])

  useEffect(() => {
    if (products) replaceProducts(products);
  }, [products, replaceProducts]);

  useEffect(() => {
    if (events) replaceEvents(events);
  }, [events, replaceEvents]);

  return <></>;
};

export default CartLogic;
