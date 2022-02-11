import { useAuth0 } from "@auth0/auth0-react";
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { default as Web3 } from "web3";
import { config } from "../../config";
import { useGetRates } from "../../Hooks/CoinbaseQueries";
import { useSendMail } from "../../Hooks/FunctionQueries";
import {
  useAddInventoryEvent,
  useAddTransaction
} from "../../Hooks/InventoryQueries";
import { useCartStore } from "../../Stores/CartStore";
import { useWalletStore } from "../../Stores/WalletStore";
import { PrimaryButton } from "../FormElements/Button";


const CartEthCheckoutButton = () => {
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
  const { tokens, deductTokens, bakeWallet } = useWalletStore();

  // Queries
  const { data: rates } = useGetRates();
  const addInventoryEvent = useAddInventoryEvent();
  const addTransaction = useAddTransaction();
  const sendMail = useSendMail();

  // Web3
  const { active, account, library, activate, deactivate } = useWeb3React();
  const [minting, setMinting] = useState(false);

  const createReport = (report: any) => {
    console.log("createReport - not implemented");
  };

  const onSuccess = () => {
    createReport({});
    console.log("onSuceess - not implemented");
    setIsSubmitting(false);
    setMinting(false);
    clearItems();
  };

  const onError = (e: any) => {
    toast.error(`Something went wrong! Try switching accounts - ${e}`, {
      icon: "💣",
    });
    console.log("ERROR->", e);
    setMinting(false);
    setIsSubmitting(false);
    setMinting(false);
    clearItems();
  };

  /**
   * Mint transaction on Ether chain
   * @returns void
   */
  async function purchase() {
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
    setMinting(true);
    
    const price = `${getTotal() * rates.ETH}`; // This is the price in ETH

    let obj = {
      to: config.metaMaskAccount,
      from: account,
      value: Web3.utils.toWei(price, "ether"), // Needs to be converted to Wei units
      gas: 85000, // Eth ⛽ price
      gasLimit: "100000",
    };

    await library.eth.sendTransaction(obj, async (e: Event, tx: any) =>
      e ? onError(e) : onSuccess()
    );
  }

  if (!user) return <></>;
  if (items.length <= 0) return <></>;
  return (
    <PrimaryButton type="button" disabled={minting} onClick={purchase}>
      {minting ? "Waiting confirmation." : "Mint with ETH"}
    </PrimaryButton>
  );
};

export default CartEthCheckoutButton;
