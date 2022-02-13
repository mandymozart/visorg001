import styled from "@emotion/styled";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import FadeInView from "../../Animations/FadeInView";
import Tag from "../../Components/Tag";
import { useWalletStore } from "../../Stores/WalletStore";
import { InventoryEvent } from "../Products/InventoryEvent";

dayjs.extend(relativeTime);

const Container = styled.div`
  border-top: 1px solid var(--color);
  padding: 0.5rem 0;
  &&&.isOwner {
      color: var(--third);
  }
`;

type Props = {
  item: InventoryEvent;
};

const ProductReservationItem = ({ item }: Props) => {
  const { address } = useWalletStore();
  return (
    <FadeInView>
      <Container className={clsx({ isOwner: item.renter === address })}>
        <div className="meta">
          <div className="dates">
            <small>
              {item.fromDate} - {item.toDate} <br />
            </small>
          </div>
          <div className="renter">
            <span className="quantity">
              {item.quantity} unit{item.quantity > 1 && "s"} by{" "}
            </span>
            <Tag>
              <FaUserAstronaut />{" "}
              {item.renter === address ? "Yourself" : item.renter}
            </Tag>
          </div>
        </div>
      </Container>
    </FadeInView>
  );
};

export default ProductReservationItem;
