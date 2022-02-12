import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import clsx from "clsx";
import Hamburger from "hamburger-react";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import {
  Gi3DGlasses,
  GiAchillesHeel, GiBackpack,
  GiMagicPortal,
  GiToken
} from "react-icons/gi";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import NavigationLink from "./Navigation/NavigationLink";
import ViennaStruggleLogo from "./ViennaStruggleLogo";

const Container = styled.div`
  position: fixed;
  top: 5rem;
  width: 100vw;
  z-index: 1000;
  pointer-events: none;
  header,
  > nav {
    max-width: 100%;
    margin: 0 auto;
    pointer-events: visible;
  }
  > header {
    grid-template-columns: 4rem 12rem 4rem;
    display: grid;
    width: var(--header-width);
    margin: 0 auto;
    /* background: rgba(255, 255, 255, 0.7); */
    /* Hole */
    border: 2px solid var(--color);
    box-sizing: border-box;
    /* Up 1 */
    box-shadow: 4px 4px 0px var(--color);
    border-radius: 8px;

    > a {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 1rem;
    }
  }
  .divider {
    height: 1px;
    width: 100%;
    margin-bottom: 0.5rem;
    background-color: var(--color);
  }
  > nav {
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    flex-direction: column;
    width: var(--header-width);
    margin-top: 2rem;
    box-sizing: border-box;
    gap: 0.5rem;
    padding: 1rem;
    /* Hole */
    border: 2px solid var(--color);
    box-sizing: border-box;
    /* Up 1 */
    box-shadow: 4px 4px 0px var(--color);
    border-radius: 8px;
    transition: transform 0.5s cubic-bezier(1, 0, 0, 1), opacity 0.5s ease-out;
    opacity: 0;
    z-index: 1000;
    transform: translateY(100vh);

    ul {
      padding: 0;
      margin: 0;
      width: 100%;
      list-style-type: none;
      li {
        padding: 0;
        margin: 0;
      }
    }
    button {
      text-align: left;
      line-height: 2.5rem;
      font-size: 1.5rem;
      width: 100%;
    }
    &.isOpen {
      opacity: 1;
      pointer-events: visible;
      transform: translateY(0);
    }
  }
`;

const ProfileLink = styled(NavigationLink)`
justify-content: center;
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;

const Navigation = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <header className="glassomorphism">
        <Hamburger toggled={isOpen} toggle={setIsOpen} color={"var(--color)"} />
        <NavigationLink setIsOpen={setIsOpen} to="/">
          <ViennaStruggleLogo />
        </NavigationLink>
        <ProfileLink to="/wallet" setIsOpen={setIsOpen}>
        <img src={user?.picture} alt={user?.name} />
        </ProfileLink>
      </header>
      <nav className={clsx({ isOpen: isOpen }, "glassomorphism")}>
        <ul>
          <li>
            <NavigationLink
              icon={<GiAchillesHeel />}
              setIsOpen={setIsOpen}
              to="/projects"
            >
              Projects
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              icon={<Gi3DGlasses />}
              setIsOpen={setIsOpen}
              to="/tutorials"
            >
              Tutorials
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              icon={<GiMagicPortal />}
              setIsOpen={setIsOpen}
              to="/portal"
            >
              Portal
            </NavigationLink>
          </li>
        </ul>
        <div className="divider"></div>
        {isLoading && "Loading ..."}
        {isAuthenticated ? (
          <ul>
            <li>
              <NavigationLink
                icon={<FiUser />}
                setIsOpen={setIsOpen}
                to="/profile"
              >
                {user?.name}
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                icon={<GiBackpack />}
                setIsOpen={setIsOpen}
                to="/inventory"
              >
                Inventory
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                icon={<GiToken />}
                setIsOpen={setIsOpen}
                to="/wallet"
              >
                Wallet
              </NavigationLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        ) : (
          <LoginButton />
        )}
      </nav>
    </Container>
  );
};

export default Navigation;
