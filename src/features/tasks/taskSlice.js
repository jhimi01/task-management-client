import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

// API Base URL (adjust as needed)
const API_BASE_URL = "http://localhost:5001/auth";

// Fetch logged-in user's tasks
export const fetchMyTasks = createAsyncThunk(
  "tasks/fetchMy",
  async (_, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("Token");  // Retrieve token here to ensure it's fresh

    if (!token) {
      return thunkAPI.rejectWithValue("Token is missing");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch tasks");
      return data.tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Fetch a single task
export const singleTask = createAsyncThunk(
  "tasks/singleTask",
  async ({ id }, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("Token");
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to get task");
      return data.task;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add a new task
export const addTask = createAsyncThunk(
  "tasks/add",
  async (taskData, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("Token");
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add task");
      return data.task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update a task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async (taskData, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("Token");
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update task");
      return data.task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("Token");
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete task");
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tasks: [], // Store all tasks in an array
  task: null, // Store a single task (used for viewing/editing a single task)
  isLoading: false, // Loading state for async actions
  error: null, // Error state for async actions
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch my tasks
      .addCase(fetchMyTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchMyTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add task
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })

      // Fetch a single task
      .addCase(singleTask.fulfilled, (state, action) => {
        state.task = action.payload;
      });
  },
});

export default taskSlice.reducer;
