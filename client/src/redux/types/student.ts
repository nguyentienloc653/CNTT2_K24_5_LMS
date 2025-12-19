export interface Student {
  id: number;
  studentCode: string;
  name: string;
  birthday: string;
  classId: number;
  gender: "Nam" | "Nữ";
  address: string;
  email: string;
  subject: string;
}

// Dùng cho form (không có id)
export type StudentForm = {
  studentCode: string;
  name: string;
  birthday: string;
  classId: string;
  gender: "Nam" | "Nữ";
  address: string;
  email: string;
  subject: string;
};
