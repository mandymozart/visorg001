import styled from "@emotion/styled";
import React from "react";
import FadeInView from "../../Animations/FadeInView";

const Container = styled.div`
  .text-xl {
    font-size: 1.5rem;
  }
`;
const InventoryWelcomePage = () => {
  return (
    <Container>
      <FadeInView>
        <h1>Sharing is growth!</h1>
        <p className="text-xl">
          We like to share our infrastructure. In order to maintain the quality
          we also share the responsibility. Making sure that we pay for the
          rentals guarantees long term sustainability of the portal.
        </p>
        <h3>Check availabilities</h3>
        <p className="text-xl">
          Make a new reservation to rent equipment. The app will let you know
          when an item is not available or where it is.
        </p>
        <h3>Earn Tokens</h3>
        <p className="text-xl">
          Each time someone uses your gear you receive Tokens. With these you
          can either grow your influence in the governance of Vienna Struggle or
          you can use for maintenance or rent.
        </p>
        <h3>Monthly invoices</h3>
        <p className="text-xl">
          Rent as much as you like and we invoice you at the end of each month.
          This is especially useful if you do many small productions.
        </p>
      </FadeInView>
    </Container>
  );
};

export default InventoryWelcomePage;
