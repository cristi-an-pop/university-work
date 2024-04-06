import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List } from '../types/ListType';
import axios from 'axios';
import { useListsStore } from '../Store';

const ListsPage = () => {
  const [newListName, setNewListName] = useState('');
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const { lists, setLists } = useListsStore(state => ({ lists: state.lists, setLists: state.setLists }));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/lists')
      .then(response => {
        setLists(response.data);
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

  const handleNewListSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    const newList: List = {
        id: Date.now().toString(),
        name: newListName,
        tasks: []
    };
  
    axios.post('http://localhost:5000/api/lists', newList, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      window.alert('List added successfully');
      setLists([...lists, response.data]);
      setNewListName('');
    })
    .catch((error) => {
      console.error('Error on List Add:', error);
    });
};

  const handleListDelete = (id: string) => () => {
    fetch(`http://localhost:5000/api/lists/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if(!response.ok) {
        window.alert('Error deleting list')
        throw new Error('Network response was not ok');
      }
      setLists(lists.filter(list => list.id !== id));
      window.alert('List deleted successfully');
    })
    .catch(error => console.error('Error on List Delete:', error));
  };

  const handleListEdit = (id: string) => () => {
    const listName = prompt('Enter new list name');
    if (!listName?.trim()) return;
    const updatedList = { ...lists.find(list => list.id === id), name: listName };
    fetch(`http://localhost:5000/api/lists/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedList),
    })
    .then(response => {
      if(!response.ok) {
        window.alert('Error updating list');
        throw new Error('Network response was not ok');
      }
      window.alert('List updated successfully');
      return response.json();
    })
    .then(updatedList => {
      setLists(lists.map(list => list.id === id ? updatedList : list));
    })
    .catch(error => console.error('Error on update:', error));
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

  return (
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
  );
};

export default ListsPage;
