import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskList = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded shadow">
      <div>
        <h3 className="font-bold text-lg">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.createdAt}</p>
        <p
          className={`text-sm font-bold ${
            task.completed ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => updateTask(task._id, { completed: !task.completed })}
          className="text-white bg-blue-500 px-2 py-1 rounded"
        >
          Toggle Status
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className="text-white bg-red-500 px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskList;
