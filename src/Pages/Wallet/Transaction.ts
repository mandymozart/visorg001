export type TransactionBody = {
  transaction: Transaction;
};

export enum TransactionStatus {
  RECEIVED = "received",
}

export type Transaction = {
  transactionId: string;
  referenceText?: string;
  beneficiary: string;
  benefactor: string;
  amount: number;
  createdDate: string;
  updatedUpdate: string;
  status: TransactionStatus;
};
