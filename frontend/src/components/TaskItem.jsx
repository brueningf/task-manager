import { useContext, useState } from 'react';
import moment from 'moment';
import TaskContext from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    updateTask(task._id, { title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105">
      {isEditing ? (
        <div className="flex-1 flex flex-col gap-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border p-2 rounded text-lg font-bold w-full"
            placeholder="Edit title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="border p-2 rounded text-sm text-gray-500 w-full"
            placeholder="Edit description"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center gap-4">
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
                className="w-6 h-6 text-gray-500"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>

          <div>
            <h3 className={`font-bold text-lg text-gray-800 mb-1 ${task.completed ? 'line-through' : '' }`}>{task.title}</h3>
            {task.description && <p className="text-sm text-gray-500 mb-2">{task.description}</p>}
            <span className="text-xs text-gray-400">{moment(task.createdAt).format('MMM D, YYYY')}</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 w-6 h-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg p-1"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
        </button>

        <button
          onClick={() => deleteTask(task._id)}
          className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 w-6 h-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg p-1"
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
    </div>
  );
};

export default TaskItem;

