import styled from "@emotion/styled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { GiToken } from "react-icons/gi";
import FadeInView from "../../Animations/FadeInView";
import { Transaction } from "../../Pages/Wallet/Transaction";
import { TransactionType } from "./TransactionType";

dayjs.extend(relativeTime);

const Container = styled.div`
  padding: 0;
  border-bottom: 1px solid var(--color);
  line-height: 2;
  display: grid;
  grid-template-columns: 9rem 5rem auto 5rem;
  gap: 1rem;
  .amount {
    text-align: right;
  }
  div {
    word-break: break-word;
  }
  @media (max-width: 600px){
    display: block;
  }
`;

type Props = {
  transaction: Transaction;
  type: TransactionType;
};
const TransactionItem = ({ transaction, type }: Props) => {
  return (
    <FadeInView>
      <Container>
        <div className="dates">
          <small>
            {dayjs(transaction.createdDate).format("YYYY-MM-DD HH:mm:ss")}
          </small>
        </div>
        <div className="address">
          {type === "outgoing"
            ? transaction.beneficiary
            : transaction.benefactor}
        </div>
        <div className="referenceText">
          {transaction.referenceText}
        </div>
        <div className="amount">
          {type === TransactionType.OUTGOING ? "-" : ""}{transaction.amount} <GiToken />
        </div>
      </Container>
    </FadeInView>
  );
};

export default TransactionItem;
