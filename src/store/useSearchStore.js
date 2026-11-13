import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchData: null,
  setSearchData: (data) => set({ searchData: data }),
  clearSearchData: () => set({ searchData: null }),
}));

export default useSearchStore;
