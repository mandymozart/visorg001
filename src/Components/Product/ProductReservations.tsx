import styled from "@emotion/styled";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import React, { useCallback, useEffect, useState } from "react";
import FadeInView from "../../Animations/FadeInView";
import { useGetReservationsForProduct } from "../../Hooks/InventoryQueries";
import { InventoryEvent } from "../../Pages/Products/InventoryEvent";
import { Product } from "../../Pages/Products/Product";
import ProductReservationItem from "../../Pages/Products/ProductReservationItem";
import { WalletStatus } from "../../Pages/Wallet/Wallet";
import { useProductStore } from "../../Stores/ProductStore";
import { useWalletStore } from "../../Stores/WalletStore";
import { overlap } from "../../Utilities/overlapDateRanges";
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
  event: InventoryEvent[] | undefined,
  fromDate: string,
  toDate: string
) => {
  let amount = 0;
  event?.filter((item) => {
    if (
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


const ProductReservations = ({ product }: Props) => {
  const { mutate, isLoading, isError } = useGetReservationsForProduct();
  const { fromDate, toDate } = useProductStore();
  const {status } = useWalletStore()
  const { availableQuantity, setAvailableQuantity } = useProductStore();
  const [reservations, setReservations] = useState<
    InventoryEvent[] | undefined
  >();
  const [futureReservations, setFutureReservations] = useState<
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
        },
      });
  }, [mutate, setReservations, product]);

  // Update on date range change
  const checkAvailability = useCallback(() => {
    const amount = getReservationsAmountBetweenDates(
      reservations,
      fromDate,
      toDate
    );
    console.log("check availability ...", fromDate, toDate, amount);
    setAvailableQuantity(product.amountInStock - amount);
    setFutureReservations(
      reservations?.filter((item) => {
        if (dayjs(item.fromDate).isAfter(dayjs(toDate))) return item;
      })
    );
    setActiveReservations(
      reservations?.filter((item) => {
        if (
          overlap([
            { start: new Date(fromDate), end: new Date(toDate) },
            { start: new Date(item.fromDate), end: new Date(item.toDate) },
          ]).overlap
        )
          return item;
      })
    );
  }, [fromDate, toDate, reservations, product]);
  useEffect(() => {
    checkAvailability();
  }, [fromDate, toDate, checkAvailability]);

  // Update on date range change
  useEffect(() => {}, [
    reservations,
    setFutureReservations,
    setActiveReservations,
    fromDate,
    toDate,
  ]);

  if (!product) return <>No product id provided.</>;
  if (isLoading) return <Loader />;
    if(status !== WalletStatus.ACTIVE) return <></>
  if (isError) return <>Sorry, an error occured!</>;
  if(!activeReservations && !futureReservations ) return <></>
  return (
    <FadeInView>
      <Container>
        {/* <h2>{pluralize("unit", availableQuantity, true)} available</h2> */}
        {/* <h3>{dayjs(fromDate).format("DD.MM")} &mdash; {dayjs(toDate).format("DD.MM.YYYY")}</h3> */}
        {activeReservations && activeReservations.length > 0 && (
          <>
            <h5>
              Active <Tag>{activeReservations?.length}</Tag>
            </h5>
            {activeReservations?.map((item, index) => (
              <ProductReservationItem item={item} key={index} />
            ))}
          </>
        )}
        {futureReservations && futureReservations.length > 0 && (
          <>
            <h5>
              Future <Tag>{futureReservations?.length}</Tag>
            </h5>
            {futureReservations?.map((item, index) => (
              <ProductReservationItem item={item} key={index} />
            ))}
          </>
        )}
      </Container>
    </FadeInView>
  );
};

export default ProductReservations;
