import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAppDispatch } from '../../redux/hook';
import login from '../../img/login.png';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/authSlice';

export default function MankaiLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (): Promise<void> => {
        if (!email.trim() || !password.trim()) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }

        try {
            await dispatch(loginUser({ email, password })).unwrap();

            // ✅ ĐĂNG NHẬP THÀNH CÔNG → CHUYỂN TRANG
            navigate('/');

            console.log('Đăng nhập thành công');
        } catch (err: any) {
            setError(err);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Login Form */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
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

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Đăng nhập
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Khám phá kho tàng kiến thức bất tận cùng bộ tài liệu độc
                        quyền với Mankai Academy
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
                                placeholder="you@company.com"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>

            {/* Right Panel - Image */}
            <div className="hidden lg:block lg:w-1/2">
                <img
                    src={login}
                    alt="Mankai Academy"
                    //   className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
