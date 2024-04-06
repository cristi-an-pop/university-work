import { create } from "zustand";
import { List, Task } from "./types/ListType";

type ListsStore = {
  lists: List[];
  setLists: (lists: List[]) => void;
  addList: (name: string) => void;
  editList: (id: string, name: string) => void;
  addTask: (list: List, task: Task) => void;
  editTask: (
    listId: string,
    taskId: string,
    name: string,
    completed: boolean
  ) => void;
  deleteTask: (listId: string, taskId: string) => void;
};

export const useListsStore = create<ListsStore>((set) => ({
  lists: [],
  setLists: (lists) => set({ lists }),
  addList: (name) => {
    set((state) => {
      const newList: List = {
        id: Date.now().toString(),
        name,
        tasks: [],
      };
      return { lists: [...state.lists, newList] };
    });
  },
  editList: (id, name) => {
    set((state) => {
      const updatedLists = state.lists.map((list) =>
        list.id === id ? { ...list, name } : list
      );
      return { lists: updatedLists };
    });
  },
  addTask: (list, task) => {
    set((state) => {
      const updatedLists = state.lists.map((l) =>
        l.id === list.id ? { ...l, tasks: [...l.tasks, task] } : l
      );
      return { lists: updatedLists };
    });
  },
  editTask: (listId, taskId, name, completed) => {
    set((state) => {
      const updatedLists = state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, name, completed } : task
              ),
            }
          : list
      );
      return { lists: updatedLists };
    });
  },
  deleteTask: (listId, taskId) => {
    set((state) => {
      const updatedLists = state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list
      );
      return { lists: updatedLists };
    });
  },
}));
