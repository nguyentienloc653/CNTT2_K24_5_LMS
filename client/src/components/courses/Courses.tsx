import { useState, useEffect } from "react";
import CourseHeader from "./CourseHeader";
import { coursesApi } from "../../redux/api/coursesApi";

interface Course {
    id: number;
    courseCode: string;
    name: string;
    description: string;
    subjectId: number;
    teacherId: number;
    classId: number;
    status: string;
    startDate: string;
    endDate: string;
    credits: number;
    createdAt: string;
}

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await coursesApi.getAll();
                setCourses(response.data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleAdd = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col">
                {/* HEADER */}
                <CourseHeader onAdd={handleAdd} />

                {/* TABLE */}
                {loading ? (
                    <p className="p-4">Đang tải...</p>
                ) : (
                    <div className="bg-white rounded shadow overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="px-4 py-2 text-left">Mã khoá</th>
                                    <th className="px-4 py-2 text-left">Tên khoá học</th>
                                    <th className="px-4 py-2 text-left">Mô tả</th>
                                    <th className="px-4 py-2 text-left">Tín chỉ</th>
                                    <th className="px-4 py-2 text-left">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">{course.courseCode}</td>
                                        <td className="px-4 py-2">{course.name}</td>
                                        <td className="px-4 py-2">{course.description}</td>
                                        <td className="px-4 py-2">{course.credits}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded text-sm ${course.status === "active"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {course.status === "active" ? "Hoạt động" : "Không hoạt động"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>

    );
}
