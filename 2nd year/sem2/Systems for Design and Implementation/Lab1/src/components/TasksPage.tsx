import React, { useEffect, useState } from 'react';

interface List {
    id: string;
    name: string;
    tasks: Task[];
}

interface Task {
    id: string;
    name: string;
    completed: boolean;
    dateTime: string;
}

interface Props {
    lists: List[];
    selectedListId: string | null;
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
}

function TasksPage({ lists, selectedListId, setLists }: Props) {
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
        localStorage.setItem('selectedListId', selectedListId || '')
      }, [lists, selectedListId]);
    const selectedList = lists.find((list) => list.id === selectedListId);
    if (!selectedList) return <div>Selected list not found</div>;

    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDateTime, setNewTaskDateTime] = useState('');
    const [filterDateTime, setFilterDateTime] = useState('');
    const [filterCompleted, setFilterCompleted] = useState(false);

    const handleNewTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTaskName.trim() || !newTaskDateTime.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            name: newTaskName,
            completed: false,
            dateTime: newTaskDateTime,
        };
        const updatedLists = lists.map((list) => {
            if (list.id === selectedListId) {
                list.tasks.push(newTask);
            }
            return list;
        });

        setLists(updatedLists);
        setNewTaskName('');
        setNewTaskDateTime('');
    };

    const handleTaskCheckboxChange = (taskId: string) => {
        const updatedLists = lists.map((list) => {
            if (list.id === selectedListId) {
                list.tasks = list.tasks.map((task) =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                );
            }
            return list;
        });
        setLists(updatedLists);
    };

    const handleDeleteTask = (taskId: string) => {
        const updatedLists = lists.map((list) => {
            if (list.id === selectedListId) {
                list.tasks = list.tasks.filter((task) => task.id !== taskId);
            }
            return list;
        });
        setLists(updatedLists);
    };

    const handleDeleteCompletedTasks = () => {
        const updatedLists = lists.map((list) => {
            if (list.id === selectedListId) {
                list.tasks = list.tasks.filter((task) => !task.completed);
            }
            return list;
        });
        setLists(updatedLists);
    };

    const remainingTasksCount = selectedList.tasks.filter((task) => !task.completed).length;

    let filteredTasks = selectedList.tasks;
    if (filterDateTime) {
        filteredTasks = filteredTasks.filter(task => task.dateTime.includes(filterDateTime));
    }
    if (filterCompleted) {
        filteredTasks = filteredTasks.filter(task => task.completed);
    }

    return (
        <div className="tasks-container">
            <h2>{selectedList.name}</h2>
            <form className="list-form" onSubmit={handleNewTaskSubmit}>
                <input
                    className="form-input"
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Enter task name"
                />
                <input
                    className="form-input"
                    type="datetime-local"
                    value={newTaskDateTime}
                    onChange={(e) => setNewTaskDateTime(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
            <div className="tasks-filters">
                <input
                    className="form-input"
                    type="datetime-local"
                    value={filterDateTime}
                    onChange={(e) => setFilterDateTime(e.target.value)}
                    placeholder="Filter by date"
                />
                <label>
                    <input
                        type="checkbox"
                        checked={filterCompleted}
                        onChange={(e) => setFilterCompleted(e.target.checked)}
                    />
                    <span>Show Completed Tasks</span>
                </label>
            </div>
            <div className="tasks-list-container">
                <p className="p-style">Tasks remaining: {remainingTasksCount}</p>
                <div className="lists">
                    <ul>
                        {filteredTasks.map((task: Task) => (
                            <li key={task.id}>
                                <div className="list-item-container">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleTaskCheckboxChange(task.id)}
                                    />
                                    <span>{task.name}</span>
                                    <span>{task.dateTime}</span>
                                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="button" onClick={handleDeleteCompletedTasks}>
                    Delete Completed Tasks
                </button>
            </div>
        </div>
    );
}

export default TasksPage;
