import api from "../api/axios";

export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export const addTask = async(title) => {
    try {
        const res = await api.post('/tasks', { 
        Title: title, 
        IsDone: false,
        UserId: 1,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateTask = async (id, updatedTask) => {
  const response = await api.put(`/tasks/${id}`, updatedTask);
  return response.data;
};