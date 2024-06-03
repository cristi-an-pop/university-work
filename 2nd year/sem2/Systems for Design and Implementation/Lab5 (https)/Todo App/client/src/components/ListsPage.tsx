import { useEffect, useState } from 'react';
import ListForm from './ListForm';
import ListsDisplay from './ListsDisplay';
import { useListsStore } from '../stores/ListStore'
import { useAxiosStore } from '../stores/AxiosStore';
import { useNotificationStore } from '../stores/NotificationStore';
import NotificationDisplay from './NotificationDisplay';
import { List, DirtyList } from '../types/ListType';
import { v4 as uuid } from 'uuid';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import RequireRole from './RequireRole';

const ROLES = {
  'User': 1011,
  'Manager': 2022,
  'Admin': 3033
}

const ListsPage = () => {
  const { lists, setLists } = useListsStore(state => ({ lists: state.lists, setLists: state.setLists }));
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addNotification } = useNotificationStore();
  const { dirtyLists, setDirtyLists } = useListsStore(state => ({ dirtyLists: state.dirtyLists, setDirtyLists: state.setDirtyLists }));
  const { isOnline } = useAxiosStore();
  const [page, setPage] = useState(1);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLists([]);
    setPage(1);

    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isOnline) {
      dirtyLists.forEach(async (dirtyList) => {
        try {
          if (dirtyList.existed == false && dirtyList.deleted == false) {
            const response = await axiosPrivate.post('/lists', dirtyList);
            const newList = response.data;
            setDirtyLists(dirtyLists.filter(dirtyList => dirtyList.id !== newList.id));
            setLists([...lists, newList]);
          } else if (dirtyList.existed == true && dirtyList.deleted == true) {
            await axiosPrivate.delete(`/lists/${dirtyList.id}`);
            setDirtyLists(dirtyLists.filter(dirtyList => dirtyList.id !== dirtyList.id));
            setLists(lists.filter(list => list.id !== dirtyList.id));
          } else if (dirtyList.existed == true && dirtyList.deleted == false) {
            const response = await axiosPrivate.patch(`/lists/${dirtyList.id}`, dirtyList);
            const updatedList = response.data;
            setDirtyLists(dirtyLists.filter(dirtyList => dirtyList.id !== updatedList.id));
            setLists(lists.map(list => list.id === dirtyList.id ? updatedList : list));
          }
        } catch (error) {
          console.error('Error syncing dirty lists:', error);
          addNotification('Error syncing dirty lists', 'error');
        }
      });
      setDirtyLists([]);
    }
  }, [isOnline]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get(`/lists?page=${page}&pageSize=50`);
      const data = response.data;
      const newData = data.filter((data: List) => !lists.some((list) => list.id === data.id));
      setLists([...lists, ...newData]);
      setPage(page + 1);
    } catch(error) {
      console.log('Error fetching lists:', error);
      if((error as any).status === 403) {
        navigate('/login', { state: { from: location }, replace: true });
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleNewListSubmit = async (newListName: string) => {
    if (!newListName.trim()) return;
    const newList: List = {
        id: uuid(),
        name: newListName,
        taskCount: 0
    };

    try {
      const response = await axiosPrivate.post('/lists', newList);
      const list = response.data;
      setLists([...lists, list]);
      addNotification('List added succesfully', 'success');
    } catch (error: any) {
      if(error.code === "ERR_NETWORK") {
        setDirtyLists([...dirtyLists, { id: newList.id, name: newList.name, taskCount: 0, existed: false, deleted: false }]);
        addNotification('List added unsynced', 'warning');
      }
      else {
        addNotification('Error adding list', 'error');
      }
    }
  };

  const handleListDelete = async (id: string) => {
    try {
      await axiosPrivate.delete(`/lists/${id}`);
      setLists(lists.filter(list => list.id !== id));
      addNotification('List deleted successfully', 'success');
    } catch (error: any) {
      if(error.code === "ERR_NETWORK") {
        const listToDelete = lists.find(list => list.id === id);
        if (listToDelete) {
          setLists(lists.filter(list => list.id !== id));
          setDirtyLists([...dirtyLists, { id: listToDelete.id, name: listToDelete.name, taskCount: listToDelete.taskCount, existed: true, deleted: true }])
          addNotification('List deleted unsynced', 'warning');
        }
        else {
          const listToDelete = dirtyLists.find(dirtyList => dirtyList.id === id);
          if (listToDelete) {
            setDirtyLists(dirtyLists.map(dirtyList => dirtyList.id === id ? { ...dirtyList, existed: true, deleted: true } : dirtyList));
            addNotification('List deleted unsynced', 'warning');
          }
        }
      }
      else {
        addNotification('Error deleting list', 'error');
      }
    }
  };

  const handleListEdit = async (id: string) => {
    const listName = prompt('Enter new list name');
    if (!listName?.trim()) return;
    const updatedList: List = { 
      ...(lists.find(list => list.id === id) || {}),
      id,
      name: listName,
      taskCount: lists.find(list => list.id === id)?.taskCount ?? 0
    };
    try {
      const response = await axiosPrivate.patch(`/lists/${id}`, updatedList);
      const editedList = response.data;
      setLists(lists.map(list => list.id === id ? editedList : list));
      addNotification('List updated successfully', 'success');
    } catch (error: any) {
      if(error.code === "ERR_NETWORK") {
        setLists(lists.filter(list => list.id !== id));
        setDirtyLists([...dirtyLists, { id: updatedList.id!, name: updatedList.name, taskCount: updatedList.taskCount ?? 0, existed: true, deleted: false }]);
        addNotification('List updated unsynced', 'warning');
      }
      else {
        addNotification('Error updating list', 'error');
      }
    }
  };

  const handleExportList = (id: string) => () => {
    const list = lists.find((list) => list.id === id);
    if (!list) return;
    const data = JSON.stringify(list);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = list.name + '.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  const handleListCheckboxChange = (id: string) => {
    if (selectedLists.includes(id)) {
      setSelectedLists(selectedLists.filter((listId) => listId !== id));
    } else {
      setSelectedLists([...selectedLists, id]);
    }
  }

  const handleExportSelectedLists = () => {
    const selectedListsData = lists.filter((list) => selectedLists.includes(list.id));
    const data = JSON.stringify(selectedListsData);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-lists.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  const displayLists: List[] | DirtyList[] = [...lists, ...dirtyLists.filter(dirtyLists => !dirtyLists.deleted)];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NotificationDisplay />
      <div className="lists-container">
        <h1>Todo Lists</h1>
        <RequireRole role={2022}>
          <ListForm onSubmit={handleNewListSubmit} />
        </RequireRole>
        <button className="cool-btn" type="button" onClick={handleExportSelectedLists}>Export Selected</button>
        <ListsDisplay 
          lists={displayLists}
          onCheckboxChange={handleListCheckboxChange}
          onExport={handleExportList}
          onDelete={handleListDelete}
          onEdit={handleListEdit}
          fetchData={fetchData}
        />
      </div>
    </>
  );
};

export default ListsPage;
