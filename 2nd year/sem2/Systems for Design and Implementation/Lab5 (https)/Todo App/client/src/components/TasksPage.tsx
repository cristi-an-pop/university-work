import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List } from '../types/ListType';
import { useAxiosStore } from '../stores/AxiosStore';
import NotificationDisplay from './NotificationDisplay';
import { useNotificationStore } from '../stores/NotificationStore';
import { useTasksStore } from '../stores/TaskStore';
import { v4 as uuid } from 'uuid';
import { useListsStore } from '../stores/ListStore';
import TaskForm from './TaskForm';
import TasksDisplay from './TasksDisplay';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import RequireRole from './RequireRole';

function TasksPage() {
    const { listId } = useParams();
    const { isOnline } = useAxiosStore();
    const [isLoading, setIsLoading] = useState(true);
    const [filterDateTime, setFilterDateTime] = useState('');
    const [filterCompleted, setFilterCompleted] = useState(false);
    const [selectedList, setSelectedList] = useState<List | null>(null);
    const { addNotification } = useNotificationStore();
    const { tasks, setTasks } = useTasksStore(state => ({ tasks: state.tasks, setTasks: state.setTasks }));
    const { dirtyTasks, setDirtyTasks } = useTasksStore(state => ({ dirtyTasks: state.dirtyTasks, setDirtyTasks: state.setDirtyTasks }));
    const { lists } = useListsStore();
    const [page, setPage] = useState(1);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        console.log(listId);
        setSelectedList(lists.find(list => list.id === listId) ?? null);
    }, [lists, listId]);

    useEffect(() => {
        if (selectedList) {
            fetchTasks();
        }
    }, [selectedList, setTasks]);

    useEffect(() => {
        if (isOnline) {
            dirtyTasks.forEach(async (dirtyTask) => {
                try {
                    if(dirtyTask.existed == false && dirtyTask.deleted == false) {
                        const response = await axiosPrivate.post(`/lists/${listId}/tasks`, dirtyTask);
                        const updatedTasks = [ ...tasks, response.data ];
                        setTasks(updatedTasks);
                        addNotification('Task added successfully', 'success');
                    } else if(dirtyTask.existed == true && dirtyTask.deleted == false) {
                        const response = await axiosPrivate.patch(`/lists/${listId}/tasks/${dirtyTask.id}`, dirtyTask);
                        const updatedTasks = tasks.map(task => task.id === dirtyTask.id ? response.data : task);
                        setTasks(updatedTasks);
                        addNotification('Task updated successfully', 'success');
                    } else if(dirtyTask.existed == true && dirtyTask.deleted == true) {
                        await axiosPrivate.delete(`/lists/${listId}/tasks/${dirtyTask.id}`);
                        const updatedTasks = tasks.filter(task => task.id !== dirtyTask.id);
                        setTasks(updatedTasks);
                        addNotification('Task deleted successfully', 'success');
                    }
                } catch (error) {
                    console.error('Error syncing dirty tasks:', error);
                    addNotification('Error syncing dirty tasks', 'error');
                }
            });
            setDirtyTasks([]);
        }
      }, [isOnline])

    const fetchTasks = async () => {
        try {
            console.log('fetching tasks')
            const response = await axiosPrivate.get(`/lists/${listId}/tasks?page=${page}`);
            console.log(response.data);
            setTasks(response.data);
            setPage(page + 1);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleNewTaskSubmit = async (newTaskName: string, newTaskDateTime: string) => {
        const newTask = {
            id: uuid(),
            name: newTaskName,
            completed: false,
            dateTime: newTaskDateTime,
        };

        try {
            const response = await axiosPrivate.post(`/lists/${listId}/tasks`, newTask);
            const updatedTasks = [ ...tasks, response.data ];
            setTasks(updatedTasks);
            addNotification('Task added successfully', 'success');
        } catch (error: any) {
            if(error.code === "ERR_NETWORK") {
                setDirtyTasks([...dirtyTasks, { id: newTask.id, name: newTask.name, completed: newTask.completed, dateTime: newTask.dateTime, list_id: String(listId), existed: false, deleted: false }]);
                addNotification('Task added successfully', 'warning');
            } else {
                addNotification('Error adding task', 'error');
            }
        }
    };

    const handleTaskCheckboxChange = async (taskId: string) => {
        const newTasks = [ ...tasks ];
        console.log(newTasks);
        const task = newTasks.find(task => task.id === taskId);
        if (!task) return;
        task.completed = !task.completed;

        try {
            const response = await axiosPrivate.patch(`/lists/${listId}/tasks/${taskId}`, task);
            setTasks([...tasks.map(task => task.id === taskId ? response.data : task)]);
            addNotification('Task updated successfully', 'success');
        } catch (error: any) {
            if(error.code === "ERR_NETWORK") {
                setTasks(tasks.filter(task => task.id !== taskId));
                setDirtyTasks([...dirtyTasks, { id: taskId, name: task.name, completed: task.completed, dateTime: task.dateTime, list_id: String(listId), existed: true, deleted: false }]);
                addNotification('Task updated successfully', 'warning');
            } else {
                addNotification('Error updating task', 'error');
            }
        }
    };

    const handleDeleteTask = (taskId: string) => {
        try {
            axiosPrivate.delete(`/lists/${listId}/tasks/${taskId}`);
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
            addNotification('Task deleted successfully', 'success');
        } catch (error: any) {
            if(error.code === "ERR_NETWORK") {
                const taskToDelete = tasks.find(task => task.id === taskId);
                if (taskToDelete) {
                    setTasks(tasks.filter(task => task.id !== taskId));
                    setDirtyTasks([...dirtyTasks, { id: taskToDelete.id, name: taskToDelete.name, completed: taskToDelete.completed, dateTime: taskToDelete.dateTime, list_id: String(listId), existed: true, deleted: true }]);
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
        }
    };

    const handleDeleteCompletedTasks = () => {
        const tasksCopy = [...tasks];
        const completedTasks = tasksCopy.filter(task => task.completed);
        const completedTaskIds = completedTasks.map(task => task.id);
    
        Promise.all(completedTaskIds.map(taskId => 
            axiosPrivate.delete(`/lists/${listId}/tasks/${taskId}`)
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!selectedList) return <div>Selected list not found</div>;

    return (
        <>
            <NotificationDisplay />
            <div className="tasks-container">
                <h2>{selectedList.name}</h2>
                <RequireRole role={2022}>
                    <TaskForm onSubmit={handleNewTaskSubmit} />
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
                </RequireRole>
                <div className="tasks-list-container">
                    <p className="p-style">Tasks remaining: {remainingTasksCount}</p>
                    <TasksDisplay tasks={filteredTasks} onCheckboxChange={handleTaskCheckboxChange} onDelete={handleDeleteTask} fetchTasks={fetchTasks} />
                    <button type="button" onClick={handleDeleteCompletedTasks}>
                        Delete Completed Tasks
                    </button>
                </div>
            </div>
        </>
    );
}

export default TasksPage;
