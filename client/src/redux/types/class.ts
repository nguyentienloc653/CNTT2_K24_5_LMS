export interface Class {
  id: number;
  classCode: string;        
<<<<<<< HEAD
  name: string;        
  grade: number;        
  homeroomTeacherId?: number; 
=======
  name: string;                
>>>>>>> gia_huy
  studentIds: number[];  
  teacherIds: number[]; 
  status: "active" | "inactive";
}

export type ClassForm = Omit<Class, "id">;
