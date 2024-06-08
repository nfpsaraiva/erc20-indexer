import { create } from "zustand";

interface StoreState {
  searchTerm: string,
  setSearchTerm: (searchTerm: string) => void
}

const useStore = create<StoreState>()(set => ({
  searchTerm: '0xDa52002ddB5ad541d1559466Fd7505c562480dD8',
  setSearchTerm: searchTerm => set(() => ({ searchTerm }))
}));

export default useStore;