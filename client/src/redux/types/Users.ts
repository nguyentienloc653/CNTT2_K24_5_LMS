export type UserRole = 'USER' | 'ADMIN' | 'TEACHER';
export type UserStatus = 'ACTIVE' | 'INACTIVE';

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}
