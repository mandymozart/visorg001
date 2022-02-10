import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import clsx from "clsx";
import Hamburger from "hamburger-react";
import React, { useState } from "react";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import {
  Gi3DGlasses,
  GiAchillesHeel,
  GiBackpack, GiMagicPortal,
  GiToken
} from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../Stores/CartStore";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ViennaStruggleLogo from "./ViennaStruggleLogo";

const Container = styled.div`
  position: fixed;
  top: 2rem;
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
      cursor: pointer;
    }
  }
  .divider {
    height: 2px;
    width: 100%;
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
        a {
          cursor: pointer;
          text-align: left;
          line-height: 3rem;
          font-size: 1.5rem;
          cursor: pointer;
        }
      }
    }
    &.isOpen {
      opacity: 1;
      pointer-events: visible;
      transform: translateY(0);
    }
  }
`;

const CartLink = styled(Link)`
  position: relative;
  span {
    padding-left: 0.5rem;
  }
`;

const Navigation = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const cartItems = useCartStore((store) => store.items);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleOpen = (value) => {
    setIsOpen(value);
  };

  const goToLink = (link) => {
    setIsOpen(false);
    if (link === "/" && isAuthenticated) link = "/dashboard";
    navigate(link);
  };
  return (
    <Container>
      <header className="glassomorphism">
        <Hamburger toggled={isOpen} toggle={setIsOpen} color={"var(--color)"} />
        <a onClick={() => goToLink("/")}>
          <ViennaStruggleLogo />
        </a>
        <CartLink to="/cart">
          <FiShoppingCart />{" "}
          <small>
            {cartItems.length > 0 && <span>{cartItems.length}</span>}
          </small>
        </CartLink>
      </header>
      <nav className={clsx({ isOpen: isOpen }, "glassomorphism")}>
        <ul>
          <li>
            <a onClick={() => goToLink("/projects")}>
              <GiAchillesHeel /> Projects
            </a>
          </li>
          <li>
            <a onClick={() => goToLink("/tutorials")}>
              <Gi3DGlasses /> Tutorials
            </a>
          </li>
          <li>
            <a onClick={() => goToLink("/portal")}>
              <GiMagicPortal /> Portal
            </a>
          </li>
        </ul>
        <div className="divider"></div>
        {isLoading && "Loading ..."}
        {isAuthenticated ? (
          <ul>
            <li>
              <FiUser/> <a onClick={() => goToLink("/profile")}>{user?.name}</a>
            </li>
            <li>
              <a onClick={() => goToLink("/inventory")}>
                <GiBackpack /> Inventory
              </a>
            </li>
            <li>
              <a onClick={() => goToLink("/wallet")}>
                <GiToken /> Wallet
              </a>
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
