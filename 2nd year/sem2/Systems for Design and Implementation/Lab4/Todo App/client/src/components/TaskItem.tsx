const TaskItem = ({ task, onCheckboxChange, onDelete }: { task: any, onCheckboxChange: any, onDelete: any }) => {
  return (
    <li key={task.id}>
      <div className="task-item-container">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onCheckboxChange(task.id)}
        />
        <span>{task.name}</span>
        <span>{task.dateTime}</span>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
