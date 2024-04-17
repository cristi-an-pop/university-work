import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { List } from "../types/ListType";

type ListsStore = {
  lists: List[];
  setLists: (lists: List[]) => void;
};

export const useListsStore = create<ListsStore>()(
  persist(
    (set) => ({
      lists: [],
      setLists: (lists: List[]) => set({ lists }),
    }),
    {
      name: "lists-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
