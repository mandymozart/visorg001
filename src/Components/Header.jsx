import React from "react";
import { Navigation } from "./Navigation";
import styled from "@emotion/styled";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import clsx from "clsx";
import Footer from "./Footer";

const Container = styled.header`
  border-right: 1px solid black;
  padding: 1rem;
  background: white;
  overflow: auto;
  transition: all .7s cubic-bezier(1,0,0,1);
  opacity: 1;
  &.isCollapsed {
    transform: translateX(-15rem) scale(1.05);
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

const Header = ({ isCollapsed }) => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <Container className={clsx({ isCollapsed: isCollapsed })}>
      <div className="logo">
        <img src="/logo.svg" alt="Vienna Struggle" />
      </div>
      {isAuthenticated ? (
        <>
          <Link to={"/profile"}>{user.name}</Link>
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
      <Navigation />
      <Footer/>
    </Container>
  );
};

export default Header;
