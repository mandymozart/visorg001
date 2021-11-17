import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";

const Button = styled.button`
`

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;