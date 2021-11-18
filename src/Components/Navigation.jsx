import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import clsx from "clsx";
import Hamburger from "hamburger-react";
import React, { useState } from "react";
import { FiTv, FiUsers } from "react-icons/fi";
import { GiMagicPortal } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ViennaStruggleLogo from "./ViennaStruggleLogo";

const Container = styled.div`
  position: sticky;
  top: 2rem;
  width: var(--header-width);
  margin: 0 auto;
  margin-top: 1rem;
  background: rgba(255,255,255,0.7);
  /* Hole */
  border: 2px solid var(--color);
  box-sizing: border-box;
  /* Up 1 */
  box-shadow: 4px 4px 0px var(--color);
  border-radius: 8px;
  z-index: 1000;
  backdrop-filter: blur(8px);
  header {
    display: grid;
    grid-template-columns: 4rem 12rem 4rem;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  section {
    pointer-events: none;
    display: none;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    a button {
      width: 100%;
    }
    &.isOpen {
      display: flex;
      pointer-events: visible;
    }
  }
  .divider {
    flex: 1;
  }
  button {
    background: black;
    color: var(--background);
    border: 0;
    border-radius: 0.25rem;
    height: 2rem;
    padding: 0 2rem;
    cursor: pointer;
    font-weight: bold;
    line-height: 0.75rem;
  }
  .menu {
    /* background: transparent; */
    /* color: var(--text);
    border: 1px solid;
    cursor: pointer;
    font-weight: bold; */
  }
`;
const Navigation = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <header>
        <div></div>
        <Link to="/">
          <ViennaStruggleLogo/>
        </Link>
        <Hamburger toggled={isOpen} toggle={setIsOpen} color={"var(--color)"} />
      </header>
      <section className={clsx({ isOpen: isOpen })}>
        {/* <NavLink to={"/opencalls"}>Open Calls</NavLink> */}
        <a href={"https://struggle.tv"} rel="noreferrer">
          <button className="menu">
            <FiTv /> <FiUsers /> Sessions
          </button>
        </a>
        <NavLink to={"/portal"}>
          <button className="menu">
            <GiMagicPortal /> Portal
          </button>
        </NavLink>
        <div className="divider"></div>
        {isLoading && "Loading ..."}
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">{user?.name}</NavLink>
            <NavLink to={"/new"}>
              <button className="menu">New Project</button>
            </NavLink>
            <NavLink to={"/projects"}>
              <button className="menu">My Projects</button>
            </NavLink>
            <NavLink to={"/profile"}>
              <button className="menu">Profile</button>
            </NavLink>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </section>
    </Container>
  );
};

export default Navigation;
