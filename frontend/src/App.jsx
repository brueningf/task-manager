import { useState, useEffect, useContext, createContext } from 'react';
import apiClient from './api';

const TaskContext = createContext(null);

export const useTaskContext = () => useContext(TaskContext);

// Components
const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();

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

const TaskList = () => {
  const { tasks, filter } = useTaskContext();
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

const TaskForm = () => {
  const { addTask } = useTaskContext();
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

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await apiClient.post('/tasks', task);
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const response = await apiClient.put(`/tasks/${id}`, updates);
      setTasks((prev) => prev.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await apiClient.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const value = {
    tasks,
    filter,
    setFilter,
    addTask,
    updateTask,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={value}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold">Task Manager</h1>
        </header>

        <nav className="flex gap-4 justify-center">
          <button
            onClick={() => setFilter('all')}
            className="px-4 py-2 text-sm font-bold bg-gray-200 rounded"
          >
            All
          </button>
          <button
            onClick={() => setFilter('completed')}
            className="px-4 py-2 text-sm font-bold bg-gray-200 rounded"
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('pending')}
            className="px-4 py-2 text-sm font-bold bg-gray-200 rounded"
          >
            Pending
          </button>
        </nav>

        <main className="space-y-6">
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </TaskContext.Provider>
  );
};

export default App;

