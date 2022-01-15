import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import { enableMapSet } from "immer";
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { GiCalendar, GiStockpiles } from "react-icons/gi";
import { useCartStore } from "../../Stores/CartStore";

enableMapSet();

const Container = styled.div`
  &&& .stock {
    flex: auto;
  }
`;

const InventoryReservations = () => {
  const events = useCartStore((store) => store.events);
  const { user } = useAuth0();

  if (!user) return <></>
    return (
      <Container>
        {events?.length === 0 && <>Your cart is empty.</>}
        <div className="results">
          {events?.map((item) => {
            if (item.renter === user.nickname)
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
                  <span className="quantity">
                    <GiStockpiles /> {item.quantity}
                  </span>
                  <div className="dates">
                    <GiCalendar /> {item.fromDate} -{item.toDate} <br />
                  </div>
                  {/* <div className="actions">
                <button
                  type="button"
                  className="cancelReservation"
                  // onClick={() => removeItem(item.product.id)}
                >
                  <FiTrash />
                </button>
              </div> */}
                </div>
              );
          })}
        </div>
      </Container>
    );
};

export default InventoryReservations;