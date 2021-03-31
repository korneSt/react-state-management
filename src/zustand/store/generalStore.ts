import create, { State } from "zustand";

interface IGeneralStore extends State {
  darkMode: boolean;
  setDarkMode: () => void;
}


const useGeneralStore = create<IGeneralStore>((set) => ({
  darkMode: false,
  setDarkMode: () => set((state) => ({darkMode: !state.darkMode})),
}));

export default useGeneralStore;