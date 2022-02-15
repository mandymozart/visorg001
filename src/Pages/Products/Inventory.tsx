import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import { NavLink, NavLinkProps, Outlet, Route, Routes } from "react-router-dom";
import FadeInView from "../../Animations/FadeInView";
import AuthentificationRequired from "../../Components/Authentification/AuthentificationRequired";
import Layout from "../../Components/Layout";
import InventoryWelcomePage from "../Inventory/InventoryWelcomePage";
import InventoryFavorites from "./InventoryFavorites";
import InventoryLentOut from "./InventoryLentOut";
import InventoryProducts from "./InventoryProducts";
import InventoryRented from "./InventoryRented";

const Container = styled.div`
  padding: 1rem;
`;

const Body = styled.div`
  padding: 0;
  margin-top: 2rem;
  line-height: 1.3;
  .item {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    justify-content: space-between;
    border-bottom: var(--color) 1px solid;
    margin-bottom: 1rem;
    @media only screen and (max-width: 800px) {
      display: block;
    }
    .owner {
      text-align: left;
    }
    .stock {
      flex: 0 0 8rem;
      .price {
        text-align: right;
      }
      .actions {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        button {
          padding: 0 0.5rem;
        }
      }
    }
  }
`;

const TabNavigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  width: 100%;
  height: 11.5rem;
  display: flex;
  align-items: end;
  justify-content: center;
  z-index: 1;
  border-bottom: 1px solid var(--color);
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    li {
      display: inline-block;
      padding: 0 2rem;
    }
  }
`;

const CustomLinkWrapper = styled.span`
  .isActive {
    border-bottom: 1px solid var(--third);
  }
`;

function CustomLink({ children, to, ...props }: NavLinkProps) {
  return (
    <CustomLinkWrapper>
      <NavLink
        className={(navData) => (navData.isActive ? "isActive" : "")}
        to={to}
        {...props}
      >
        <h5>{children}</h5>
      </NavLink>
    </CustomLinkWrapper>
  );
}

const Inventory = () => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) return <AuthentificationRequired />;
  return (
    <Layout>
      <Container>
        <FadeInView>
          <TabNavigation className="glassomorphism">
            <div>
              <ul>
                <li>
                  <CustomLink to="">Reservations</CustomLink>{" "}
                </li>
                <li>
                  <CustomLink to="product">Pick a date</CustomLink>{" "}
                </li>
                <li>
                  <CustomLink to="rented">Rented</CustomLink>{" "}
                </li>
                <li>
                  <CustomLink to="lent-out">Lent out</CustomLink>{" "}
                </li>
                <li>
                  <CustomLink to="favorites">Favorites</CustomLink>
                </li>
              </ul>
            </div>
          </TabNavigation>
        </FadeInView>
        <Body>
          <Routes>
            <Route path="/" element={<InventoryWelcomePage />} />
            <Route path="rented" element={<InventoryRented />} />
            <Route path="lent-out" element={<InventoryLentOut />} />
            <Route path="favorites" element={<InventoryFavorites />} />
            <Route path="product" element={<InventoryProducts />} />
            <Route path="product/:productId" element={<InventoryProducts />} />
          </Routes>
          <Outlet />
        </Body>
      </Container>
    </Layout>
  );
};

export default Inventory;
