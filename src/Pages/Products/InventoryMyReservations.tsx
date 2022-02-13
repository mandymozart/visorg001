import styled from "@emotion/styled";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import FadeInView from "../../Animations/FadeInView";
import Loader from "../../Components/Loader";
import Tag from "../../Components/Tag";
import { useGetReservationsForAddress } from "../../Hooks/InventoryQueries";
import { useWalletStore } from "../../Stores/WalletStore";
import InventoryReservationItem from "../Inventory/InventoryReservationItem";
import { InventoryEvent } from "./InventoryEvent";

dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);

const Container = styled.div`
  max-width: var(--content-width);
  margin: 0 auto;
  h2 {
    display: flex;
    justify-content: space-between;
  }
  &&& .stock {
    flex: auto;
  }
  .name {
    font-weight: bold;
  }
  .item {
    padding-bottom: 1rem;
  }
`;

const MyInventoryReservations = () => {
  const { address } = useWalletStore();
  const [reservations, setReservations] = useState<
    InventoryEvent[] | undefined
  >();
  const { mutate } = useGetReservationsForAddress();

  useEffect(() => {
    mutate(address, {
      onSuccess: (events) =>
        setReservations(
          events?.filter((event) => dayjs().isSameOrAfter(dayjs(event.toDate)))
        ),
    });
  }, [mutate, address, reservations, setReservations]);

  if (!reservations)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <Container>
      <FadeInView>
        <h2>
          My reservations <Tag>{reservations?.length}</Tag>
        </h2>
      </FadeInView>
      <FadeInView>
        {reservations?.length === 0 && (
          <>Nobody made reservations on your items, yet!</>
        )}
        <div className="results">
          {reservations?.map((item, index) => (
            <InventoryReservationItem item={item} key={index} />
          ))}
        </div>
      </FadeInView>
    </Container>
  );
};

export default MyInventoryReservations;
