import styled from "@emotion/styled";
import React, { FC, forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  icon?: FC;
}
const Container = styled.input`
  line-height: 2rem;
  font-size: 0.75rem;
  justify-self: center;
  font-weight: 100;
  padding: 0 1rem;
  cursor: pointer;
  border: 0;
  display: inline-block;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  background-color: var(--text);
  color: #ffffff;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.23);
  text-align: center;
  position: relative;
  transition: all 0.2s cubic-bezier(1, 0, 0, 1);
  outline: none;
  /* &:hover {
    transform: translateY(-0.1rem);
  } */
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isLoading = false, icon, children, ...props }, ref) => (
    <Container {...props} ref={ref}/>
  )
);
export const PrimaryButton = styled(Input)`
  background-color: var(--color);
`;

Input.displayName = "Input";
