import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import FadeInView from "../../Animations/FadeInView";
import Tag from "../../Components/Tag";
import { useFavoriteStore } from "../../Stores/FavoritesStore";
import { InventoryEvent } from "../Products/InventoryEvent";
dayjs.extend(relativeTime);

type Props = {
  item: InventoryEvent;
};

const InventoryReservationItem = ({ item }: Props) => {
  const { getProductByProductId } = useFavoriteStore();

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
            <Tag>
              <FaUserAstronaut />{" "}
              {getProductByProductId(item.productId)?.abbreviation}{" "}
            </Tag>
            {dayjs(item.toDate).fromNow()}
          </div>
        </div>
        <div className="dates">
          {item.fromDate} &mdash; {item.toDate} <br />
        </div>
      </div>
    </FadeInView>
  );
};

export default InventoryReservationItem;
