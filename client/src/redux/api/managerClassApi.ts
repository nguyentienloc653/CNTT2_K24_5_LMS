import axios from "axios";
import type { ClassForm } from "../types/class";

const API_URL = "http://localhost:3001/classes";

export const classApi = {
  getAll: () => axios.get(API_URL),
  getById: (id: number) => axios.get(`${API_URL}/${id}`),
  create: (data: ClassForm) => axios.post(API_URL, data),
  update: (id: number, data: ClassForm) => axios.put(`${API_URL}/${id}`, data),
  delete: (id: number) => axios.delete(`${API_URL}/${id}`),
};
