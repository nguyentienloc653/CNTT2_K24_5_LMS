import { useState, useEffect } from "react";
import { coursesApi } from "../../redux/api/coursesApi";
import SideBarManager from "../layout/SideBarManager";

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

  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");

  // Fetch courses
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

  // Handle modal open/close
  const handleAdd = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle new course submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: courses.length + 1,
      courseCode: newCode,
      name: newName,
      description: "",
      subjectId: 0,
      teacherId: 0,
      classId: 0,
      status: "active",
      startDate: "",
      endDate: "",
      credits: 0,
      createdAt: new Date().toISOString(),
    };
    setCourses([...courses, newCourse]);
    setNewName("");
    setNewCode("");
    handleClose();
  };

  // CourseHeader component
  const CourseHeader = ({ onAdd }: { onAdd: () => void }) => (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <div>
        <h1 className="text-2xl font-bold">Courses</h1>
        <p className="text-sm text-gray-500">Manager your courses</p>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={onAdd}
          className="bg-orange-500 text-white px-4 py-1 rounded-md"
        >
          Add Course
        </button>
      </div>
    </div>
  );

  // NavbarManagerCourse component
  const NavbarManagerCourse = () => (
    <div className="flex justify-between items-center bg-white p-4 rounded-md">
      <div>
        <input
          type="text"
          placeholder="Search courses..."
          className="border-2 rounded-md p-2 w-[900px]"
        />
      </div>
      <div>
        <select className="w-[150px] text-center p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">All Classes</option>
        </select>
      </div>
      <div>
        <select className="w-[100px] text-center p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Sắp xếp</option>
          <option value="name">Tăng</option>
          <option value="courseCode">Giảm</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="flex">
      <SideBarManager />
      <div className="flex flex-col flex-1">
        <CourseHeader onAdd={handleAdd} />
        <NavbarManagerCourse />

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
                        className={`px-2 py-1 rounded text-sm ${
                          course.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {course.status === "active"
                          ? "Hoạt động"
                          : "Không hoạt động"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Add Course */}
        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow w-96">
              <h2 className="text-lg font-bold mb-4">Add New Course</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Course Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full mb-2 px-3 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Course Code"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full mb-2 px-3 py-2 border rounded"
                  required
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-1 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 bg-orange-500 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
