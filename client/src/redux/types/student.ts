export interface Student {
  id: number;
  studentCode: string;
  name: string;
  birthday: string;
  classId: number;
  gender: "Nam" | "Nữ";
  address: string;
  email: string;
}

// Dùng cho form (không có id)
export type StudentForm = Omit<Student, "id">;
