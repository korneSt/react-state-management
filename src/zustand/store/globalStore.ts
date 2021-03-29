import create from "zustand";

type IGlobal = {
  darkMode: boolean;
  setDarkMode: () => void,
}


const useGlobalStore = create<IGlobal>((set): IGlobal => ({
  darkMode: false,
  setDarkMode: () => set((state) => ({darkMode: !state.darkMode})),
}));

export default useGlobalStore;