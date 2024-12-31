import { useState, useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded shadow">
      <div>
        <label className="block text-sm font-bold mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-green-500 px-4 py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm; 
