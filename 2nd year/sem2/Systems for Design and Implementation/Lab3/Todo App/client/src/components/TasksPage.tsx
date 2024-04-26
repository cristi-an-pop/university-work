import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List, Task } from '../types/ListType';
import axios from 'axios';
import io from 'socket.io-client';
import { useAxiosStore } from '../stores/AxiosStore';
import NotificationDisplay from './NotificationDisplay';
import { useNotificationStore } from '../stores/NotificationStore';
import { useTasksStore } from '../stores/TaskStore';
import { v4 as uuid } from 'uuid';
import { useListsStore } from '../stores/ListStore';
import InfiniteScroll from 'react-infinite-scroll-component';

function TasksPage() {
    const { id: idString } = useParams<{ id: string }>();
    const id = String(idString);

    const [isLoading, setIsLoading] = useState(true);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDateTime, setNewTaskDateTime] = useState('');
    const [filterDateTime, setFilterDateTime] = useState('');
    const [filterCompleted, setFilterCompleted] = useState(false);
    const [selectedList, setSelectedList] = useState<List | null>(null);
    const { getAxiosInstance } = useAxiosStore(state => ({ getAxiosInstance: state.getAxiosInstance }));
    const { addNotification } = useNotificationStore();
    const { tasks, setTasks } = useTasksStore(state => ({ tasks: state.tasks, setTasks: state.setTasks }));
    const { dirtyTasks, setDirtyTasks } = useTasksStore(state => ({ dirtyTasks: state.dirtyTasks, setDirtyTasks: state.setDirtyTasks }));
    const [isOnline, setIsOnline] = useState(false);
    const { lists } = useListsStore();
    const [page, setPage] = useState(1);
    useEffect(() => {
        setSelectedList(lists.find(list => list.id === id) ?? null);
    }, [lists, id]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/lists/${id}/tasks?page=${page}&pageSize=50`);
            setTasks(response.data);
            setPage(page + 1);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const socket = io('http://localhost:5000');
    
        const handleOnline = () => {
          setIsOnline(true);
        }
    
        const handleOffline = () => {
          setIsOnline(false);
        }
    
        socket.on('connect', handleOnline);
        socket.on('disconnect', handleOffline);
    
        return () => {
          socket.disconnect();
        }
    }, []);

    useEffect(() => {
        if (selectedList) {
            fetchTasks();
        }
    }, [selectedList, setTasks]);

    useEffect(() => {
        if (isOnline) {
            dirtyTasks.forEach(dirtyTask => {
                if(dirtyTask.existed == false && dirtyTask.deleted == false) {
                    getAxiosInstance()
                    .post(`/lists/${id}/tasks`, dirtyTask)
                    .then(response => {
                        const updatedTasks = [ ...tasks, response.data ];
                        setTasks(updatedTasks);
                        addNotification('Task added successfully', 'success');
                    })
                    .catch(() => {
                        addNotification('Error adding task', 'error');
                    });
                } else if(dirtyTask.existed == true && dirtyTask.deleted == false) {
                    getAxiosInstance()
                    .patch(`/lists/${id}/tasks/${dirtyTask.id}`, dirtyTask)
                    .then(response => {
                        const updatedTasks = tasks.map(task => task.id === dirtyTask.id ? dirtyTask : task);
                        setTasks(updatedTasks);
                        addNotification('Task updated successfully', 'success');
                    })
                    .catch(() => {
                        addNotification('Error updating task', 'error');
                    });
                } else if(dirtyTask.existed == true && dirtyTask.deleted == true) {
                    getAxiosInstance()
                    .delete(`/lists/${id}/tasks/${dirtyTask.id}`)
                    .then(response => {
                        const updatedTasks = tasks.filter(task => task.id !== dirtyTask.id);
                        setTasks(updatedTasks);
                        addNotification('Task deleted successfully', 'success');
                    })
                    .catch(() => {
                        addNotification('Error deleting task', 'error');
                    });
                }
            });
        }
      }, [isOnline])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!selectedList) return <div>Selected list not found</div>;

    const handleNewTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTaskName.trim() || !newTaskDateTime.trim()) return;
        
        const newTask = {
            id: uuid(),
            name: newTaskName,
            completed: false,
            dateTime: newTaskDateTime,
        };
    
        getAxiosInstance()
        .post(`/lists/${id}/tasks`, newTask)
        .then((response) => {
            addNotification('Task added successfully', 'success');
            const updatedTasks = [ ...tasks, response.data ];
            setTasks(updatedTasks);
            setNewTaskName('');
            setNewTaskDateTime('');
            return response;
        })
        .catch((error) => {
            if(error.code === "ERR_NETWORK") {
                setDirtyTasks([...dirtyTasks, { id: newTask.id, name: newTask.name, completed: newTask.completed, dateTime: newTask.dateTime, list_id: id, existed: false, deleted: false }]);
                addNotification('Task added successfully', 'warning');
            } else {
                addNotification('Error adding task', 'error');
            }
        });
    };

    const handleTaskCheckboxChange = (taskId: string) => {
        const newTasks = [ ...tasks ];
        console.log(newTasks);
        const task = newTasks.find(task => task.id === taskId);
        if (!task) return;
        task.completed = !task.completed;

        getAxiosInstance()
        .patch(`/lists/${id}/tasks/${taskId}`, task)
        .then(response => {
            addNotification('Task updated successfully', 'success');
            setTasks(newTasks);
            return response;
        })
        .catch((error) => {
            if(error.code === "ERR_NETWORK") {
                setTasks(tasks.filter(task => task.id !== taskId));
                setDirtyTasks([...dirtyTasks, { id: taskId, name: task.name, completed: task.completed, dateTime: task.dateTime, list_id: id, existed: true, deleted: false }]);
                addNotification('Task updated successfully', 'warning');
            } else {
                addNotification('Error updating task', 'error');
            }
        });
    };

    const handleDeleteTask = (taskId: string) => {
        getAxiosInstance()
        .delete(`/lists/${id}/tasks/${taskId}`)
        .then(response => {
            addNotification('Task deleted successfully', 'success');
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
            return response;
        })
        .catch((error) => {
            if(error.code === "ERR_NETWORK") {
                const taskToDelete = tasks.find(task => task.id === taskId);
                if (taskToDelete) {
                    setTasks(tasks.filter(task => task.id !== taskId));
                    setDirtyTasks([...dirtyTasks, { id: taskToDelete.id, name: taskToDelete.name, completed: taskToDelete.completed, dateTime: taskToDelete.dateTime, list_id: id, existed: true, deleted: true }]);
                    addNotification('Task deleted unsynced', 'warning');
                }
                else {
                    const taskToDelete = dirtyTasks.find(dirtyTask => dirtyTask.id === taskId);
                    if (taskToDelete) {
                        setDirtyTasks(dirtyTasks.map(dirtyTask => dirtyTask.id === taskId ? { ...dirtyTask, existed: true, deleted: true } : dirtyTask));
                        addNotification('Task deleted unsynced', 'warning');
                    }
                }
            }
            else {
                addNotification('Error deleting task', 'error');
            }
        });
    };

    const handleDeleteCompletedTasks = () => {
        const tasksCopy = [...tasks];
        const completedTasks = tasksCopy.filter(task => task.completed);
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
   
            let newTasks = [ ...tasks ];
            newTasks = newTasks.filter(task => !task.completed);
            addNotification('Completed tasks deleted successfully', 'success');
            setTasks(newTasks);
        })
        .catch(error => console.error('Error on Completed Tasks Delete:', error));
    };

    const remainingTasksCount = tasks.filter(task => !task.completed).length;

    let filteredTasks = [...tasks, ...dirtyTasks.filter(dirtyTask => !dirtyTask.deleted)];
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
                            <InfiniteScroll
                                dataLength={filteredTasks.length}
                                next={fetchTasks}
                                hasMore={false}
                                loader={<h4>Loading...</h4>}>
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
                            </InfiniteScroll>
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
