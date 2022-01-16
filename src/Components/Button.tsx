import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes, FC, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: FC;
}
const Container = styled.button`
    line-height: 2rem;
`

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading = false, icon, children, ...props }, ref) => (
    <Container {...props} ref={ref}>
      {isLoading ? "loading ..." : children}
    </Container>
  )
);
export const PrimaryButton = styled(Button)`
    background-color: var(--color);
`

Button.displayName = "Button";
