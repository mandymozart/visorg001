import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { GiCalendar } from "react-icons/gi";
import FadeInView from "../../Animations/FadeInView";
import { useCartStore } from "../../Stores/CartStore";
import { InventoryEvent } from "../Products/InventoryEvent";
dayjs.extend(relativeTime);

type Props = {
  item: InventoryEvent;
};

const InventoryReservationItem = ({ item }: Props) => {
  const { getProductByProductId } = useCartStore();

  return (
    <FadeInView>
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
      </div>
    </FadeInView>
  );
};

export default InventoryReservationItem;
