import axios from 'axios';
import type { IUser } from '../types/Users';

const API_URL = 'http://localhost:3001';

export const authApi = {
    // ======================
    // LẤY DANH SÁCH USER
    // ======================
    getUsers(): Promise<IUser[]> {
        return axios.get(`${API_URL}/users`).then(res => res.data);
    },

    // ======================
    // ĐĂNG KÝ (CHECK EMAIL TRÙNG)
    // ======================
    async createUser(user: IUser): Promise<IUser> {
        const users = await this.getUsers();

        const existed = users.find(u => u.email === user.email);
        if (existed) {
            throw new Error('Email đã được đăng ký');
        }

        const res = await axios.post(`${API_URL}/users`, user);
        return res.data;
    },

    // ======================
    // ĐĂNG NHẬP USER
    // ======================
    async login(email: string, password: string): Promise<IUser> {
        const res = await axios.get(
            `${API_URL}/users?email=${email}&password=${password}`
        );

        if (res.data.length === 0) {
            throw new Error('Email hoặc mật khẩu không đúng');
        }

        return res.data[0];
    },

    // ======================
    // 🔴 ĐĂNG NHẬP ADMIN (THÊM)
    // ======================
    async loginAdmin(email: string, password: string): Promise<IUser> {
        const res = await axios.get(
            `${API_URL}/admins?email=${email}&password=${password}`
        );

        if (res.data.length === 0) {
            throw new Error('Email hoặc mật khẩu admin không đúng');
        }

        return res.data[0];
    }
};
