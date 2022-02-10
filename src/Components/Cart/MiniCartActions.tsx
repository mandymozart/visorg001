import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";
import { enableMapSet } from "immer";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { default as Web3 } from "web3";
import { useSendMail } from "../../Hooks/FunctionQueries";
import {
  useAddInventoryEvent,
  useGetRates,
  useUpdateWallets
} from "../../Hooks/Queries";
import { useCartStore } from "../../Stores/CartStore";
import { useWalletStore } from "../../Stores/WalletStore";
import { errorHandler } from "../../Utilities/ErrorHandlers";
import { Button, PrimaryButton } from "../Button";

enableMapSet();

const Container = styled.div`
  text-align: right;
`;

enum MailTypes {
  ORDER_CONFIRMATION = "order-confirmation",
  LENTER_INFO = "lenter-info",
}

const MiniCartActions = () => {
  const { user } = useAuth0();

  const items = useCartStore((store) => store.items);
  const isLoading = useCartStore((store) => store.isLoading);
  const isSubmitting = useCartStore((store) => store.isSubmitting);
  const setIsSubmitting = useCartStore((store) => store.setIsSubmitting);
  const getTotal = useCartStore((store) => store.getTotal);
  const getFees = useCartStore((store) => store.getFees);
  const clearItems = useCartStore((store) => store.clearItems);
  const fromDate = useCartStore((store) => store.fromDate);
  const toDate = useCartStore((store) => store.toDate);
  const tokens = useWalletStore((store) => store.tokens);
  const deductTokens = useWalletStore((store) => store.deductTokens);
  const bake = useWalletStore((store) => store.bake);

  const addInventoryEvent = useAddInventoryEvent();
  const sendMail = useSendMail();
  const updateWallets = useUpdateWallets();

  // Web3
  const { active, account, library, activate, deactivate } = useWeb3React();
  const [minting, setMinting] = useState(false);

  const { data: rates } = useGetRates();

  const purchaseWithTokens = () => {
    const grandTotal = getTotal() + getFees();
    if (tokens < grandTotal) {
      toast.error("Insufficient funds!", { icon: "💣" });
      return;
    }
    if (!user) {
      // this condition is actually hardly met
      toast.error("Not logged in!", { icon: "💣" });
      return;
    }
    if (fromDate === "" && toDate === "") {
      toast.error("Let us know when you need the stuff!", { icon: "💣" });
      return;
    }
    setIsSubmitting(true);

    // update store
    deductTokens(grandTotal);
    // update remote wallet
    let newWallet = bake();
    updateWallets.mutate(newWallet, {
      onSuccess: () => {
        console.info("Wallet updated!");
      },
      onError: errorHandler,
    });

    items.forEach((item) => {
      // throttle requests
      setTimeout(() => {
        addInventoryEvent.mutate(
          {
            eventId: nanoid(8),
            renter: user.nickname,
            type: "reservation",
            productId: item.product.productId,
            fromDate: fromDate,
            toDate: toDate,
            quantity: item.quantity,
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
              toast.success(
                `Your wallet has been charged!\nLast transaction: ${grandTotal}\nNew balance: ${newWallet.tokens}`,
                { icon: "✨" }
              );
            },
            onError: errorHandler,
          }
        );
      }, 1000);
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
    console.log(
      JSON.stringify({
        user: user,
        items: items,
        fromDate: fromDate,
        toDate: toDate,
      })
    );

    clearItems();
  };

  // Minting Function
  async function purchaseWithETH() {
    setMinting(true);
    const myAccount = "0x2Bf760e5635A7b10e7Ea43252b70e995924a710e"; //Account to receive payment
    const price = `${getTotal() * rates.ETH}`; // This is the price in ETH

    let obj = {
      to: myAccount,
      from: account,
      value: Web3.utils.toWei(price, "ether"), // Needs to be converted to Wei units
      gas: 85000, // Eth ⛽ price
      gasLimit: "100000",
    };

    await library.eth.sendTransaction(obj, async (e: Event, tx: any) => {
      if (e) {
        toast.error(`Something went wrong! Try switching accounts - ${e}`, {
          icon: "💣",
        });
        console.log("ERROR->", e);
        setMinting(false);
      } else {
        setMinting(false);
      }
    });
  }

  if (!user) return <></>;
  return (
    <Container>
      {items.length > 0 && (
        <>
          <PrimaryButton
            isLoading={isSubmitting || isLoading}
            type="button"
            onClick={purchaseWithTokens}
            >
            <b>Checkout {items.length} items</b>
          </PrimaryButton>{" "}
          {/* <PrimaryButton
            type="button"
            disabled={minting}
            onClick={purchaseWithETH}
            >
            {minting ? "Waiting confirmation." : "ETH"}
          </PrimaryButton> */}
          
          <Button onClick={() => clearItems()}>Clear items</Button> <br />
        </>
      )}
    </Container>
  );
};

export default MiniCartActions;
