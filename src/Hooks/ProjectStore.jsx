import create from "zustand";

const useProjectStore = create((set) => ({
  project: {},
  tracking: [],
  setProject: (project) => set({ project: project }),
  setTracking: (tracking) => set({ tracking: tracking }),
}));

export default useProjectStore;