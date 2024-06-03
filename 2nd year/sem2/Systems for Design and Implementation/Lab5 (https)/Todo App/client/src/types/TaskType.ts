interface Task {
  id: string;
  name: string;
  completed: boolean;
  dateTime: string;
  list_id: string;
}

interface DirtyTask extends Task {
  existed: boolean;
  deleted: boolean;
}

export type { Task, DirtyTask };
