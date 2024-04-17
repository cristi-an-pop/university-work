import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List, Task } from '../types/ListType';
import axios from 'axios';
import { useAxiosStore } from '../stores/AxiosStore';
import NotificationDisplay from './NotificationDisplay';
import { useNotificationStore } from '../stores/NotificationStore';

function TasksPage() {
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDateTime, setNewTaskDateTime] = useState('');
    const [filterDateTime, setFilterDateTime] = useState('');
    const [filterCompleted, setFilterCompleted] = useState(false);
    const [selectedList, setSelectedList] = useState<List | null>(null);
    const { getAxiosInstance } = useAxiosStore(state => ({ getAxiosInstance: state.getAxiosInstance }));
    const { addNotification } = useNotificationStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`lists/${id}`);
                setSelectedList(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

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

        getAxiosInstance()
        .post(`/lists/${id}/tasks`, newTask)
        .then(() => {
            addNotification('Task added successfully', 'success');
            const updatedList = { ...selectedList };
            updatedList.tasks.push(newTask);
            setSelectedList(updatedList);
            setNewTaskName('');
            setNewTaskDateTime('');
        })
        .catch((error) => {
            console.error('Error on Task Add:', error);
        });
    };

    const handleTaskCheckboxChange = (taskId: string) => {
        const updatedList = { ...selectedList };
        const task = updatedList.tasks.find((task) => task.id === taskId);
        if (!task) return;
        task.completed = !task.completed;

        getAxiosInstance()
        .patch(`/lists/${id}/tasks/${taskId}`, task)
        .then(response => {
            addNotification('Task updated successfully', 'success');
            setSelectedList(updatedList);
            return response;
        })
        .catch(error => console.error('Error on Task Update:', error));
    };

    const handleDeleteTask = (taskId: string) => {
        getAxiosInstance()
        .delete(`/lists/${id}/tasks/${taskId}`)
        .then(response => {
            addNotification('Task deleted successfully', 'success');
            const updatedList = { ...selectedList };
            updatedList.tasks = updatedList.tasks.filter((task) => task.id !== taskId);
            setSelectedList(updatedList);
            return response;
        })
        .catch(error => console.error('Error on Task Delete:', error));
    };

    const handleDeleteCompletedTasks = () => {
        const completedTasks = selectedList.tasks.filter(task => task.completed);
        const completedTaskIds = completedTasks.map(task => task.id);
    
        Promise.all(completedTaskIds.map(taskId => 
            axios.delete(`http://localhost:5000/api/lists/${id}/tasks/${taskId}`)
        ))
        .then(responses => {
    
            for(let response of responses) {
                if (response.status !== 200) {
                    addNotification('Error deleting completed tasks', 'error');
                    throw new Error('Network response was not ok');
                }
            }
   
            const updatedList = { ...selectedList };
            updatedList.tasks = updatedList.tasks.filter((task) => !task.completed);
            addNotification('Completed tasks deleted successfully', 'success');
            setSelectedList(updatedList);
        })
        .catch(error => console.error('Error on Completed Tasks Delete:', error));
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
        <>
            <NotificationDisplay />
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
        </>
    );
}

export default TasksPage;
