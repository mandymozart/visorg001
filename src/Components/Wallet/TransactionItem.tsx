import styled from "@emotion/styled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { GiCalendar, GiToken } from "react-icons/gi";
import { Transaction } from "../../Pages/Wallet/Transaction";

dayjs.extend(relativeTime);

const Container = styled.div`
  padding: 0;
  border-top: 1px solid var(--color);
  display: flex;
  gap: 1rem;
  .amount {
      text-align: right;
  }
`;

type Props = {
  transaction: Transaction;
  type: "incoming" | "outgoing";
};
const TransactionItem = ({ transaction, type }: Props) => {
  return (
    <Container>
      <div className="dates">
        <small>
          <GiCalendar />
          {dayjs(transaction.date).format("YYYY-MM-DD HH:mm:ss")}
        </small>
      </div>
      <div className="address">
        {type === "outgoing" ? transaction.benefactor : transaction.beneficiary}
      </div>
      <div className="amount">
        <GiToken /> {transaction.tokens}
      </div>
    </Container>
  );
};

export default TransactionItem;
