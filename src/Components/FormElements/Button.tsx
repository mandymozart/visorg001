import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes, FC, forwardRef } from "react";
import Loader from "../Loader";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: FC;
}
const Container = styled.button`
  line-height: 2rem;
  font-size: 1rem;
  justify-self: center;
  font-weight: 100;
  padding: 0 1rem;
  cursor: pointer;
  border: 0;
  background-color: transparent;
  box-shadow: inset 0 0 0 1px var(--color);
  display: inline-block;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  color: var(--color);
  text-align: center;
  position: relative;
  transition: all 0.2s cubic-bezier(1, 0, 0, 1);
  outline: none;
  &:hover {
    transform: translateY(-0.1rem);
    box-shadow: inset 0 0 0 1px var(--color), inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.33);
  }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading = false, icon, children, ...props }, ref) => (
    <Container {...props} ref={ref}>
      {isLoading ? <Loader/> : children}
    </Container>
  )
);
export const PrimaryButton = styled(Button)`
  background-color: var(--color);
  box-shadow: none;
  color: var(--background);
  &:hover {
    box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.33);
  }
`;
export const SquareButton = styled(Button)`
  padding: 0;
  width: 2rem;
`;

Button.displayName = "Button";
