import React, { useRef } from "react";
import { Navigation } from "./Navigation";
import styled from "@emotion/styled";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import clsx from "clsx";
import Footer from "./Footer";
import useOnClickOutside from "use-onclickoutside";

const Container = styled.aside`
  transform: translateY(0);
  position: fixed;
  top: var(--header-height);
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  background: black;
  color: white;
  overflow: auto;
  transition: all 0.7s cubic-bezier(1, 0, 0, 1);
  border-right: 1px solid black;
  padding: 1rem;
  z-index: 1;
  opacity: 1;
  &.isCollapsed {
    transform: translateY(100vw) scale(1.05);
    opacity: 0;
  }
  .logo {
    width: 100%;
    margin-right: 2rem;
    margin-bottom: 1rem;
    img {
      width: 100%;
    }
  }
`;

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { user, isAuthenticated } = useAuth0();
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsCollapsed(true));
  return (
    <Container ref={ref} className={clsx({ isCollapsed: isCollapsed })}>
      <Navigation />
      <Footer />
    </Container>
  );
};

export default Sidebar;
