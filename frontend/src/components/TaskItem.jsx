import { useContext } from 'react';
import moment from 'moment';
import TaskContext from '../context/TaskContext';

const TaskList = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105">
      <div className="flex items-center gap-4">
        <button
          onClick={() => updateTask(task._id, { completed: !task.completed })}
          className="flex items-center justify-center w-8 h-8 text-white bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-200"
        >
          {task.completed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>

        <div>
          <h3 className="font-bold text-lg text-gray-800 mb-1">{task.title}</h3>
          {task.description && (<p className="text-sm text-gray-500 mb-2">{task.description}</p>)}
          <span className="text-xs text-gray-400">{moment(task.createdAt).format('MMM D, YYYY')}</span>
        </div>
      </div>

      <button
        onClick={() => deleteTask(task._id)}
        className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 w-6 h-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default TaskList;

