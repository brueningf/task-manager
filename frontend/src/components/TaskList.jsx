import { useContext } from 'react';
import TaskItem from './TaskItem';
import TaskContext from '../context/TaskContext';

const TaskList = () => {
  const { tasks, filter } = useContext(TaskContext);
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
