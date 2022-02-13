import styled from "@emotion/styled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import FadeInView from "../../Animations/FadeInView";
import { Transaction } from "../../Pages/Wallet/Transaction";
import TransactionItem from "./TransactionItem";
import { TransactionType } from "./TransactionType";

dayjs.extend(relativeTime);

const Container = styled.div`
  line-height: 1.5;
  margin-bottom: 2rem;
  h5 {
    text-transform: capitalize;
    margin: 1rem 0;
  }
`;

const TransactionsHeader = styled.div`
  display: grid;
  grid-template-columns: 9rem 1fr 1fr 5rem;
  gap: 1rem;
  width: 100%;
  line-height: 3;
  border-bottom: 1px solid var(--color);
  div:last-of-type {
    text-align: right;
  }
`;

type Props = {
  transactions: Transaction[] | undefined;
  isLoading: boolean;
  type: TransactionType;
};
const TransactionList = ({ transactions, type }: Props) => {
  return (
    <FadeInView>
      <Container>
        <h5>{type}</h5>
        {transactions?.length === 0 ? (
          <>No transactions recorded, yet.</>
        ) : (
          <>
            <TransactionsHeader>
              <div className="text-sm">Date</div>
              <div className="text-sm">Wallet address</div>
              <div className="text-sm">Reference text</div>
              <div className="text-sm">Amount</div>
            </TransactionsHeader>
            {transactions?.map((transaction,index) => (
              <TransactionItem
                type={type}
                transaction={transaction}
                key={index}
              />
            ))}
          </>
        )}
      </Container>
    </FadeInView>
  );
};

export default TransactionList;
