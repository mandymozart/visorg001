import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { Report } from "./Report";

export const useReportStore = create<State>((set, get) => ({
  reports: [],
  addReport: (report) =>
    set(
      produce((state) => {
        state.reports.push(report);
      })
    ),
  filterReports: (receipientAddress) => {
    const reports = get().reports.filter(
      (report) => report.receipientAddress === receipientAddress
    );
    return reports;
  },
}));

type State = {
  reports: Report[];
  addReport: (report: Report) => void;
  filterReports: (receipientAddress: string) => Report[] | undefined;
};

if (process.env.REACT_APP_STAGE === undefined) {
  let root = document.createElement("div");
  root.id = "reportStore";
  document.body.appendChild(root);
  mountStoreDevtool("ReportStore", useReportStore as any, root);
}
