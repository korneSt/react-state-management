import create, { State } from "zustand";

interface IGlobalStore extends State {
  darkMode: boolean;
  setDarkMode: () => void,
}


const useGlobalStore = create<IGlobalStore>((set) => ({
  darkMode: false,
  setDarkMode: () => set((state) => ({darkMode: !state.darkMode})),
}));

export default useGlobalStore;