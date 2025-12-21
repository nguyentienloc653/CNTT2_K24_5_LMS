import { useState } from 'react';
import { User, Mail, Calendar, Phone } from 'lucide-react';
import login from '../../img/login.png';
import { useAppDispatch } from '../../redux/hook';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../redux/slices/authSlice';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    phone: string;
}

export default function MankaiRegister() {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        phone: '',
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (field: keyof FormData, value: string): void => {
        setFormData((prev: FormData) => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Họ không được để trống';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Tên không được để trống';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email không được để trống';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không đúng định dạng';
        }

        if (!formData.birthDate) {
            newErrors.birthDate = 'Vui lòng chọn ngày sinh';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Số điện thoại không được để trống';
        } else if (!/^(0\d{9})$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (): Promise<void> => {
        if (!validateForm()) return;

        try {
            await dispatch(
                addUser({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: '123456',
                    birthDate: formData.birthDate,
                    phone: formData.phone,
                    role: 'USER',
                    status: 'ACTIVE',
                    createdAt: '',
                })
            ).unwrap();

            console.log('Đăng ký thành công');
            navigate('/login');
        } catch (error: any) {
            alert(error); // lỗi cấp 2 (email trùng)
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Register Form */}
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
                        Đăng ký
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Tạo tài khoản để bắt đầu hành trình học tập cùng Mankai
                        Academy
                    </p>

                    {/* First Name and Last Name */}
                    <div className="mb-4 flex gap-4">
                        {/* First Name Input */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Họ
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleChange(
                                            'firstName',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Nguyễn"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                            {errors.firstName && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        {/* Last Name Input */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleChange('lastName', e.target.value)
                                    }
                                    placeholder="Văn A"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                            {errors.lastName && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange('email', e.target.value)}
                                placeholder="you@company.com"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Birth Date Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ngày sinh
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="date"
                                value={formData.birthDate}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange('birthDate', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                        {errors.birthDate && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.birthDate}
                            </p>
                        )}
                    </div>

                    {/* Phone Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số điện thoại
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange('phone', e.target.value)}
                                placeholder="0981 965 304"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors mb-4"
                    >
                        Đăng ký
                    </button>

                    {/* Login Link */}
                    <div className="text-center">
                        <span className="text-sm text-gray-600">
                            Đã có tài khoản?{' '}
                        </span>
                        <span
                            onClick={() => navigate('/login')}
                            className="text-sm text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
                        >
                            Đăng nhập
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
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
