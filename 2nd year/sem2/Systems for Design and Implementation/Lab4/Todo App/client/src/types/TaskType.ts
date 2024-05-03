interface Task {
  id: string;
  name: string;
  completed: boolean;
  dateTime: string;
  list_id: string;
}

interface DirtyTask {
  id: string;
  name: string;
  completed: boolean;
  dateTime: string;
  list_id: string;
  existed: boolean;
  deleted: boolean;
}

export type { Task, DirtyTask };
