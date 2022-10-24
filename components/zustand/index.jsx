import create from "zustand";

const useColorStore = create((set) => ({
    bgColor: "#fff",
    setBgColor: (bgColor) => set({ bgColor }),
    //   setBgColor: () => set((state) => ({ bears: state.bears + 1 })),
    //   removeAllBears: () => set({ bears: 0 }),
}));

export default useColorStore;
