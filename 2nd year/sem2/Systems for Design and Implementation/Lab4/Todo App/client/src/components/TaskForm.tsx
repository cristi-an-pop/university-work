// TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onSubmit }: { onSubmit: (newTaskName: string, newTaskDateTime: string) => void }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDateTime, setNewTaskDateTime] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskName.trim() || !newTaskDateTime.trim()) return;

    onSubmit(newTaskName, newTaskDateTime);
    setNewTaskName('');
    setNewTaskDateTime('');
  };

  return (
    <form className="task-form" onSubmit={handleFormSubmit}>
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
  );
};

export default TaskForm;
