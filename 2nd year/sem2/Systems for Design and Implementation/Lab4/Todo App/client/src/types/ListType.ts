interface List {
  id: string;
  name: string;
  taskCount: number;
}

interface DirtyList {
  id: string;
  name: string;
  taskCount: number;
  existed: boolean;
  deleted: boolean;
}

interface ListCount {
  list_id: string;
  count: number;
}

export type { List, DirtyList, ListCount };
