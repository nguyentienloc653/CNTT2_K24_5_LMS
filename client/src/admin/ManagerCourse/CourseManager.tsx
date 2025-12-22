import NavbarManagerStudent from "../../components/students/NavbarManagerStudent";
import SideBarManager from "../../components/layout/SideBarManager";
import CourseHeader from "../../components/courses/CourseHeader";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import ConfirmModal from "../../components/common/ModalConfirm";
import { useEffect } from "react";

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
export default function CourseManager() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [deleteCourseTarget, setDeleteCourseTarget] = useState<Course | null>(
    null
  );
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // ===== HANDLERS =====
  const handleAdd = () => {
    setMode("add");
    setSelectedCourse(null);
    setOpen(true);
  };

  const handleEdit = (course: Course) => {
    setMode("edit");
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleDelete = (course: Course) => {
    setDeleteCourseTarget(course);
  };

  const handleConfirmDelete = async () => {
    if (!deleteCourseTarget) return;

    try {
      await fetch(`http://localhost:3000/courses/${deleteCourseTarget.id}`, {
        method: "DELETE",
      });
      setCourses(courses.filter((c) => c.id !== deleteCourseTarget.id));
      setDeleteCourseTarget(null);
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  const handleCourseSubmit = async (courseData: Course) => {
    try {
      if (mode === "add") {
        const response = await fetch("http://localhost:3000/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        });
        const newCourse = await response.json();
        setCourses([...courses, newCourse]);
      } else {
        const response = await fetch(
          `http://localhost:3000/courses/${selectedCourse?.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(courseData),
          }
        );
        const updatedCourse = await response.json();
        setCourses(
          courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
        );
      }
      handleClose();
    } catch (error) {
      console.error("Failed to save course:", error);
    }
  };
  return (
    <div className="flex flex-row gap-6 min-h-screen bg-orange-50">
      {/* SIDEBAR */}
      <div className="w-64">
        <SideBarManager />
      </div>
      {/* MAIN CONTENT */}
      <div className="flex-col flex-1 p-4 gap-6">
        {/* HEADER */}
        <CourseHeader onAdd={handleAdd} />

        {/* NAVBAR */}
        <NavbarManagerStudent />

        {/* TABLE */}
        {loading ? (
          <p>Đang tải...</p>
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
                  <th className="px-4 py-2 text-left">Hành động</th>
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
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(course)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h2 className="text-xl font-bold mb-4">
                {mode === "add" ? "Thêm khoá học" : "Chỉnh sửa khoá học"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(
                    e.currentTarget as HTMLFormElement
                  );
                  const courseData: Course = {
                    id: selectedCourse?.id || Date.now(),
                    courseCode: formData.get("courseCode") as string,
                    name: formData.get("name") as string,
                    description: formData.get("description") as string,
                    subjectId: parseInt(formData.get("subjectId") as string),
                    teacherId: parseInt(formData.get("teacherId") as string),
                    classId: parseInt(formData.get("classId") as string),
                    status: formData.get("status") as string,
                    startDate: formData.get("startDate") as string,
                    endDate: formData.get("endDate") as string,
                    credits: parseInt(formData.get("credits") as string),
                    createdAt:
                      selectedCourse?.createdAt || new Date().toISOString(),
                  };
                  handleCourseSubmit(courseData);
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Mã khoá học
                  </label>
                  <input
                    type="text"
                    name="courseCode"
                    defaultValue={selectedCourse?.courseCode || ""}
                    required
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Tên khoá học
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedCourse?.name || ""}
                    required
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Mô tả
                  </label>
                  <textarea
                    name="description"
                    defaultValue={selectedCourse?.description || ""}
                    className="w-full border rounded px-2 py-1"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Tín chỉ
                  </label>
                  <input
                    type="number"
                    name="credits"
                    defaultValue={selectedCourse?.credits || "3"}
                    required
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    defaultValue={selectedCourse?.status || "active"}
                    className="w-full border rounded px-2 py-1"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Ngày bắt đầu
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={selectedCourse?.startDate || ""}
                    required
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Ngày kết thúc
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    defaultValue={selectedCourse?.endDate || ""}
                    required
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    ID Giáo viên
                  </label>
                  <input
                    type="number"
                    name="teacherId"
                    defaultValue={selectedCourse?.teacherId || "1"}
                    required
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    ID Môn học
                  </label>
                  <input
                    type="number"
                    name="subjectId"
                    defaultValue={selectedCourse?.subjectId || "1"}
                    required
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    ID Lớp
                  </label>
                  <input
                    type="number"
                    name="classId"
                    defaultValue={selectedCourse?.classId || "1"}
                    required
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {mode === "add" ? "Thêm" : "Cập nhật"}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CONFIRM */}
        <ConfirmModal
          open={!!deleteCourseTarget}
          title="Xóa khoá học"
          description={`Bạn có chắc chắn muốn xóa khoá học "${deleteCourseTarget?.name}"?`}
          onCancel={() => setDeleteCourseTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
