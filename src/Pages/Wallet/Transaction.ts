export type TransactionBody = {
  transaction: Transaction;
};

export type Transaction = {
  transactionId: string;
  beneficiary: string;
  benefactor: string;
  tokens: number;
  date: string;
  status: string;
};
