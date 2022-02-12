import styled from "@emotion/styled";
import React from "react";
import { GiToken } from "react-icons/gi";
import FadeInView from "../../Animations/FadeInView";
import { useCartStore } from "../../Stores/CartStore";
import { useWalletStore } from "../../Stores/WalletStore";

const Container = styled.div`
  text-align: right;
  margin-bottom: 1rem;
`;

const CartSummary = () => {
  const { abbreviation, balance } = useWalletStore();
  const { getTotal, getFees } = useCartStore();
  return (
    <FadeInView>
      <Container>
        <small>
          Sum: <GiToken /> {getTotal(abbreviation)}
        </small>
        <br />
        <small>
          Estimated fees: <GiToken /> {getFees(abbreviation)}
        </small>
        <h3>
          Total: <GiToken /> {getTotal(abbreviation) + getFees(abbreviation)}
        </h3>
        <small>
          Saldo: <GiToken /> {balance}
        </small>
      </Container>
    </FadeInView>
  );
};

export default CartSummary;
