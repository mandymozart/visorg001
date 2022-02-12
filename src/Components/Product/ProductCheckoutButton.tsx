import { useAuth0 } from "@auth0/auth0-react";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiToken } from "react-icons/gi";
import { config } from "../../config";
import {
  useAddInventoryEvent,
  useAddTransaction,
  useGetWallets,
  useUpdateWallets
} from "../../Hooks/InventoryQueries";
import { Wallet, WalletStatus } from "../../Pages/Wallet/Wallet";
import { useProductStore } from "../../Stores/ProductStore";
import { useReservationSubmissionStore } from "../../Stores/ReservationSubmissionStore";
import { useWalletStore } from "../../Stores/WalletStore";
import { successHandler } from "../../Utilities/ErrorHandlers";
import { PrimaryButton } from "../FormElements/Button";

const updateBalance = (prev: Wallet, newBalance: number): Wallet => {
  return {
    id: prev.id,
    address: prev.address,
    owner: prev.owner,
    abbreviation: prev.abbreviation,
    balance: newBalance,
    lastUpdate: dayjs().format(),
    status: prev.status,
  };
};

const ProductCheckoutButton = () => {
  const { user } = useAuth0();

  // Cart store
  const { selectedProduct, quantity, getFees, getItemSum, fromDate, toDate } =
    useProductStore();

  // Wallet store / benefactor
  const { abbreviation, address, balance, deductTokens, bakeWallet, status } =
    useWalletStore();

  // Beneficiary wallet
  const [beneficiary, setBeneficiary] = useState<Wallet>({
    id: 0,
    abbreviation: "",
    address: "",
    owner: "",
    balance: 0,
    status: WalletStatus.UNAUTHORIZED,
    lastUpdate: "",
  });

  // Bank wallet
  const [bank, setBank] = useState<Wallet>({
    id: 0,
    abbreviation: "vis",
    address: "6b9e0bab-ae49-43a4-8cda-49a9b17f9c61",
    owner: "auth0|60dc9dd80605b20072d6bc85",
    balance: 0,
    status: WalletStatus.ACTIVATE,
    lastUpdate: "",
  });

  // Reservation submission store
  const {
    isSubmitting,
    success,
    failed,
    ready,
    setSuccess,
    setFailed,
    setIsSubmitting,
    setReady,
    finishedSubmitIventoryEvent,
    finishedLogTransaction,
    finishedDeductFundsFromBenefactor,
    finishedSendFundsToBeneficiary,
    finishedSendReport,
    setFinishedSubmitIventoryEvent,
    setFinishedLogTransaction,
    setFinishedDeductFundsFromBenefactor,
    setFinishedSendFundsToBeneficiary,
    setFinishedSendFees,
    setFinishedSendReport,
  } = useReservationSubmissionStore();

  // Queries
  const { data: wallets } = useGetWallets();
  const addInventoryEvent = useAddInventoryEvent();
  const addTransaction = useAddTransaction();
  const updateWallets = useUpdateWallets();

  const errorHandler = (error: any) => {
    setFailed(true);
    setIsSubmitting(false);
    setSuccess(false);
    toast.error(`${error}`, { icon: "💣" });
  };

  /**
   * Submit inventory event
   */
  const submitInventoryEvent = () => {
    const newInventoryEvent = {
      eventId: nanoid(16),
      renter: abbreviation,
      type: "reservation",
      productId: selectedProduct?.productId || "",
      fromDate: fromDate,
      toDate: toDate,
      quantity: quantity,
    };
    addInventoryEvent.mutate(newInventoryEvent, {
      onSuccess: () => setFinishedSubmitIventoryEvent(true),
      onError: errorHandler,
    });
  };

  /**
   * Log transaction
   */
  const logTransaction = () => {
    const transcation = {
      transactionId: nanoid(16),
      beneficiary: beneficiary.address,
      benefactor: address,
      tokens: getItemSum(abbreviation),
      date: dayjs().format(),
      status: "received",
    };
    console.log("logTransaction", transcation);
    addTransaction.mutate(transcation, {
      onSuccess: () => setFinishedLogTransaction(true),
      onError: successHandler,
    });
  };

  /**
   * Send funds to beneficary
   */
  const sendFundsToBeneficiary = () => {
    const newBeneficiary: Wallet = updateBalance(
      beneficiary,
      beneficiary.balance + getItemSum(abbreviation)
    );
    console.log("sendFundsToBeneficiary", newBeneficiary);
    updateWallets.mutate(newBeneficiary, {
      onSuccess: () => setFinishedSendFundsToBeneficiary(true),
      onError: errorHandler,
    });
  };

  /**
   * Send funds to beneficary
   * skipped if BANK
   */
  const sendFees = () => {
    if (abbreviation === config.BANK_WALLET_ABBREVIATION) {
      setFinishedSendFees(true);
    } else {
      const newWallet: Wallet = updateBalance(
        bank,
        bank.balance + getItemSum(abbreviation)
      );
      console.log("sendFees", newWallet);
      updateWallets.mutate(newWallet, {
        onSuccess: () => setFinishedSendFees(true),
        onError: errorHandler,
      });
    }
  };

  /**
   * Deduct funds from benefactor
   * skip if benefactor is bank
   * benefactor is also responsible for fees
   */
  const deductFundsFromBenefactor = () => {
    if (abbreviation === config.BANK_WALLET_ABBREVIATION) {
      setFinishedDeductFundsFromBenefactor(true);
    } else {
      deductTokens(getItemSum(abbreviation));
      const benefactor = bakeWallet();
      const newBenefactor: Wallet = updateBalance(
        benefactor,
        benefactor.balance - getItemSum(abbreviation) - getFees(abbreviation)
      );
      console.log("deductFundsFromBenefactor", newBenefactor);
      updateWallets.mutate(newBenefactor, {
        onSuccess: () => setFinishedDeductFundsFromBenefactor(true),
        onError: errorHandler,
      });
    }
  };

  /**
   * Purchase item with VIS Token
   * TODO: Refetch wallets' balance before updating.
   * WARNING - Currently when sending two requests to the same wallet, only the last transaction is locked.
   * @returns void
   */
  const purchase = () => {
    if (!selectedProduct) {
      errorHandler(new Error(`No product selected`));
      return;
    }
    if (quantity < 1) {
      errorHandler(new Error(`Insufficient quantities available`));
      return;
    }
    if (status === WalletStatus.UNAUTHORIZED) {
      errorHandler(new Error(`Your wallet is unauthorized`));
      return;
    }
    if (status === WalletStatus.SUSPENDED) {
      errorHandler(new Error(`You wallet is suspended`));
      return;
    }
    const beneficiary = wallets?.find(
      (wallet) => wallet.abbreviation === selectedProduct.abbreviation
    );
    if (!beneficiary) {
      errorHandler(
        new Error(
          `Beneficiary ${selectedProduct.abbreviation} wallet not found`
        )
      );
      return;
    }
    const bank = wallets?.find(
      (wallet) => wallet.address === config.BANK_WALLET_ADDRESS
    );
    if (!bank) {
      errorHandler(new Error(`Bank wallet not found`));
      return;
    }

    setBeneficiary(beneficiary);
    setBank(bank);
    setReady(true);
  };

  useEffect(() => {
    console.log(quantity, ready);
    if (ready) {
      setIsSubmitting(true);
      submitInventoryEvent();
      sendFundsToBeneficiary();
      deductFundsFromBenefactor();
      logTransaction();
      sendFees();

      const message = `You paid ${getItemSum(abbreviation)} (+ ${getFees(
        abbreviation
      )}) to ${beneficiary.abbreviation} (${beneficiary.address})`;
      toast.success(message);
    }
  }, [ready, bank, beneficiary]);

  useEffect(() => {
    if (
      finishedDeductFundsFromBenefactor &&
      finishedLogTransaction &&
      finishedSendFundsToBeneficiary &&
      finishedSubmitIventoryEvent
    ) {
      setIsSubmitting(false);
    }
  }, [
    finishedDeductFundsFromBenefactor,
    finishedLogTransaction,
    finishedSendFundsToBeneficiary,
    finishedSubmitIventoryEvent,
    setIsSubmitting,
    setSuccess,
  ]);

  if (!user) return <></>;
  if (!selectedProduct) return <></>;
  return (
    <PrimaryButton
      isLoading={isSubmitting}
      success={success}
      failed={failed}
      type="button"
      onClick={purchase}
    >
      Reserve{" "}
      {abbreviation !== selectedProduct.abbreviation && (
        <>
          for <GiToken /> {getItemSum(abbreviation) + getFees(abbreviation)}
        </>
      )}
    </PrimaryButton>
  );
};

export default ProductCheckoutButton;
