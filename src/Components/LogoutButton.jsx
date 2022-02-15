import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PrimaryButton } from "./FormElements/Button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <PrimaryButton onClick={() => logout({ returnTo: window.location.origin })}>
      Sign Out
    </PrimaryButton>
  );
};

export default LogoutButton;