import styled from "@emotion/styled";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import pluralize from "pluralize";
import React, { useCallback, useEffect, useState } from "react";
import { useGetReservationsForProduct } from "../../Hooks/InventoryQueries";
import { InventoryEvent } from "../../Pages/Products/InventoryEvent";
import { Product } from "../../Pages/Products/Product";
import ProductReservationItem from "../../Pages/Products/ProductReservationItem";
import { useProductStore } from "../../Stores/ProductStore";
import { DateRange, overlap } from "../../Utilities/overlapDateRanges";
import { Button } from "../FormElements/Button";
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
  reservations?.filter((item) => {
    if (
      item.productId === productId &&
      // dayjs(fromDate).isBetween(dayjs(item.fromDate), dayjs(item.toDate)) &&
      // !dayjs(toDate).isBetween(dayjs(item.fromDate), dayjs(item.toDate))
      overlap([
        { start: new Date(fromDate), end: new Date(toDate) },
        { start: new Date(item.fromDate), end: new Date(item.toDate) },
      ]).overlap
    )
      amount = amount + item.quantity;
    return item;
  });
  return amount;
};

const eventsToDateRanges = (events: InventoryEvent[]) => {
  let results: DateRange[] = [];
  events.forEach((event) => {
    results.push({
      start: new Date(event.fromDate),
      end: new Date(event.toDate),
    });
  });
  return results;
};

const ProductReservations = ({ product }: Props) => {
  const { mutate, isLoading, isError } = useGetReservationsForProduct();
  const { fromDate, toDate } = useProductStore();
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
          setFutureReservations(
            results?.filter((item) => {
              // future reservations
              if (dayjs(item.fromDate).isSameOrAfter(dayjs())) return item;
            })
          );
          setPastReservations(
            results?.filter((item) => {
              if (dayjs(item.toDate).isBefore(dayjs())) return item;
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
  }, [mutate, setReservations, product]);

  const checkAvailability = useCallback(() => {
    const amount = getReservationsAmountBetweenDates(
      product.productId,
      reservations,
      fromDate,
      toDate
    );
    console.log("check availability ...", fromDate, toDate, amount);
    setAvailableAmount(product.amountInStock - amount);
  }, [fromDate, toDate, reservations, product]);

  useEffect(() => {
    checkAvailability();
  }, [fromDate, toDate, checkAvailability]);

  if (!product) return <>No product id provided.</>;
  if (isLoading) return <Loader />;
  if (isError) return <>Sorry, an error occured!</>;
  return (
    <Container>
      <Button onClick={() => checkAvailability()}>Check availability</Button>
      {availableAmount && (
        <h2>{pluralize("unit", availableAmount, true)} available</h2>
      )}
      <h3>Today</h3>
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
