// src/types/Admins.ts

export type AdminRole = 'ADMIN' | 'SUPER_ADMIN';

export type AdminStatus = 'active' | 'inactive';

export interface IAdmin {
    id: number;
    email: string;
    password: string;
    fullName: string;
    role: AdminRole;
    status: AdminStatus;
    createdAt: string;
}
