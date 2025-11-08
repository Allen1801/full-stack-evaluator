import { useEffect, useState } from 'react';
import api from "./api/axios"

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    api.get('/tasks')
      .then(res => { 
        console.log(res.data);
        console.log("is Array:", Array.isArray(res.data));
        setTasks(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const addTask = async(e) => {
    e.preventDefault();
    if(!newTaskTitle.trim()) return;

    try {
      const res = await api.post('/tasks', { 
        title: newTaskTitle, 
        isDone: false,
        userID: 1
      });
      setTasks([...tasks, res.data]);
      setNewTaskTitle("");
    } catch (error) {
      
    }
  }

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={addTask}>
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
            {task.title} {task.isDone ? '✅' : '❌'}
          </li>
        ))
      )}
      
      </ul>
    </div>
  );
}

export default Tasks;
