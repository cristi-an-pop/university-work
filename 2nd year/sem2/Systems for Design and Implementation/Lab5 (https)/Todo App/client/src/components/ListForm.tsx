import React, { useState } from 'react';

const ListFrom = ({ onSubmit }: { onSubmit: (newListName: string) => void }) => {
    const [newListName, setNewListName] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!newListName.trim()) return;
        onSubmit(newListName);
        setNewListName('');
    }

    return (
        <form className="list-form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Enter list name"
          />
          <button type="submit">Add List</button>
        </form>
    )
}

export default ListFrom;