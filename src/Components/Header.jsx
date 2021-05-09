import React from "react";
import logo from "./logo.svg";
import styled from "@emotion/styled";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Container = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid;
  .logo{
    display: block;
    line-height: 0;
    img {
      height: calc(var(--header-height) / 2);
      display: block;
    }
  } 
  menu {
    display: flex;
    margin: 0 1rem;
    padding: 0;
    align-items: center;
    flex: auto;

    a {
      transition: all 1s ease-in-out;
      list-style: none;
      font-weight: bold;
      line-height: 2rem;
      padding: 0 1rem;
      flex: 1;
      text-align: center;
      background: black;
      margin-right: 0.5rem;
      border-radius: 0.25rem;
      color: var(--background);
      &:hover{
        transform: none;
        flex: 2;
        background: var(--second);
      }
      &:first-of-type {
        background: var(--color);
      }
      &.active, &:first-of-type.active {
        background: var(--third);
        /* color: black; */
      }
    }
    a:before {
    }
  }
`;
const UserMenu = styled.aside`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Header = ({ isCollapsed, setIsCollapsed }) => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <Container>
      <div className="logo">
        <Link to={"/dashboard"}>
          <img src={logo} alt="Vienna Struggle" />
        </Link>
      </div>
      <menu>
        <NavLink to={"/new"}>New Project</NavLink>
        <NavLink to={"/projects"}>My Projects</NavLink>
        <NavLink to={"/opencalls"}>Open Calls</NavLink>
      </menu>
      <UserMenu>
        {isAuthenticated ? (
          <>
            <Link to={"/profile"}>{user.name}</Link>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
        <button className="toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
          <span role="img" aria-labelledby="epics">
            {isCollapsed ? "👋" : ""}
          </span>
        </button>
      </UserMenu>
    </Container>
  );
};

export default Header;
