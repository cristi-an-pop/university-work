import { useState } from 'react';
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

  return (
    <div className="lists-container">
      <h1>Todo Lists</h1>
      <form onSubmit={handleNewListSubmit}>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Enter list name"
        />
        <button type="submit">Add List</button>
      </form>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <div className="list-item-container">
              <Link to={'/lists/' + list.id} onClick={() => setSelectedListId(list.id)}>
                {list.name}
              </Link>
              <button type="button" onClick={handleListDelete(list.id)}>Delete</button>
              <button type="button" onClick={handleListEdit(list.id)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListsPage;
