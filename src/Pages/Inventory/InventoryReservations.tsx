import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import { enableMapSet } from "immer";
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { GiClockwork, GiStockpiles } from "react-icons/gi";
import { useGetInventoryEvents } from "../../Hooks/Queries";

enableMapSet();

const Container = styled.div``;

const InventoryReservations = () => {
  const { isAuthenticated } = useAuth0();

  const {
    data: events,
    isLoading: isLoadingEvents,
    isSuccess: isSuccessEvents,
  } = useGetInventoryEvents();

  if (!isAuthenticated) return null;
  return (
    <Container>
      {events?.length === 0 && <>Your cart is empty.</>}
      <div className="results">
        {events?.map((item) => {
          return (
            <div className="item" key={item.eventId}>
              <div className="meta">
                <div className="name">{item.productId}</div>
                <div className="owner">
                  <span>
                    <FaUserAstronaut />
                  </span>{" "}
                  {item.renter}
                </div>
              </div>
              <div className="stock">
                <div className="price">
                  {item.fromDate} <GiClockwork /> -{item.toDate} <br />
                  <GiStockpiles /> {item.quantity}
                </div>
                <div className="actions">
                  <button
                    type="button"
                    className="cancelReservation"
                    // onClick={() => removeItem(item.product.id)}
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default InventoryReservations;
