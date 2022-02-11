import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useGetWallets } from "../../Hooks/InventoryQueries";
import { useWalletStore } from "../../Stores/WalletStore";

const WalletLogic = () => {
  const { user, isAuthenticated } = useAuth0();
  const { data: wallets } = useGetWallets();
  const hydrate = useWalletStore((store) => store.hydrate);

  useEffect(() => {
    if (isAuthenticated && wallets && user) {
      const wallet = wallets?.find((wallet) => user?.sub === wallet?.owner);
      if (wallet) {
        hydrate(wallet);
      } else {
        toast.error(
          `You have no wallet. Please contact an admin.`
        );
      }
    }
  }, [wallets, user, isAuthenticated, hydrate]);
  return <></>;
};

export default WalletLogic;
