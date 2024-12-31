import { useState, useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105"
    >
      {/* Title Field */}
      <div className="flex-grow">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full border border-gray-300 p-2 rounded text-sm mb-2 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        {/* Toggle and Description Field */}
        {showDescription ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description (optional)"
            className="w-full border border-gray-300 p-2 rounded text-sm mb-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowDescription(true)}
            className="text-sm text-blue-500 hover:underline"
          >
            Add a description
          </button>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="ml-4 px-4 py-2 text-sm text-white rounded bg-gradient-to-r from-green-400 to-green-600 shadow-md hover:from-green-500 hover:to-green-700"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
