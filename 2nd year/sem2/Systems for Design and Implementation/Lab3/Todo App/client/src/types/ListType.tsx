interface List {
    id: string;
    name: string;
}

interface DirtyList {
    id: string,
    name: string,
    existed: boolean,
    deleted: boolean
}

interface ListCount {
    list_id: string;
    count: number;
}

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

export type { List, DirtyList, Task, DirtyTask, ListCount };
