import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect } from "react";
import { useGetTransactions } from "../../Hooks/Queries";
import { useWalletStore } from "../../Stores/WalletStore";
import TransactionItem from "./TransactionItem";

dayjs.extend(relativeTime);

const Container = styled.div`
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 1rem;
`;

const Transactions = () => {
  const { user } = useAuth0();
  const { data: transactions } = useGetTransactions();
  const address = useWalletStore((store) => store.address);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);
  if (!user) return <></>;
  return (
    <Container>
      <h4>Transaction history</h4>
      {transactions?.length === 0 && <>No transactions recorded, yet.</>}
      <div className="incoming">
        <h5>Incoming</h5>
        {transactions?.map((transaction) => {
          if (transaction.beneficiary === address)
            return <TransactionItem type="outgoing" transaction={transaction} />;
        })}
      </div>
      <div className="outgoing">
        <h5>Outgoing</h5>
        {transactions?.map((transaction) => {
          if (transaction.benefactor === address)
            return <TransactionItem type="incoming" transaction={transaction} />;
        })}
      </div>
    </Container>
  );
};

export default Transactions;
