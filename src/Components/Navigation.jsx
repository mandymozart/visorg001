import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import logo from "./logo.svg";
import LogoutButton from "./LogoutButton";

const Container = styled.header`
  background: var(--background);
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 3rem;
  padding-bottom: 4rem;
  gap: 1rem;
  grid-area: header;
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
  }
  .menu {
    background: transparent;
    color: var(--text);
    border: 1px solid;
    border-radius: 0.25rem;
    height: 2rem;
    padding: 0 2rem;
    cursor: pointer;
    font-weight: bold;
  }
`;
const Navigation = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Vienna Struggle" width="192" />
      </Link>
      <NavLink to={"/opencalls"}>Open Calls</NavLink>
      <a href={"https://struggle-tv-stage.netlify.app"} rel="noreferrer">
        Sessions
      </a>
      <div className="divider"></div>
      {isLoading && "Loading ..."}
      {isAuthenticated ? (
        <>
          <NavLink to={"/new"}><button className="menu">
            New Project
            </button>
            </NavLink>
          <NavLink to={"/projects"}>
            <button className="menu">

            My Projects
            </button>
            </NavLink>
          <NavLink to={"/profile"}>
            <button className="menu">
            Profile

            </button>
            </NavLink>
          <LogoutButton />
          <NavLink to="/dashboard">{user?.name}</NavLink>
        </>
      ) : (
        <LoginButton />
      )}
    </Container>
  );
};

export default Navigation;
