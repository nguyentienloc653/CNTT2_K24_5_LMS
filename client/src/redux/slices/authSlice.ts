import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IUser } from '../types/Users';
import { authApi } from '../api/auth';

interface AuthState {
    users: IUser[];
    currentUser: IUser | null;
    currentAdmin: IUser | null;   // 🔴 THÊM
    loading: boolean;
}

const initialState: AuthState = {
    users: [],
    currentUser: null,
    currentAdmin: null,           // 🔴 THÊM
    loading: false
};

// =======================
// REGISTER (USER)
// =======================
export const addUser = createAsyncThunk(
    'auth/addUser',
    async (user: IUser) => {
        const newUser: IUser = {
            ...user,
            createdAt: new Date().toISOString(),
            status: 'ACTIVE',
            role: 'USER'
        };
        return await authApi.createUser(newUser);
    }
);

// =======================
// GET USERS
// =======================
export const fetchUsers = createAsyncThunk(
    'auth/fetchUsers',
    async () => {
        return await authApi.getUsers();
    }
);

// =======================
// LOGIN USER
// =======================
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (
        payload: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            return await authApi.login(payload.email, payload.password);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// =======================
// 🔴 LOGIN ADMIN (THÊM)
// =======================
export const loginAdmin = createAsyncThunk(
    'auth/loginAdmin',
    async (
        payload: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            return await authApi.loginAdmin(
                payload.email,
                payload.password
            );
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // =======================
        // LOGOUT USER
        // =======================
        logout(state) {
            state.currentUser = null;
        },

        // =======================
        // 🔴 LOGOUT ADMIN
        // =======================
        logoutAdmin(state) {
            state.currentAdmin = null;
        }
    },
    extraReducers: builder => {
        builder
            // ---------- fetch users ----------
            .addCase(fetchUsers.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })

            // ---------- register ----------
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })

            // ---------- login user ----------
            .addCase(loginUser.pending, state => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, state => {
                state.loading = false;
            })

            // ---------- 🔴 login admin ----------
            .addCase(loginAdmin.pending, state => {
                state.loading = true;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.currentAdmin = action.payload;
                state.loading = false;
            })
            .addCase(loginAdmin.rejected, state => {
                state.loading = false;
            });
    }
});

export const { logout, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
