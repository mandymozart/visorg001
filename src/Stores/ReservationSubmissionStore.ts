import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";

export const useReservationSubmissionStore = create<State>((set) => ({
  success: false,
  failed: false,
  isSubmitting: false,
  ready: false,
  setSuccess: (value) =>
    set(
      produce((state: State) => {
        state.success = value;
      })
    ),
  setReady: (value) =>
    set(
      produce((state: State) => {
        state.ready = value;
      })
    ),
  setFailed: (value) =>
    set(
      produce((state: State) => {
        state.failed = value;
      })
    ),
  setIsSubmitting: (value) =>
    set(
      produce((state: State) => {
        state.isSubmitting = value;
      })
    ),
  finishedSubmitIventoryEvent: false,
  finishedLogTransaction: false,
  finishedDeductFundsFromBenefactor: false,
  finishedSendFundsToBeneficiary: false,
  finishedSendFees: false,
  finishedSendReport: false,

  setFinishedSubmitIventoryEvent: (value) =>
    set(
      produce((state: State) => {
        state.finishedSubmitIventoryEvent = value;
      })
    ),
  setFinishedLogTransaction: (value) =>
    set(
      produce((state: State) => {
        state.finishedLogTransaction = value;
      })
    ),
  setFinishedDeductFundsFromBenefactor: (value) =>
    set(
      produce((state: State) => {
        state.finishedDeductFundsFromBenefactor = value;
      })
    ),
  setFinishedSendFundsToBeneficiary: (value) =>
    set(
      produce((state: State) => {
        state.finishedSendFundsToBeneficiary = value;
      })
    ),
  setFinishedSendFees: (value: boolean) =>
    set(
      produce((state: State) => {
        state.finishedSendFees = value;
      })
    ),
  setFinishedSendReport: (value) =>
    set(
      produce((state: State) => {
        state.finishedSendReport = value;
      })
    ),
    reset: () =>set(
      produce((state: State) => {
        state.isSubmitting = false;
        state.ready = false;
        state.success = false;
        state.failed = false;
        state.finishedDeductFundsFromBenefactor = false;
        state.finishedLogTransaction = false;
        state.finishedSendFees = false;
        state.finishedSendFundsToBeneficiary = false;
        state.finishedSendReport = false;
        state.finishedSubmitIventoryEvent = false;
      })
    ),
}));

type State = {
  isSubmitting: boolean;
  success: boolean;
  failed: boolean;
  ready: boolean;
  setIsSubmitting: (value: boolean) => void;
  setSuccess: (value: boolean) => void;
  setFailed: (value: boolean) => void;
  setReady: (value: boolean) => void;
  finishedSubmitIventoryEvent: boolean;
  finishedLogTransaction: boolean;
  finishedDeductFundsFromBenefactor: boolean;
  finishedSendFundsToBeneficiary: boolean;
  finishedSendFees: boolean;
  finishedSendReport: boolean;
  setFinishedSubmitIventoryEvent: (value: boolean) => void;
  setFinishedLogTransaction: (value: boolean) => void;
  setFinishedDeductFundsFromBenefactor: (value: boolean) => void;
  setFinishedSendFundsToBeneficiary: (value: boolean) => void;
  setFinishedSendFees: (value: boolean) => void;
  setFinishedSendReport: (value: boolean) => void;
  reset: ()=> void;
};

if (process.env.REACT_APP_STAGE === undefined) {
  let root = document.createElement("div");
  root.id = "reservationSubmissionStore";
  document.body.appendChild(root);
  mountStoreDevtool(
    "ReservationSubmissionStore",
    useReservationSubmissionStore as any,
    root
  );
}
