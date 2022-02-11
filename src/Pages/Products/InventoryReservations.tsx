import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { GiCalendar } from "react-icons/gi";
import FadeIn from "../../Animations/FadeIn";
import { useCartStore } from "../../Stores/CartStore";

dayjs.extend(relativeTime);

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
  const events = useCartStore((store) => store.events);
  const getProduct = useCartStore((store) => store.getProduct);
  const { user } = useAuth0();

  if (!user) return <></>;
  return (
    <Container>
      <FadeIn>
        {events?.length === 0 && <>Your cart is empty.</>}
        <div className="results">
          {events?.map((item) => {
            if (item.renter === user.nickname)
              return (
                <div className="item" key={item.eventId}>
                  <div className="meta">
                    <div className="name">
                      {getProduct(item.productId)?.name}
                    </div>
                    <div className="owner">
                      <span className="quantity">
                        {item.quantity} unit{item.quantity > 1 && "s"} from{" "}
                      </span>
                      <span>
                        <FaUserAstronaut />
                      </span>{" "}
                      {getProduct(item.productId)?.owner}{" "}
                      {dayjs(item.toDate).fromNow()}
                    </div>
                  </div>
                  <div className="dates">
                    <small>
                      <GiCalendar /> {item.fromDate} - {item.toDate} <br />
                    </small>
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
      </FadeIn>
    </Container>
  );
};

export default InventoryReservations;
