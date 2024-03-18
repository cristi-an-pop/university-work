import { useState } from 'react';

interface List {
    id: string,
    name: string,
    tasks: any[]
}

interface Task {
    id: string,
    name: string,
    completed: boolean
}

interface Props {
    lists: List[],
    selectedListId: string | null,
    setLists: React.Dispatch<React.SetStateAction<any[]>>,

}

function TasksPage( {lists, selectedListId, setLists }: Props) {
    const selectedList = lists.find((list) => list.id === selectedListId);
    if(!selectedList) return <div>Selected list not found</div>;

    const [newTaskName, setNewTaskName] = useState('');

    const handleNewTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!newTaskName.trim()) return;
        const newTask: Task = {
            id: Date.now().toString(),
            name: newTaskName,
            completed: false
        };
        const updatedLists = lists.map((list) => {
            if (list.id === selectedListId) {
                list.tasks.push(newTask);
            }
            return list;
        });

        setLists(updatedLists);
        setNewTaskName('');
    }

    const handleTaskCheckboxChange = (taskId: string) => {
        const updatedLists = lists.map((list) => {
          if (list.id === selectedListId) {
            list.tasks = list.tasks.map((task) =>
              task.id === taskId ? { ...task, complete: !task.complete } : task
            );
          }
          return list;
        });
        setLists(updatedLists);
    };

    const getUncompletedTasks = () => {
        return selectedList.tasks.filter((task) => !task.completed).length;
    }

    const [uncompletedTasks, setUncompletedTasks] = useState(getUncompletedTasks())

    const handleCompletedTasks = () => {
        const updatedLists = lists.map((list) => {
            if (list.id === selectedListId) {
                list.tasks = list.tasks.filter((task) => !task.completed);
            }
            return list;
        });
        setLists(updatedLists);
        setUncompletedTasks(getUncompletedTasks());
    }

    return (
        <div className="tasks-container">
            <h2>{selectedList.name}</h2>
            <form onSubmit={handleNewTaskSubmit}>
                <input 
                    type="text" 
                    name={newTaskName} 
                    onChange={(e) => setNewTaskName(e.target.value)} 
                    placeholder="Enter task name" 
                />
                <button type="submit">Add Task</button>
            </form> 
            <div className="tasks-list-container">
                <div className="tasks-list-info">
                    <span>Tasks remaining: {uncompletedTasks}</span>
                    <button type="button" onClick={handleCompletedTasks}>Clear Completed Tasks</button>
                </div>
                <ul>
                    {selectedList.tasks.map((task: any) => (
                        <li key={task.id}>
                            <input 
                                type="checkbox"
                                onChange={() => handleTaskCheckboxChange(task.id)}
                            />
                            {task.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TasksPage;