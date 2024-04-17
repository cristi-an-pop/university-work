import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useListsStore } from '../stores/ListStore'
import { useAxiosStore } from '../stores/AxiosStore';
import io from 'socket.io-client';
import { useNotificationStore } from '../stores/NotificationStore';
import NotificationDisplay from './NotificationDisplay';

const ListsPage = () => {
  const [newListName, setNewListName] = useState('');
  const [selectedLists, setSelectedLists] = useState<number[]>([]);
  const { lists, setLists } = useListsStore(state => ({ lists: state.lists, setLists: state.setLists }));
  const [isLoading, setIsLoading] = useState(true);
  const socketInstance = useRef<WebSocket>();
  const { getAxiosInstance } = useAxiosStore(state => ({ getAxiosInstance: state.getAxiosInstance }));
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/lists');
        setLists(response.data);
      } catch (error) {
        console.error('Error:', error);
        addNotification('Error fetching lists', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLists();
  }, []);

  useEffect(() => {
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
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleNewListSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    const newList = {
        name: newListName,
        tasks: []
    };

    getAxiosInstance()
    .post('/lists', newList)
    .then((response) => {
      addNotification('List added succesfully', 'success');
      setLists([...lists, response.data]);
      setNewListName('');
    })
    .catch((error) => {
      console.error('Error on List Add:', error);
    });
};

  const handleListDelete = (id: number) => () => {
    getAxiosInstance()
    .delete(`/lists/${id}`)
    .then(() => {
      addNotification('List deleted successfully', 'success');
      setLists(lists.filter(list => list.id !== id));
    })
    .catch((error) => {
      console.error('Error on delete:', error);
    });
  };

  const handleListEdit = (id: number) => () => {
    const listName = prompt('Enter new list name');
    if (!listName?.trim()) return;
    const updatedList = { ...lists.find(list => list.id === id), name: listName };
    getAxiosInstance()
    .patch(`/lists/${id}`, updatedList)
    .then((response) => {
      addNotification('List updated successfully', 'success');
      setLists(lists.map(list => list.id === id ? response.data : list));
    })
    .catch((error) => {
      console.error('Error on update:', error);
    });
  };

  const handleExportList = (id: number) => () => {
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

  const handleListCheckboxChange = (id: number) => {
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
        <button className="cool-btn" type="button" onClick = {handleExportSelectedLists}>Export Selected</button>
        <div className="lists">
          <ul>
            {lists.map((list) => (
              <li key={list.id}>
                <div className="list-item-container">
                  <input 
                    type="checkbox" 
                    onChange={() => handleListCheckboxChange(list.id)}
                    />
                  <Link to={'/lists/' + list.id}>
                    {list.name}
                  </Link>
                  <button className="cool-btn" type="button" onClick={handleExportList(list.id)}>Export</button>
                  <button className="cool-btn" type="button" onClick={handleListDelete(list.id)}>Delete</button>
                  <button className="cool-btn" type="button" onClick={handleListEdit(list.id)}>Edit</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListsPage;
