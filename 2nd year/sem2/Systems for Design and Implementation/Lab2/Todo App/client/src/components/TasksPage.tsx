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
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
}

function TasksPage({ lists, setLists }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedListId, setSelectedListId] = useState<string | null>(null);

    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDateTime, setNewTaskDateTime] = useState('');
    const [filterDateTime, setFilterDateTime] = useState('');
    const [filterCompleted, setFilterCompleted] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/selectedListId')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setSelectedListId(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
        fetch('http://localhost:5000/api/lists')
          .then(response => response.json())
          .then(data => {
            setLists(data);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error:', error);
            setIsLoading(false);
          });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const selectedList = lists.find((list) => list.id === selectedListId);
    if (!selectedList) return <div>Selected list not found</div>;

    const handleNewTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTaskName.trim() || !newTaskDateTime.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            name: newTaskName,
            completed: false,
            dateTime: newTaskDateTime,
        };

        fetch(`http://localhost:5000/api/lists/${selectedListId}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error on Task Add:', error);
            });

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
        fetch(`http://localhost:5000/api/lists/${selectedListId}/tasks/${taskId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => console.error('Error on Task Delete:', error));

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
