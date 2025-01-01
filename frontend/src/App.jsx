import { useState, useEffect } from 'react';
import apiClient from './api';

import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskContext from './context/TaskContext';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      } finally {
        setLoading(false); // Stop loading once fetching is done
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
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            Task Manager
          </h1>
          <p className="text-gray-500 text-sm mt-2">Organize your tasks efficiently</p>
        </header>

        <nav className="flex gap-4 justify-center">
          {['all', 'completed', 'pending'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 text-sm font-bold rounded shadow-md transition-all duration-200
                ${filter === status ?
                  'bg-gradient-to-r from-green-400 to-green-600 text-white' :
                  'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </nav>

        <main className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <svg
                className="animate-spin h-12 w-12 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          ) : (
            <>
              <TaskList filter={filter} />
              <TaskForm />
            </>
          )}
        </main>
      </div>
    </TaskContext.Provider>
  );
};

export default App;

