import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes, FC, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const Container = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: var(--color);
  span {
    flex: 0 0 2rem;
  }
  &:hover {
      color: var(--second);
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  setIsOpen: any;
  to: string;
  isLoading: boolean;
  icon?: FC;
}

const NavigationLink = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ setIsOpen, to, isLoading = false, icon, children, ...props }, ref) => {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    const goToLink = () => {
      setIsOpen(false);
      if (to === "/" && isAuthenticated) to = "/dashboard";
      navigate(to);
    };
    return (
      <Container {...props} onClick={() => goToLink()} ref={ref}>
        {icon && <span>{icon}</span>} {isLoading ? <Loader /> : children}
      </Container>
    );
  }
);

export default NavigationLink;
