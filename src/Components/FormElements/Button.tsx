import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes, FC, forwardRef } from "react";
import Loader from "../Loader";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  success?: boolean;
  failed?: boolean;
  icon?: FC;
}

type StyledContainerProps = {
  success?: boolean;
  failed?: boolean;
};

const Container = styled.button(
  ({ success, failed }: StyledContainerProps) => `
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
  ${success && `&:before {content:"👌"}`}
  ${failed && `&:before {content:"👎"}`}
  &:hover {
    transform: translateY(-0.05rem);
    box-shadow: inset 0 0 0 1px var(--color), inset 0 -0.6em 0 -0.35em #0000ff54;
  }
`
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isLoading = false,
      success = false,
      failed = false,
      icon,
      children,
      ...props
    },
    ref
  ) => (
    <Container
      {...props}
      disabled={isLoading}
      success={success}
      failed={failed}
      ref={ref}
    >
      {isLoading ? <Loader size={24} /> : children}
    </Container>
  )
);
export const PrimaryButton = styled(Button)`
  background-color: var(--second);
  box-shadow: none;
  color: var(--fourth);
  &:hover {
    background-color: var(--second);
    color: var(--fourth);
    box-shadow: inset 0 -0.6em 0 -0.35em #00000054;
  }
`;
export const SquareButton = styled(Button)`
  padding: 0;
  width: 2rem;
`;

Button.displayName = "Button";
