import { useEffect, useState } from 'react';
import api from "./api/axios"
import "./css/task.css"

import {fetchTasks, addTask, updateTask} from './functions/notefunctions';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const getId = JSON.parse(localStorage.getItem("user"));
      const id = getId.id;

      const data = await fetchTasks(id);
      console.log("Fetched tasks:", data, id);
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const getId = JSON.parse(localStorage.getItem("user"));
    const id = getId.id;

    const task = await addTask(newTaskTitle, id);
    setTasks(prev => [...prev, task]);
    setNewTaskTitle("");
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const handleUpdateTask = async (task) => {
    const updatedTask = {
      ...task,
      title: editingTitle,
    };
    const data = await updateTask(task.id, updatedTask);
    setTasks(tasks.map(t => t.id === task.id ? data : t));
    setEditingTaskId(null);
  };

  const toggleDone = async (task) => {
    const updatedTask = { ...task, isDone: !task.isDone };
    const data = await updateTask(task.id, updatedTask);
    setTasks(tasks.map(t => t.id === task.id ? data : t));
  };

  const handleDeleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div className='tasks-container'>
      <h2>Tasks</h2>
      <form onSubmit={handleAddTask}>
        <input type="text" 
          name="title" 
          placeholder="Task Title" 
          value={newTaskTitle} 
          onChange={(e) => setNewTaskTitle(e.target.value)}/>

        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.length === 0 ? (
          <li>No tasks available</li>
        ) : (
          tasks.map(task => (
            <li key={task.id}>
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <button onClick={() => handleUpdateTask(task)}>Save</button>
                  <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                </>
         ): (
          <>
            <span
            style={{ textDecoration: task.isDone ? 'line-through' : 'none', cursor: 'pointer' }}
            onClick={() => toggleDone(task)}
            >
            {task.title} {task.isDone ? '✅' : '❌'}
            </span>
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </>
        )}
            </li>
          ))
      )}
      </ul>
    </div>
  );
}

export default Tasks;
