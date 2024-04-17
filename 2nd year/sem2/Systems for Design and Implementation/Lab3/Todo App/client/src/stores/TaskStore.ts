import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Task } from "../types/ListType";

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

export const useTasksStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks: Task[]) => set({ tasks }),
    }),
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
