import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import { enableMapSet } from "immer";
import { nanoid } from "nanoid";
import React from "react";
import toast from "react-hot-toast";
import { useAddInventoryEvent } from "../../Hooks/Queries";
import { useCartStore } from "../../Stores/CartStore";
import { useWalletStore } from "../../Stores/WalletStore";
import { errorHandler } from "../../Utilities/ErrorHandlers";
import { Button, PrimaryButton } from "../Button";

enableMapSet();

const Container = styled.div`
  text-align: right;
`;

const MiniCartActions = () => {
  const { user } = useAuth0();

  const items = useCartStore((store) => store.items);
  const isLoading = useCartStore((store) => store.isLoading);
  const isSubmitting = useCartStore((store) => store.isSubmitting);
  const setIsSubmitting = useCartStore((store) => store.setIsSubmitting);
  const getTotal = useCartStore((store) => store.getTotal);
  const getFees = useCartStore((store) => store.getFees);
  const clearItems = useCartStore((store) => store.clearItems);
  const fromDate = useCartStore((store) => store.fromDate);
  const toDate = useCartStore((store) => store.toDate);
  const tokens = useWalletStore((store) => store.tokens);
  const deductTokens = useWalletStore((store) => store.deductTokens);

  const mutation = useAddInventoryEvent();

  const checkout = () => {
    const grandTotal = getTotal() + getFees();
    if (tokens < grandTotal) {
      toast.error("Insufficient funds!", { icon: "💣" });
      return;
    }
    if (!user) {
      // this condition is actually hardly met
      toast.error("Not logged in!", { icon: "💣" });
      return;
    }
    if (fromDate === "" && toDate === "") {
      toast.error("Let us know when you need the stuff!", { icon: "💣" });
      return;
    }
    setIsSubmitting(true);

    deductTokens(grandTotal);

    items.forEach((item) => {
      // throttle requests
      setTimeout(() => {
        mutation.mutate(
          {
            eventId: nanoid(8),
            renter: user.nickname,
            type: "reservation",
            productId: item.product.productId,
            fromDate: fromDate,
            toDate: toDate,
            quantity: item.quantity,
          },
          {
            onSuccess: () => {
              setIsSubmitting(false);
              createReport();
              toast.success(
                `Done!\nLast transaction: ${grandTotal}\nNew balance: ${tokens} `,
                { icon: "✨" }
              );
              // navigate("/inventory/reservations");
            },
            onError: errorHandler,
          }
        );
      }, 1000);
    });
  };

  const createReport = () => {
    // TODO: Information required after completed transactions:
    /**
     * each benefector receives an email, about their sale
     * the renter receives an email with a confirmation of the
     * * ordered items.
     * * emergency contact information from owners
     * * an updated wallet balance
     **/

    clearItems();
  };

  if (!user) return <></>;
  return (
    <Container>
      {items.length > 0 && (
        <>
          <Button onClick={() => clearItems()}>Clear items</Button>{" "}
          <PrimaryButton
            isLoading={isSubmitting || isLoading}
            type="button"
            onClick={checkout}
          >
            Checkout {items.length} items
          </PrimaryButton>
        </>
      )}
    </Container>
  );
};

export default MiniCartActions;
