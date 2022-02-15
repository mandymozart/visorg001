import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useAddWallet, useGetWalletForOwner,
  useGetWallets
} from "../../Hooks/InventoryQueries";
import { useWalletStore } from "../../Stores/WalletStore";
import { errorHandler } from "../../Utilities/ErrorHandlers";

const WalletLogic = () => {
  const { user, isAuthenticated } = useAuth0();
  const { data: wallets } = useGetWallets();
  const { mutate: getWalletForOwner } = useGetWalletForOwner();
  const { mutate: addWallet } = useAddWallet();
  const { hydrate } = useWalletStore();
  const navigate = useNavigate();

  useEffect(() => {
    const createWallet = () => {
      console.log("create wallet ...");
      if (user) {
        console.log("... for user", user.sub);
        if (user.sub && user.email && user.name)
          addWallet(
            {
              owner: user.sub,
              email: user.email,
              name: user.name,
            },
            {
              onSuccess: (wallet) => {
                if (wallet) {
                  console.log("got wallet",wallet);
                  hydrate(wallet);
                  toast.success(`Your wallet address is ${wallet.address}. We are redirecting you now ...`);
                  // setTimeout(() => navigate("/wallet"), 6000);
                }
                else console.log("wtf")
              },
              onError: errorHandler,
            }
          );
        else
          toast.error(
            "The user registration was fucked up. Please contact support"
          );
      } else console.log("no user");
    };

    if (isAuthenticated && user) {
      console.log(user.sub);
      if (user.sub) {
        getWalletForOwner(user.sub, {
          onSuccess: (wallet) => {
            console.log(`got wallet for owner ${user.sub}. wallet`,wallet)
            if (wallet) {
              hydrate(wallet);
            }
            else {
              toast.error(`We have not found a wallet and are creating one.`);
              createWallet();
            }
          },
          onError: errorHandler,
        });
      }
    }
  }, [user, isAuthenticated, getWalletForOwner, navigate, wallets, hydrate, addWallet]);
  return <></>;
};

export default WalletLogic;
