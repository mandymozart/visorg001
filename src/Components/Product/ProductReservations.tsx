import styled from "@emotion/styled";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import pluralize from "pluralize";
import React, { useEffect, useState } from "react";
import { useGetReservationsForProduct } from "../../Hooks/InventoryQueries";
import { InventoryEvent } from "../../Pages/Products/InventoryEvent";
import { Product } from "../../Pages/Products/Product";
import ProductReservationItem from "../../Pages/Products/ProductReservationItem";
import { useCartStore } from "../../Stores/CartStore";
import Loader from "../Loader";
import Tag from "../Tag";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const Container = styled.div`
  max-width: var(--form-width);
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  margin: 0 auto;
  padding: 2rem 0;
  text-align: left;
`;

type Props = {
  product: Product;
};

const getReservationsAmountBetweenDates = (
  productId: string,
  reservations: InventoryEvent[] | undefined,
  fromDate: string,
  toDate: string
) => {
  let amount = 0;
  reservations
    ?.filter((item) => item.productId === productId)
    ?.filter((item) => {
      if (dayjs(fromDate).isBetween(dayjs(item.fromDate), dayjs(item.toDate)))
        return item;
    })
    ?.filter((item) => {
      if (
        dayjs(fromDate).isSameOrBefore(dayjs(item.toDate)) &&
        dayjs(toDate).isBetween(dayjs(item.fromDate), dayjs(item.toDate))
      )
        return item;
    })
    ?.filter((item) => {
      if (
        dayjs(toDate).isBetween(dayjs(item.fromDate), dayjs(item.toDate)) &&
        dayjs(toDate).isSameOrAfter(dayjs(item.toDate))
      )
        return item;
    })
    ?.forEach((item) => {
      amount = amount + item.quantity;
    });
  return amount;
};

const ProductReservations = ({ product }: Props) => {
  const { mutate, isLoading, isError } = useGetReservationsForProduct();
  const { fromDate, toDate } = useCartStore();
  const [availableAmount, setAvailableAmount] = useState<number>();
  const [reservations, setReservations] = useState<
    InventoryEvent[] | undefined
  >();
  const [futureReservations, setFutureReservations] = useState<
    InventoryEvent[] | undefined
  >();
  const [pastReservations, setPastReservations] = useState<
    InventoryEvent[] | undefined
  >();
  const [activeReservations, setActiveReservations] = useState<
    InventoryEvent[] | undefined
  >();

  useEffect(() => {
    if (product)
      mutate(product.productId, {
        onSuccess: (results) => {
          setReservations(results);
          setAvailableAmount(
            product.amountInStock -
              getReservationsAmountBetweenDates(
                product.productId,
                results,
                fromDate,
                toDate
              )
          );
          setFutureReservations(
            results?.filter((item) => {
              // future reservations
              if (dayjs(item.fromDate).isSameOrAfter(dayjs())) return item;
            })
          );
          setPastReservations(
            results?.filter((item) => {
              if (dayjs(item.toDate).isSameOrBefore(dayjs())) return item;
            })
          );
          setActiveReservations(
            results?.filter((item) => {
              if (dayjs().isBetween(dayjs(item.fromDate), dayjs(item.toDate)))
                return item;
            })
          );
        },
      });
  }, [mutate, setReservations, product, setAvailableAmount,fromDate,toDate,]);

  if (!product) return <>No product id provided.</>;
  if (isLoading) return <Loader />;
  if (isError) return <>Sorry, an error occured!</>;
  return (
    <Container>
      <h2>{pluralize("unit",availableAmount, true)} available</h2>
      <h5>
        Active reservations <Tag>{activeReservations?.length}</Tag>
      </h5>
      {activeReservations?.map((item, index) => (
        <ProductReservationItem item={item} key={index} />
      ))}
      <h5>
        Future reservations <Tag>{futureReservations?.length}</Tag>
      </h5>
      {futureReservations?.map((item, index) => (
        <ProductReservationItem item={item} key={index} />
      ))}
      <h5>
        Past reservations <Tag>{pastReservations?.length}</Tag>
      </h5>
      {pastReservations?.map((item, index) => (
        <ProductReservationItem item={item} key={index} />
      ))}
    </Container>
  );
};

export default ProductReservations;
