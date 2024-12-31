import { useState, useEffect } from 'react';
import apiClient from './api';

import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskContext from './context/TaskContext';

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

