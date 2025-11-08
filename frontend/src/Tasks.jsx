import { useEffect, useState } from 'react';
import api from "./api/axios"

import {fetchTasks, addTask, updateTask} from './functions/notefunctions';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task = await addTask(newTaskTitle);
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

  return (
    <div>
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
