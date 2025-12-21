// import React, { useState } from 'react';
// import { Camera, Search, Bell } from 'lucide-react';

// export default function ProfileEditPage() {
//   const [formData, setFormData] = useState({
//     firstName: 'Nguyễn',
//     lastName: 'Ánh Viên',
//     email: 'vien@gmail.com',
//     phone: '0981 965 304',
//     birthDate: '15/03/2006',
//     studentId: 'PT242'
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-8">
//             <div className="flex items-center gap-2">
//               <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">M</span>
//               </div>
//               <span className="font-semibold text-gray-800">Mankai</span>
//             </div>
            
//             <nav className="flex items-center gap-6">
//               <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
//                 <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
//                 <span className="text-sm">Trang chủ</span>
//               </button>
//               <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
//                 <span className="text-sm">📄</span>
//                 <span className="text-sm">Bài viết</span>
//               </button>
//             </nav>
//           </div>

//           <div className="flex items-center gap-4">
//             <button className="p-2 hover:bg-gray-100 rounded-full">
//               <Search className="w-5 h-5 text-gray-600" />
//             </button>
//             <button className="p-2 hover:bg-gray-100 rounded-full">
//               <Bell className="w-5 h-5 text-gray-600" />
//             </button>
//             <div className="w-10 h-10 bg-orange-400 rounded-full overflow-hidden">
//               <img 
//                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-12">
//         <h1 className="text-4xl font-bold text-gray-900 mb-12">Chỉnh sửa thông tin</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Left Column - Avatar */}
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 mb-6">Ảnh đại diện</h2>
            
//             <div className="relative w-80 h-80 mx-auto">
//               <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-yellow-300 to-yellow-500">
//                 <img 
//                   src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
              
//               <button className="absolute bottom-4 right-4 w-12 h-12 bg-gray-700 hover:bg-gray-800 rounded-full flex items-center justify-center shadow-lg transition-colors">
//                 <Camera className="w-6 h-6 text-white" />
//               </button>
//             </div>

//             <p className="text-sm text-gray-600 text-center mt-6">
//               Kích thước ảnh nhỏ nhất: 200 x 200px, định dạng PNG hoặc JPG
//             </p>
//           </div>

//           {/* Right Column - Form */}
//           <div>
//             <div className="bg-gray-50 rounded-lg p-6 mb-6">
//               <p className="text-sm text-gray-700 leading-relaxed">
//                 Tại đây bạn có thể xem các thông tin hiện tại của mình và chỉnh sửa ảnh đại diện. 
//                 Các thông tin cá nhân còn lại là mặc định và không thể chỉnh sửa.
//               </p>
//             </div>

//             <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin cá nhân</h2>

//             <div className="space-y-6">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Họ
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     disabled
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Tên
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     disabled
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     disabled
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Ngày sinh
//                   </label>
//                   <input
//                     type="text"
//                     name="birthDate"
//                     value={formData.birthDate}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     disabled
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Số điện thoại
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     disabled
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Mã sinh viên
//                   </label>
//                   <input
//                     type="text"
//                     name="studentId"
//                     value={formData.studentId}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     disabled
//                   />
//                 </div>
//               </div>

//               <button className="w-full bg-orange-50 hover:bg-orange-100 text-orange-600 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
//                 <span className="text-lg">🔒</span>
//                 <span>Đổi mật khẩu</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }