import api from "../api/axios";

// fetch tasks for a specific user by their ID
export const fetchTasks = async (id) => {
  try {
    const response = await api.get(`/tasks/user/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

// add a new task for a specific user by their ID
export const addTask = async(title, id) => {
    console.log("Adding task for user id:", id);
    try {
        const res = await api.post('/tasks', { 
        title: title, 
        isDone: false,
        userId: id,
        });
        console.log("Added task:", res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

// update an existing task by its ID 
export const updateTask = async (id, updatedTask) => {
  const response = await api.put(`/tasks/${id}`, updatedTask);
  return response.data;
};

// delete a task by its ID
export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
};