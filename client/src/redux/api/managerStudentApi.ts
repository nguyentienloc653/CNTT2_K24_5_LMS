import axios from "axios";
import type { StudentForm } from "../types/student";

const API_URL = "http://localhost:3001/students";

export const studentApi = {
  getAll: () => axios.get(API_URL),
  getById: (id: number) => axios.get(`${API_URL}/${id}`),
  create: (data: StudentForm) => axios.post(API_URL, data),
  update: (id: number, data: StudentForm) =>
    axios.patch(`${API_URL}/${id}`, data),
  delete: (id: number) => axios.delete(`${API_URL}/${id}`),
};
