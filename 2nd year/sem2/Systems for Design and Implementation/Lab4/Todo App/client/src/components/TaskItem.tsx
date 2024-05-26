import RequireRole from "./RequireRole";

const TaskItem = ({ task, onCheckboxChange, onDelete }: { task: any, onCheckboxChange: any, onDelete: any }) => {
  return (
    <li key={task.id}>
      <div className="task-item-container">
        <RequireRole role={2022}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onCheckboxChange(task.id)}
          />
        </RequireRole>
        <span>{task.name}</span>
        <span>{task.dateTime}</span>
        <RequireRole role={2022}>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </RequireRole>
      </div>
    </li>
  );
};

export default TaskItem;
