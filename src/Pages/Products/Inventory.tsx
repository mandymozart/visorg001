import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import type { LinkProps } from "react-router-dom";
import {
  Link,
  Route,
  Routes,
  useMatch,
  useResolvedPath
} from "react-router-dom";
import Layout from "../../Components/Layout";
import InventoryReservationForm from "./InventoryReservationForm";
import InventoryReservations from "./InventoryReservations";

const Container = styled.div`
  padding: 1rem;
`;

const Body = styled.div`
  padding: 0;
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

const InventoryNavigation = styled.nav`
  text-align: center;
  margin-bottom: 1rem;
`;

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <span>
      <Link
        style={{ textDecoration: match ? "underline" : "none" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </span>
  );
}

const Inventory = () => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) return null;
  return (
    <Layout>
      <Container>
        <h2>Rent items from portal</h2>
        <InventoryNavigation>
          <CustomLink to="reservations">All Reservations</CustomLink>{" "}
          <CustomLink to="reservation">New Reservations</CustomLink>
        </InventoryNavigation>
        <Body>
          <Routes>
            <Route path="/" element={<InventoryWelcome />} />
            <Route path="reservations" element={<InventoryReservations />} />
            <Route path="reservation" element={<InventoryReservationForm />} />
          </Routes>
        </Body>
      </Container>
    </Layout>
  );
};

const InventoryWelcome = () => {
  return (
    <>
      <h4>How it works</h4>
      <p>
        We like to share our infrastructure. In order to maintain the quality we
        also share the responsibility. Making sure that we pay for the rentals
        guarantees long term sustainability of the portal.
      </p>
      <p>
        Make a new reservation to rent equipment. The app will let you know when
        an item is not available or where it is.
      </p>
    </>
  );
};

export default Inventory;
