import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    lists: List[],
    setLists: React.Dispatch<React.SetStateAction<any[]>>,
    setSelectedListId: React.Dispatch<React.SetStateAction<string | null>>
}

interface List {
    id: string,
    name: string,
    tasks: any[]
}

const ListsPage = ({ lists, setLists, setSelectedListId }: Props) => {
  const [newListName, setNewListName] = useState('');
  const [selectedLists, setSelectedLists] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  const handleNewListSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    const newList: List = {
        id: Date.now().toString(),
        name: newListName,
        tasks: []
    };
    setLists([...lists, newList]);
    setNewListName('');
  };

  const handleListDelete = (id: string) => () => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
  };

  const handleListEdit = (id: string) => () => {
    const listName = prompt('Enter new list name');
    if (!listName?.trim()) return;
    const updatedLists = lists.map((list) => {
      if (list.id === id) {
        list.name = listName;
      }
      return list;
    });
    setLists(updatedLists);
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
                <Link to={'/lists/' + list.id} onClick={() => setSelectedListId(list.id)}>
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
