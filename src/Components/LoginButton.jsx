import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PrimaryButton } from "./FormElements/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <PrimaryButton onClick={() => loginWithRedirect()}>Sign In</PrimaryButton>;
};

export default LoginButton;