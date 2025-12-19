import axios from "axios";
import type { TeacherForm } from "../types/teacher";

const API_URL = "http://localhost:3001/teachers";

export const teacherApi = {
  getAll: () => axios.get(API_URL),
  getById: (id: number) => axios.get(`${API_URL}/${id}`),
  create: (data: TeacherForm) => axios.post(API_URL, data),
  update: (id: number, data: TeacherForm) => axios.put(`${API_URL}/${id}`, data),
  delete: (id: number) => axios.delete(`${API_URL}/${id}`),
};
