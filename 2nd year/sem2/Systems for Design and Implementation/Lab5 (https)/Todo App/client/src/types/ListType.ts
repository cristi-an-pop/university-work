interface List {
  id: string;
  name: string;
  taskCount: number;
}

interface DirtyList extends List {
  existed: boolean;
  deleted: boolean;
}

export type { List, DirtyList };
