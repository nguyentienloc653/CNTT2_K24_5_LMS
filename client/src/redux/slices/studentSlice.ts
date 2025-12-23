import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { studentApi } from "../api/managerStudentApi";
import type { Student, StudentForm } from "../types/student";

const API_BASE = "http://localhost:3001";

type Subject = { id: string | number; name: string };
type StudentScoreForm = {
  studentId: number;
  subjectId: number;
  hk1: number;
  hk2: number;
  project: number;
};

const DEFAULT_RATES = { attendance: 0, homework: 0, preparation: 0 };

const toNum = (v: unknown) => {
  const n = typeof v === "string" ? Number(v) : (v as number);
  return Number.isFinite(n) ? n : 0;
};

export const fetchStudents = createAsyncThunk<Student[]>("students/getAll", async () => {
  const res = await studentApi.getAll();
  return res.data;
});

export const addStudent = createAsyncThunk<Student, StudentForm>(
  "students/add",
  async (data: StudentForm) => {
    const payload = {
      ...data,
      rates: DEFAULT_RATES,
    };

    const created = await studentApi.create(payload);
    const newStudent = created.data as Student;

    const subRes = await fetch(`${API_BASE}/subjects`);
    if (!subRes.ok) throw new Error(`Fetch subjects failed: ${subRes.status}`);
    const subjects = (await subRes.json()) as Subject[];

    const studentId = toNum((newStudent as any).id);

    await Promise.all(
      subjects.map((s) => {
        const body: StudentScoreForm = {
          studentId,
          subjectId: toNum(s.id),
          hk1: 0,
          hk2: 0,
          project: 0,
        };

        return fetch(`${API_BASE}/studentScores`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then((r) => {
          if (!r.ok) throw new Error(`Create studentScores failed: ${r.status}`);
        });
      })
    );

    return newStudent;
  }
);

export const updateStudent = createAsyncThunk<Student, { id: number; data: StudentForm }>(
  "students/update",
  async ({ id, data }) => {
    const res = await studentApi.update(id, data);
    return res.data;
  }
);

export const deleteStudent = createAsyncThunk<number, number>("students/delete", async (id) => {
  await studentApi.delete(id);
  return id;
});

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
        const index = state.list.findIndex((s) => (s as any).id === (action.payload as any).id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => (s as any).id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
