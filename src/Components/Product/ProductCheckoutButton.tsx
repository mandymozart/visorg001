import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FiRefreshCcw } from "react-icons/fi";
import { GiToken } from "react-icons/gi";
import { config } from "../../config";
import {
  fetchWallet,
  postAddInventoryEvent,
  postAddTransaction,
  postBalanceUpdate
} from "../../Hooks/InventoryApi";
import { useGetWallets } from "../../Hooks/InventoryQueries";
import {
  InventoryEventStatus,
  InventoryEventType
} from "../../Pages/Products/InventoryEvent";
import { WalletStatus } from "../../Pages/Wallet/Wallet";
import { useProductStore } from "../../Stores/ProductStore";
import { useReservationSubmissionStore } from "../../Stores/ReservationSubmissionStore";
import { useWalletStore } from "../../Stores/WalletStore";
import { PrimaryButton } from "../FormElements/Button";

const Container = styled(PrimaryButton)``;

const PlaceholderText = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
`;

const ProductCheckoutButton = () => {
  const { user } = useAuth0();

  const { selectedProduct, quantity, getFees, getItemSum, fromDate, toDate } =
    useProductStore();
  const { abbreviation, address, status } = useWalletStore();
  const { availableQuantity, reset: resetProduct } = useProductStore();
  const {
    isSubmitting,
    success,
    failed,
    // ready,
    setSuccess,
    setFailed,
    setIsSubmitting,
    // setReady,
    finishedSubmitIventoryEvent,
    finishedLogTransaction,
    finishedDeductFundsFromBenefactor,
    finishedSendFundsToBeneficiary,
    // finishedSendReport,
    setFinishedSubmitIventoryEvent,
    setFinishedLogTransaction,
    setFinishedDeductFundsFromBenefactor,
    setFinishedSendFundsToBeneficiary,
    setFinishedSendFees,
    // setFinishedSendReport,
    reset: resetSubmission,
  } = useReservationSubmissionStore();

  // Queries
  const { data: wallets } = useGetWallets();

  const errorHandler = (error: any) => {
    setFailed(true);
    setIsSubmitting(false);
    setSuccess(false);
    toast.error(`${error}`, { icon: "💣" });
  };

  const getBeneficiaryWallet = () =>
    wallets?.find(
      (wallet) => wallet.abbreviation === selectedProduct?.abbreviation
    )?.address;

  /**
   * Submit inventory event
   */
  const addInventoryEvent = async () => {
    if (!selectedProduct?.productId) throw new Error(`No product selected`);
    const newInventoryEvent = {
      renter: address,
      abbreviation: abbreviation,
      type: InventoryEventType.RESERVATION,
      productId: selectedProduct?.productId || "",
      quantity: quantity,
      fromDate: fromDate,
      toDate: toDate,
      status: InventoryEventStatus.REVIEW,
    };
    console.info("submitting inventory event ...");
    await postAddInventoryEvent(newInventoryEvent)
      .then((res) => {
        setFinishedSubmitIventoryEvent(true);
        return res.data;
      })
      .catch((e: AxiosError) => {
        throw e;
      });
  };

  /**
   * Log transaction
   */
  const logTransaction = async () => {
    const beneficiaryAddress = getBeneficiaryWallet();
    if (!beneficiaryAddress) throw new Error(`Beneficiary address not found`);
    const transcation = {
      beneficiary: beneficiaryAddress,
      benefactor: address,
      amount: getItemSum(abbreviation),
      referenceText: `Renting ${selectedProduct?.name} (${selectedProduct?.amount})`,
    };
    console.info("logging Transaction ...");
    await postAddTransaction(transcation)
      .then(() => setFinishedLogTransaction(true))
      .catch((e: AxiosError) => {
        throw e;
      });
  };

  /**
   * Send funds to beneficary
   * skip if beneficiary is benefactor
   */
  const sendFundsToBeneficiary = async () => {
    if (selectedProduct?.abbreviation === abbreviation) {
      setFinishedSendFundsToBeneficiary(true);
      return;
    }
    const beneficiaryAddress = getBeneficiaryWallet();
    if (!beneficiaryAddress) throw new Error(`Beneficiary address not found`);
    console.log("fetch beneficiary wallet ...", beneficiaryAddress);
    const beneficiary = await fetchWallet(beneficiaryAddress);
    if (!beneficiary)
      throw new Error(`Beneficiary wallet could not be reached`);
    const newBalance = beneficiary.balance + getItemSum(abbreviation);
    await postBalanceUpdate({
      id: beneficiary.id,
      balance: newBalance,
    })
      .then(() => setFinishedSendFundsToBeneficiary(true))
      .catch((e: AxiosError) => {
        throw e;
      });
  };

  /**
   * Send funds to beneficary
   * skipped if BANK
   */
  const sendFees = async () => {
    if (abbreviation === config.BANK_WALLET_ABBREVIATION) {
      setFinishedSendFees(true);
      return;
    }
    console.log(
      "fetch beneficiary wallet ...",
      config.BANK_WALLET_ADDRESS
    );
    const bank = await fetchWallet(config.BANK_WALLET_ADDRESS);
    if (!bank) throw new Error(`Bank wallet could not be reached`);
    const fees = getFees(abbreviation);
    const newBalance = bank.balance + fees;
    console.log("post balance update ...", fees, newBalance);
    await postBalanceUpdate({
      id: bank.id,
      balance: newBalance,
    })
      .then(() => setFinishedSendFees(true))
      .catch((e) => {
        throw e;
      });
  };

  /**
   * Deduct funds from benefactor
   * skip if benefactor is beneficiary
   * benefactor is also responsible for fees
   */
  const deductFundsFromBenefactor = async () => {
    if (abbreviation === selectedProduct?.abbreviation) {
      setFinishedDeductFundsFromBenefactor(true);
      return;
    }
    console.log("fetch benefactor wallet ...", address);
    const benefactor = await fetchWallet(address);
    if (!benefactor) throw new Error(`Benefactor wallet could not be reached`);
    const position = -(getItemSum(abbreviation) + getFees(abbreviation));
    const newBalance = benefactor.balance + position;
    console.log("post balance update ...", position, newBalance);
    await postBalanceUpdate({
      id: benefactor.id,
      balance: newBalance,
    })
      .then(() => setFinishedDeductFundsFromBenefactor(true))
      .catch((e) => {
        throw e;
      });
  };

  /**
   * Refresh reservation events and wallets to let the user know what just happened
   * @returns void
   */
  const refresh = () => {
    // dunno how to do it properly, perhapse redirect to a success page within the route
  };

  /**
   * Purchase item with VIS Token
   * WARNING - Currently when sending two requests to the same wallet, only the last transaction is locked.
   * @returns void
   */
  const purchase = async () => {
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

    setIsSubmitting(true);

    // Transactions
    logTransaction();
    sendFundsToBeneficiary();
    deductFundsFromBenefactor();
    sendFees();
    addInventoryEvent();
  };

  useEffect(() => {
    if (
      finishedDeductFundsFromBenefactor &&
      finishedLogTransaction &&
      finishedSendFundsToBeneficiary &&
      finishedSubmitIventoryEvent
    ) {
      console.log("all calls done!");
      const message = `You paid ${
        getItemSum(abbreviation) + getFees(abbreviation)
      }🪙 incl. ${getFees(abbreviation)}🪙 fees`;
      toast.success(message, { icon: "👌" });
      resetSubmission();
      resetProduct();
      setIsSubmitting(false);
      setSuccess(true);
    }
  }, [
    finishedDeductFundsFromBenefactor,
    finishedLogTransaction,
    finishedSendFundsToBeneficiary,
    finishedSubmitIventoryEvent,
    setIsSubmitting,
    setSuccess,
    getItemSum,
    getFees,
    abbreviation,
    resetSubmission,
    resetProduct,
  ]);

  if (!user) return <></>;
  if (!selectedProduct) return <></>;
  if (availableQuantity <= 0)
    return <PlaceholderText>Not in stock. Change date!</PlaceholderText>;
  if (quantity <= 0)
    return <PlaceholderText>Increase quantity to reserve</PlaceholderText>;
  if (success)
    return (
      <PrimaryButton icon={<FiRefreshCcw />} onClick={() => refresh()}>
        Refresh
      </PrimaryButton>
    );
  return (
    <Container isLoading={isSubmitting} type="button" onClick={purchase}>
      Reserve{" "}
      {abbreviation !== selectedProduct.abbreviation &&
        getItemSum(abbreviation) + getFees(abbreviation) > 0 &&
        availableQuantity > 0 && (
          <>
            for <GiToken /> {getItemSum(abbreviation) + getFees(abbreviation)}
          </>
        )}
    </Container>
  );
};

export default ProductCheckoutButton;
