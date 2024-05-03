import TaskItem from './TaskItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Task } from '../types/TaskType';

const TasksDisplay = ({ tasks, onCheckboxChange, onDelete, fetchTasks }: { 
    tasks: Task[], 
    onCheckboxChange: (id: string) => void, 
    onDelete: (id: string) => void, 
    fetchTasks: () => void 
}) => {
  return (
    <div className="lists">
      <InfiniteScroll
        dataLength={tasks.length}
        next={fetchTasks}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onCheckboxChange={onCheckboxChange}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default TasksDisplay;
