export interface Class {
  id: number;
  classCode: string;        
  name: string;                
  status: "active" | "inactive";
}

export type ClassForm = Omit<Class, "id">;
