import styled from "@emotion/styled";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import FadeInView from "../../Animations/FadeInView";
import { useGetReservationsForAddress } from "../../Hooks/InventoryQueries";
import { useWalletStore } from "../../Stores/WalletStore";
import InventoryReservationItem from "../Inventory/InventoryReservationItem";
import { InventoryEvent } from "./InventoryEvent";

dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);

const Container = styled.div`
  max-width: var(--content-width);
  margin: 0 auto;
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

const InventoryReservations = () => {
  const { address } = useWalletStore();
  const [reservations, setReservations] = useState<
    InventoryEvent[] | undefined
  >();
  const { mutate, isLoading } = useGetReservationsForAddress();

  useEffect(() => {
    mutate(address, {
      onSuccess: (events) => setReservations(events),
    });
  }, [mutate, address, reservations, setReservations]);

  // if (isLoading) return <Loader />;
  return (
    <Container>
      <FadeInView>
        <h2>Reservations</h2>
      </FadeInView>
      <FadeInView>
        {reservations?.length === 0 && (
          <>No reservations of your items upcoming</>
        )}
        <div className="results">
          {reservations
            ?.filter((event) => dayjs().isSameOrAfter(dayjs(event.fromDate)))
            ?.map((item) => (
              <InventoryReservationItem item={item} />
            ))}
        </div>
      </FadeInView>
    </Container>
  );
};

export default InventoryReservations;
