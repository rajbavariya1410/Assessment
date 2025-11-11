import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/registrations";


// Async thunks
export const fetchRegistrations = createAsyncThunk(
  "registrations/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addRegistration = createAsyncThunk(
  "registrations/add",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateRegistration = createAsyncThunk(
  "registrations/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteRegistration = createAsyncThunk(
  "registrations/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const registrationsSlice = createSlice({
  name: "registrations",
  initialState,
  reducers: {
    // local UI-only reducer examples (optional)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrations.pending, (s) => { s.status = "loading"; })
      .addCase(fetchRegistrations.fulfilled, (s, a) => { s.status = "succeeded"; s.items = a.payload; })
      .addCase(fetchRegistrations.rejected, (s, a) => { s.status = "failed"; s.error = a.payload; })

      .addCase(addRegistration.fulfilled, (s, a) => { s.items.unshift(a.payload); })

      .addCase(updateRegistration.fulfilled, (s, a) => {
        s.items = s.items.map(item => item.id === a.payload.id ? a.payload : item);
      })

      .addCase(deleteRegistration.fulfilled, (s, a) => {
        s.items = s.items.filter(i => i.id !== a.payload);
      });
  },
});

export default registrationsSlice.reducer;
