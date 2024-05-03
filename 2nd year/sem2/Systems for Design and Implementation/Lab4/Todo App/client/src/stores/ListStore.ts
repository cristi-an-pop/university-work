import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { List, DirtyList } from "../types/ListType";

type ListsStore = {
  lists: List[];
  dirtyLists: DirtyList[];
  setLists: (lists: List[]) => void;
  setDirtyLists: (dirtyLists: DirtyList[]) => void;
};

export const useListsStore = create<ListsStore>()(
  persist(
    (set) => ({
      lists: [],
      dirtyLists: [],
      setLists: (lists: List[]) => set({ lists }),
      setDirtyLists: (dirtyLists: DirtyList[]) => set({ dirtyLists }),
    }),
    {
      name: "lists-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
