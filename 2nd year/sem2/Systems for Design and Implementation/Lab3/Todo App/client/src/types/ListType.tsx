interface List {
    id: number;
    name: string;
    tasks: Task[];
}

interface Task {
    id: number;
    name: string;
    completed: boolean;
    dateTime: string;
    list_id: number;
}

export type { List, Task };
