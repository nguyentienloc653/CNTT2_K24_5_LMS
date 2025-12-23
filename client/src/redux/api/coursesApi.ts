import axios from "axios";

interface CourseForm {
  courseCode: string;
  name: string;
  description: string;
  subjectId: number;
  teacherId: number;
  classId: number;
  status: string;
  startDate: string;
  endDate: string;
  credits: number;
}

const API_URL = "http://localhost:3001/courses";

export const coursesApi = {
  getAll: () => axios.get(API_URL),
  getById: (id: number) => axios.get(`${API_URL}/${id}`),
  create: (data: CourseForm) => axios.post(API_URL, data),
  update: (id: number, data: CourseForm) => axios.put(`${API_URL}/${id}`, data),
  delete: (id: number) => axios.delete(`${API_URL}/${id}`),
};
