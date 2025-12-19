export interface Teacher {
  id: number;
  teacherCode: string;
  name: string;
  gender: "Nam" | "Nữ";
  birthday: string;
  email: string;
  phone: string;
  address: string;
  subject: string;
  status: "active" | "inactive";
  classIds: number[]; 
}

// Dùng cho form (không có id)
export type TeacherForm = Omit<Teacher, "id">;
