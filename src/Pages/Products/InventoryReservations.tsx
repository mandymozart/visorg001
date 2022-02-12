import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { GiCalendar } from "react-icons/gi";
import FadeInView from "../../Animations/FadeInView";
import { useCartStore } from "../../Stores/CartStore";
import { useWalletStore } from "../../Stores/WalletStore";

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
  const { events, getProductByProductId } = useCartStore();
  const { user } = useAuth0();
  const { abbreviation } = useWalletStore();

  if (!user) return <></>;
  return (
    <Container>
      <FadeInView>
        {events?.length === 0 && <>Your cart is empty.</>}
        <div className="results">
          {events
            ?.filter(
              (event) =>
                event.type === "reservation" && // match only reservations
                dayjs().isBefore(dayjs(event.fromDate))
            )
            ?.map((item) => {
              console.log(item);
              if (item.renter === abbreviation)
                return (
                  <div className="item" key={item.eventId}>
                    <div className="meta">
                      <div className="name">
                        {getProductByProductId(item.productId)?.name}
                      </div>
                      <div className="abbreviation">
                        <span className="quantity">
                          {item.quantity} unit{item.quantity > 1 && "s"} from{" "}
                        </span>
                        <span>
                          <FaUserAstronaut />
                        </span>{" "}
                        {getProductByProductId(item.productId)?.abbreviation}{" "}
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
      </FadeInView>
    </Container>
  );
};

export default InventoryReservations;
