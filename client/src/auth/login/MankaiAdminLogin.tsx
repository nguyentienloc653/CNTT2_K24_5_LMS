import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import login from '../../img/login.png';
import { useAppDispatch } from '../../redux/hook';
import { loginAdmin } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function MankaiAdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (): Promise<void> => {
        // ===== VALIDATE CẤP 1 =====
        if (!email.trim() || !password.trim()) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }

        try {
            // ===== VALIDATE CẤP 2 (CHECK ADMINS) =====
            await dispatch(loginAdmin({ email, password })).unwrap();

            // ✅ ADMIN LOGIN OK → DASHBOARD QUẢN TRỊ
            navigate('/dashboard-manager');

            console.log('Đăng nhập admin thành công');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Admin Login Form */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="relative w-12 h-12">
                                <div
                                    className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"
                                    style={{ animationDuration: '3s' }}
                                ></div>
                                <div className="absolute inset-2 bg-orange-500 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-800">
                                    Mankai
                                </div>
                                <div className="text-sm text-orange-500 font-semibold">
                                    Academy
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full mb-6 shadow-lg">
                        <Shield className="w-5 h-5" />
                        <span className="font-semibold">Quản trị viên</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Đăng nhập Admin
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Truy cập hệ thống quản trị Mankai Academy
                    </p>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@mankaisupport.com"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••"
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* 🔴 HIỂN THỊ LỖI */}
                    {error && (
                        <p className="text-sm text-red-500 mt-2">{error}</p>
                    )}

                    {/* Forgot Password */}
                    <div className="text-right mb-6">
                        <a
                            href="#"
                            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                        >
                            Quên mật khẩu?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Đăng nhập
                    </button>

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs text-yellow-800">
                            <span className="font-semibold">
                                ⚠️ Lưu ý bảo mật:
                            </span>{' '}
                            Đây là khu vực dành riêng cho quản trị viên. Mọi
                            hoạt động đăng nhập sẽ được ghi lại và giám sát.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Image */}
            <div className="hidden lg:block lg:w-1/2">
                <img src={login} alt="Mankai Academy" />
            </div>
        </div>
    );
}
