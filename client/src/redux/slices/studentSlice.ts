import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { studentApi } from "../api/managerStudentApi";
import type { Student, StudentForm } from "../types/student";

// --- ASYNC ACTION ---
export const fetchStudents = createAsyncThunk<Student[]>(
  "students/getAll",
  async () => {
    const res = await studentApi.getAll();
    return res.data;
  }
);

export const addStudent = createAsyncThunk<Student, StudentForm>(
  "students/add",
  async (data: StudentForm) => {
    const res = await studentApi.create(data);
    return res.data;
  }
);

export const updateStudent = createAsyncThunk<
  Student,
  { id: number; data: StudentForm }
>("students/update", async ({ id, data }) => {
  const res = await studentApi.update(id, data);
  return res.data;
});

export const deleteStudent = createAsyncThunk<number, number>(
  "students/delete",
  async (id) => {
    await studentApi.delete(id);
    return id;
  }
);

// --- SLICE ---
const studentSlice = createSlice({
  name: "students",
  initialState: {
    list: [] as Student[],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
