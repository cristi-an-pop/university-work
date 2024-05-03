import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Task, DirtyTask } from "../types/TaskType";

type TaskStore = {
  tasks: Task[];
  dirtyTasks: DirtyTask[];
  setTasks: (tasks: Task[]) => void;
  setDirtyTasks: (dirtyTasks: DirtyTask[]) => void;
};

export const useTasksStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      dirtyTasks: [],
      setTasks: (tasks: Task[]) => set({ tasks }),
      setDirtyTasks: (dirtyTasks: DirtyTask[]) => set({ dirtyTasks }),
    }),
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
