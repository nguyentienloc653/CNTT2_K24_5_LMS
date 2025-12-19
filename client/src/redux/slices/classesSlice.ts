import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Class, ClassForm } from "../types/class";
import { classApi } from "../api/managerClassApi";

// --- ASYNC ACTION ---
export const fetchClasses = createAsyncThunk<Class[]>(
  "classes/getAll",
  async () => {
    const res = await classApi.getAll();
    return res.data;
  }
);

export const addClass = createAsyncThunk<Class, ClassForm>(
  "classes/add",
  async (data: ClassForm) => {
    const res = await classApi.create(data);
    return res.data;
  }
);

export const updateClass = createAsyncThunk<Class, { id: number, data: ClassForm}>(
  "classes/update",
  async ({ id, data }) => {
    const res = await classApi.update(id, data);
    return res.data;
  }
);

export const deleteClass = createAsyncThunk<number, number>(
  "classes/delete",
  async (id) => {
    await classApi.delete(id);
    return id;
  }
);

// --- SLICE ---
const classSlice = createSlice({
  name: "classes",
  initialState: {
    list: [] as Class[],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.list = state.list.filter(s => s.id !== action.payload);
      });
  }
});

export default classSlice.reducer;
