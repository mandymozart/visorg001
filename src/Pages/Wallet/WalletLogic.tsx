import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useGetWallets } from "../../Hooks/Queries";
import { useWalletStore } from "../../Stores/WalletStore";

const WalletLogic = () => {
  const { user, isAuthenticated } = useAuth0();
  const { data: wallets } = useGetWallets();
  const hydrate = useWalletStore((store) => store.hydrate);

  useEffect(() => {
    if (isAuthenticated) {
      const wallet = wallets?.find((wallet) => user?.sub === wallet?.owner);
      console.log(wallets);
      if (wallet) {
        hydrate(wallet);
      }
    }
  }, [wallets, user, isAuthenticated, hydrate]);
  return <></>;
};

export default WalletLogic;
