import { useAuth0 } from "@auth0/auth0-react";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import React from "react";
import toast from "react-hot-toast";
import { useSendMail } from "../../Hooks/FunctionQueries";
import {
  useAddInventoryEvent,
  useAddTransaction,
  useGetWallets,
  useUpdateWallets
} from "../../Hooks/InventoryQueries";
import { Wallet } from "../../Pages/Wallet/Wallet";
import { useCartStore } from "../../Stores/CartStore";
import { useWalletStore } from "../../Stores/WalletStore";
import { errorHandler } from "../../Utilities/ErrorHandlers";
import { PrimaryButton } from "../FormElements/Button";

enum MailTypes {
  ORDER_CONFIRMATION = "order-confirmation",
  LENTER_INFO = "lenter-info",
}

const CartTokenCheckoutButton = () => {
  const { user } = useAuth0();

  // CartStore
  const {
    items,
    isLoading,
    isSubmitting,
    setIsSubmitting,
    getTotal,
    getFees,
    clearItems,
    fromDate,
    toDate,
  } = useCartStore();

  // Wallet store
  const { address, tokens, deductTokens, bakeWallet } = useWalletStore();

  // Queries
  const { data: wallets } = useGetWallets();
  const addInventoryEvent = useAddInventoryEvent();
  const addTransaction = useAddTransaction();
  const updateWallets = useUpdateWallets();
  const sendMail = useSendMail();

  /**
   * Purchase all items in cart with VIS Tokens
   * @returns void
   */
  const purchaseWithTokens = () => {
    const grandTotal = getTotal() + getFees();

    // Validation
    if (tokens < grandTotal) {
      toast.error("Insufficient funds!", { icon: "💣" });
      return;
    }
    if (fromDate === "" && toDate === "") {
      toast.error("Let us know when you need the stuff!", { icon: "💣" });
      return;
    }
    if (!user) {
      // Hardly ever occurs
      toast.error("Not logged in!", { icon: "💣" });
      return;
    }

    setIsSubmitting(true);

    // TODO: Move to individual call. DO NOT charge self

    items.forEach((item) => {
      // throttle requests
      setTimeout(() => {
        const newEvent = {
          eventId: nanoid(8),
          renter: user.nickname,
          type: "reservation",
          productId: item.product.productId,
          fromDate: fromDate,
          toDate: toDate,
          quantity: item.quantity,
        };
        addInventoryEvent.mutate(newEvent, {
          onSuccess: () => {
            setIsSubmitting(false);
            createReport({
              user: user,
              items: items,
              fromDate: fromDate,
              toDate: toDate,
            });
            toast.success(
              `Your wallet has been charged!\nLast transaction: ${grandTotal}\nNew balance: ${tokens}`,
              { icon: "✨" }
            );
          },
          onError: errorHandler,
        });
        // Transfer tokens to beneficiary
        // TODO: DO NOT CHARGE self
        console.log("Looking for wallet of ", item.product.owner);
        const beneficiaryWallet = wallets?.find(
          (wallet) => wallet.alias === item.product.owner
        );
        if (beneficiaryWallet) {
          const newBeneficiaryWallet: Wallet = {
            id: beneficiaryWallet.id,
            address: beneficiaryWallet.address,
            owner: beneficiaryWallet.owner,
            alias: beneficiaryWallet.alias,
            tokens:
              beneficiaryWallet.tokens +
              parseFloat(item.product.memberPrice) * item.quantity,
            lastUpdate: dayjs().format(),
            status: beneficiaryWallet.status,
          };
          console.log(
            `old saldo: ${beneficiaryWallet.tokens} new saldo: ${newBeneficiaryWallet.tokens}`
          );
          updateWallets.mutate(newBeneficiaryWallet, {
            onSuccess: () => {
              const transcation = {
                transactionId: nanoid(16),
                beneficiary: beneficiaryWallet.address,
                benefactor: address,
                tokens: parseFloat(item.product.memberPrice) * item.quantity,
                date: dayjs().format(),
                status: "received",
              };
              addTransaction.mutate(transcation);
              // TODO: Add transaction to receiptiens report
              console.log("Transaction logged", JSON.stringify(transcation));
            },
            onError: errorHandler,
          });
        } else {
          console.log("Beneficiary wallet not found");
        }
      }, 1000);
    });
  };

  const onSuccess = () => {
    // update store
    let benefactorWallet = bakeWallet();
    updateWallets.mutate(benefactorWallet, {
      onSuccess: () => {
        console.info("Wallet updated!");
      },
      onError: errorHandler,
    });
  };

  const createReport = (report: any) => {
    // TODO: Information required after completed transactions:
    /**
     * each benefector receives an email, about their sale
     * the renter receives an email with a confirmation of the
     * * ordered items.
     * * emergency contact information from owners
     * * an updated wallet balance
     **/
    sendMail.mutate(
      {
        type: MailTypes.ORDER_CONFIRMATION,
        user: user,
        items: items,
        fromDate: fromDate,
        toDate: toDate,
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          createReport({
            user: user,
            items: items,
            fromDate: fromDate,
            toDate: toDate,
          });
          toast.success(`Confirmation mail sent.`, { icon: "✨" });
          // navigate("/inventory/reservations");
        },
        onError: errorHandler,
      }
    );
    // console.log(
    //   JSON.stringify({
    //     user: user,
    //     items: items,
    //     fromDate: fromDate,
    //     toDate: toDate,
    //   })
    // );

    clearItems();
  };

  if (!user) return <></>;
  if (items.length <= 0) return <></>;
  return (
    <PrimaryButton
      isLoading={isSubmitting || isLoading}
      type="button"
      onClick={purchaseWithTokens}
    >
      <b>Checkout</b>
    </PrimaryButton>
  );
};

export default CartTokenCheckoutButton;
