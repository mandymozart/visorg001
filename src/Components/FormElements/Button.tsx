import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes, forwardRef, ReactElement } from "react";
import Loader from "../Loader";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: ReactElement;
}

const Container = styled.button`
  line-height: 2rem;
  font-size: 1rem;
  justify-self: center;
  font-weight: 400;
  text-align: center;
  padding: 0 1rem;
  cursor: pointer;
  border: 0;
  background-color: transparent;
  display: inline-block;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  color: var(--fifth);
  box-shadow: inset 0 0 0 1px var(--fifth);
  text-align: center;
  position: relative;
  transition: all 0.2s cubic-bezier(1, 0, 0, 1);
  &:hover {
    transform: translateY(-0.05rem);
    color: var(--sixth);
    box-shadow: inset 0 0 0 1px var(--sixth), inset 0 -0.6em 0 -0.35em var(--sixth-shadow);
  }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isLoading = false,
      icon,
      children,
      ...props
    },
    ref
  ) => (
    <Container
      {...props}
      disabled={isLoading}
      ref={ref}
    >
      <span>{isLoading ? <Loader size={16} /> : children}</span>
    </Container>
  )
);
export const PrimaryButton = styled(Button)`
  background-color: var(--fifth);
  box-shadow: none;
  color: var(--background);
  font-weight: bold;
  &:hover {
    background-color: var(--fifth);
    color: var(--background);
    box-shadow: inset 0 -0.6em 0 -0.35em #00000054;
  }
`;
export const SquareButton = styled(Button)`
  padding: 0;
  width: 2rem;
`;

Button.displayName = "Button";
