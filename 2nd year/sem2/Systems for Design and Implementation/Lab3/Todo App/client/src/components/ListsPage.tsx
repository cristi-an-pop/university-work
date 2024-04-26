import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useListsStore } from '../stores/ListStore'
import { useAxiosStore } from '../stores/AxiosStore';
import io from 'socket.io-client';
import { useNotificationStore } from '../stores/NotificationStore';
import NotificationDisplay from './NotificationDisplay';
import { List, DirtyList, ListCount } from '../types/ListType';
import { v4 as uuid } from 'uuid';
import InfiniteScroll from 'react-infinite-scroll-component';

const ListsPage = () => {
  const { lists, setLists } = useListsStore(state => ({ lists: state.lists, setLists: state.setLists }));
  const [newListName, setNewListName] = useState('');
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [listsCount, setListsCount] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const socketInstance = useRef<WebSocket>();
  const { getAxiosInstance } = useAxiosStore(state => ({ getAxiosInstance: state.getAxiosInstance }));
  const { addNotification } = useNotificationStore();
  const { dirtyLists, setDirtyLists } = useListsStore(state => ({ dirtyLists: state.dirtyLists, setDirtyLists: state.setDirtyLists }));
  const [isOnline, setIsOnline] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchLists = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/lists');
      setLists(response.data);
    } catch (error) {
      console.error('Error:', error);
      //addNotification('Error fetching lists', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/lists/ok?page=${page}&pageSize=100`);
      const newData = response.data;
      const uniqueData = newData.filter((newItem: any) => !data.some((item: any) => item.id === newItem.id));
      setData(data.concat(uniqueData));
      setPage(page + 1);
      const newLists = newData.map((list: any) => {
        return { id: list.id, name: list.name } as List;
      });
      const newListsCount = newData.map((list: any) => {
        return { list_id: list.id, count: list.tasks_count } as ListCount;
      })
      const uniqueLists = newLists.filter((newItem: List) => !lists.some((item: List) => item.id === newItem.id));
      const uniqueListsCount = newListsCount.filter((newItem: ListCount) => !listsCount.some((item: ListCount) => item.list_id === newItem.list_id));
      setLists([...lists, ...uniqueLists]);
      setListsCount([...listsCount, ...uniqueListsCount]);
    } catch (error) {
      console.error('Error:', error);
      //addNotification('Error fetching lists', 'error');
    } finally {
      setIsLoading(false);
    }
  }

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
    //fetchLists();
    if (isOnline) {
      fetchData();
    } else {
      setIsLoading(false);  
    }
  }, []);

  useEffect(() => {
    if(isOnline) {
      const socket = io('http://localhost:5000');
      socket.on('newList', (newList) => {
        axios.post('http://localhost:5000/api/lists', newList, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        addNotification('List added succesfully', 'success');
        setLists([...lists, response.data]);
        if(socketInstance.current) {
          socketInstance.current.send(JSON.stringify(response.data));
        }
        setNewListName('');
      })
      .catch((error) => {
        console.error('Error on List Add:', error);
      });
      });
  
      return () => {
        socket.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (isOnline) {
      dirtyLists.forEach(dirtyList => {
        if(dirtyList.existed == false && dirtyList.deleted == false) { 
          getAxiosInstance()
          .post('/lists', dirtyList)
          .then((response) => {
            setLists([...lists, response.data]);
          })
          .catch((error) => {
            console.log('Error adding unsynced list:', error)
          });
        } else if(dirtyList.existed == true && dirtyList.deleted == true) {
          getAxiosInstance()
          .delete(`/lists/${dirtyList.id}`)
          .then(() => {
            setLists(lists.filter(list => list.id !== dirtyList.id));
          })
          .catch((error) => {
            console.log('Error deleting unsynced list:', error)
          });
        } else if(dirtyList.existed == true && dirtyList.deleted == false) {  
          getAxiosInstance()
          .patch(`/lists/${dirtyList.id}`, dirtyList)
          .then((response) => {
            setLists(lists.map(list => list.id === dirtyList.id ? response.data : list));
          })
          .catch((error) => {
            console.log('Error updating unsynced list:', error)
          });
        }
      });
      setDirtyLists([]);
    }
  }, [isOnline])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleNewListSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    const newList: List = {
        id: uuid(),
        name: newListName,
    };

    getAxiosInstance()
    .post('/lists', newList)
    .then((response) => {
      setLists([...lists, response.data]);
      addNotification('List added succesfully', 'success');
    })
    .catch((error) => {
      if(error.code === "ERR_NETWORK") {
        setDirtyLists([...dirtyLists, { id: newList.id, name: newList.name, existed: false, deleted: false }]);
        addNotification('List added unsynced', 'warning');
      }
      else {
        addNotification('Error adding list', 'error');
      }
    });
    setNewListName('');
};

  const handleListDelete = (id: string) => () => {
    getAxiosInstance()
    .delete(`/lists/${id}`)
    .then(() => {
      setLists(lists.filter(list => list.id !== id));
      addNotification('List deleted successfully', 'success');
    })
    .catch((error) => {
      if(error.code === "ERR_NETWORK") {
        const listToDelete = lists.find(list => list.id === id);
        if (listToDelete) {
          setLists(lists.filter(list => list.id !== id));
          setDirtyLists([...dirtyLists, { id: listToDelete.id, name: listToDelete.name, existed: true, deleted: true }])
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
    });
  };

  const handleListEdit = (id: string) => () => {
    const listName = prompt('Enter new list name');
    if (!listName?.trim()) return;
    const updatedList = { ...lists.find(list => list.id === id), name: listName };
    
    getAxiosInstance()
    .patch(`/lists/${id}`, updatedList)
    .then((response) => {
      setLists(lists.map(list => list.id === id ? response.data : list));
      addNotification('List updated successfully', 'success');
    })
    .catch((error) => {
      if(error.code === "ERR_NETWORK") {
        setLists(lists.filter(list => list.id !== id));
        setDirtyLists([...dirtyLists, { id: updatedList.id!, name: updatedList.name, existed: true, deleted: false }]);
        addNotification('List updated unsynced', 'warning');
      }
      else {
        addNotification('Error updating list', 'error');
      }
    });
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

  return (
    <>
      <NotificationDisplay />
      <div className="lists-container">
        <h1>Todo Lists</h1>
        <form className="list-form" onSubmit={handleNewListSubmit}>
          <input
            className="form-input"
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Enter list name"
          />
          <button type="submit">Add List</button>
        </form>
        <button className="cool-btn" type="button" onClick={handleExportSelectedLists}>Export Selected</button>
        <div className="lists">
          <ul>
            <InfiniteScroll
              dataLength={data.length}
              next={fetchData}
              hasMore={true}
              loader={<h4>Loading...</h4>}>
              {displayLists.map((list) => (
                <li key={list.id}>
                  <div className="list-item-container">
                    <input 
                      type="checkbox" 
                      onChange={() => handleListCheckboxChange(list.id)}
                    />
                    <Link to={'/lists/' + list.id}>
                      {list.name}
                    </Link>
                    <p>Tasks: {listsCount.find((counter: { list_id: string, count: number; }) => counter.list_id === list.id)?.count}</p>
                    <button className="cool-btn" type="button" onClick={handleExportList(list.id)}>Export</button>
                    <button className="cool-btn" type="button" onClick={handleListDelete(list.id)}>Delete</button>
                    <button className="cool-btn" type="button" disabled={dirtyLists.some(dirtyList => dirtyList.id === list.id)} onClick={handleListEdit(list.id)}>Edit</button>
                  </div>
                </li>
              ))}
            </InfiniteScroll>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListsPage;
