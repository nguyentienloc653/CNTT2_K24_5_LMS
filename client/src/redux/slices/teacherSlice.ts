import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Teacher, TeacherForm } from "../types/teacher";
import { teacherApi } from "../api/managerTeacherApi";

// --- ASYNC ACTION ---
export const fetchTeachers = createAsyncThunk<Teacher[]>(
  "teachers/getAll",
  async () => {
    const res = await teacherApi.getAll();
    return res.data;
  }
);

export const addTeacher = createAsyncThunk<Teacher, TeacherForm>(
  "teachers/add",
  async (data: TeacherForm) => {
    const res = await teacherApi.create(data);
    return res.data;
  }
);

export const updateTeacher = createAsyncThunk<Teacher, { id: number, data: TeacherForm}>(
  "teachers/update",
  async ({ id, data }) => {
    const res = await teacherApi.update(id, data);
    return res.data;
  }
);

export const deleteTeacher = createAsyncThunk<number, number>(
  "teachers/delete",
  async (id) => {
    await teacherApi.delete(id);
    return id;
  }
);

// --- SLICE ---
const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    list: [] as Teacher[],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.list = state.list.filter(s => s.id !== action.payload);
      });
  }
});

export default teacherSlice.reducer;
