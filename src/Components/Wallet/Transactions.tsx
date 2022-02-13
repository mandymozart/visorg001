import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import FadeInView from "../../Animations/FadeInView";
import {
  useGetBenefactorTransactions,
  useGetBeneficiaryTransactions
} from "../../Hooks/InventoryQueries";
import { Transaction } from "../../Pages/Wallet/Transaction";
import { useWalletStore } from "../../Stores/WalletStore";
import TransactionList from "./TransactionList";
import { TransactionType } from "./TransactionType";
dayjs.extend(relativeTime);

const Container = styled.div`
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 1rem;
`;

const Transactions = () => {
  const { user } = useAuth0();
  const {
    mutate: mutateBeneficiaryTransactions,
    isLoading: isLoadingBeneficiaryTransactions,
  } = useGetBeneficiaryTransactions();
  const {
    mutate: mutateBenefactorTransactions,
    isLoading: isLoadingBenefactorTransactions,
  } = useGetBenefactorTransactions();
  const address = useWalletStore((store) => store.address);
  const [beneficiaryTransactions, setBeneficiaryTransactions] =
    useState<Transaction[]>();
  const [benefactorTransactions, setBenefactorTransactions] =
    useState<Transaction[]>();

  useEffect(() => {
    mutateBeneficiaryTransactions(address, {
      onSuccess: (transactions) => setBeneficiaryTransactions(transactions),
    });
    mutateBenefactorTransactions(address, {
      onSuccess: (transactions) => setBenefactorTransactions(transactions),
    });
  }, [
    mutateBeneficiaryTransactions,
    mutateBenefactorTransactions,
    setBeneficiaryTransactions,
    setBenefactorTransactions,
    address
  ]);

  if (!user) return <></>;
  return (
    <FadeInView>
      <Container>
        <h4>Transaction history</h4>
        <TransactionList
          isLoading={isLoadingBeneficiaryTransactions}
          type={TransactionType.INCOMING}
          transactions={beneficiaryTransactions}
        />
        <TransactionList
          isLoading={isLoadingBenefactorTransactions}
          type={TransactionType.OUTGOING}
          transactions={benefactorTransactions}
        />
      </Container>
    </FadeInView>
  );
};

export default Transactions;
