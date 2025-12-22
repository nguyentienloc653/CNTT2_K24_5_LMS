import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchClasses } from "../../redux/slices/classesSlice";
import { fetchStudents } from "../../redux/slices/studentSlice";
import { fetchTeachers } from "../../redux/slices/teacherSlice";

import trashIcon from "../../assets/icon/trash.png";
import eyeIcon from "../../assets/icon/eye.png";

type ViewMode = "students" | "teachers";

export default function ClassDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { list: classes, loading } = useAppSelector((s) => s.classes);
  const students = useAppSelector((s) => s.students.list);
  const teachers = useAppSelector((s) => s.teachers.list);

  const [viewMode, setViewMode] = useState<ViewMode>("students");

  useEffect(() => {
    if (classes.length === 0) dispatch(fetchClasses());
    if (students.length === 0) dispatch(fetchStudents());
    if (teachers.length === 0) dispatch(fetchTeachers());
  }, [dispatch, classes.length, students.length, teachers.length]);

  const classData = classes.find((c) => String(c.id) === id);

  if (loading) return <div className="p-8">Đang tải dữ liệu...</div>;
  if (!classData)
    return <div className="p-8 text-red-500">Không tìm thấy lớp học</div>;

  const classStudents = students.filter(
    (s) => Number(s.classId) === Number(classData.id)
  );

  const classTeachers = teachers.filter((t) =>
    t.classIds.includes(classData.id)
  );

  return (
    <div className="p-8 bg-[#FFF7ED] min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {viewMode === "students" ? "Students" : "Teachers"}
          </h1>
          <p className="text-gray-500">
            Class: {classData.name}
          </p>
        </div>

        <button
          onClick={() => navigate("/classes")}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          ← Back
        </button>
      </div>

      {/* ================= TAB ================= */}
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => setViewMode("students")}
          className={`font-medium pb-2 ${
            viewMode === "students"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-500"
          }`}
        >
          Students ({classStudents.length})
        </button>

        <button
          onClick={() => setViewMode("teachers")}
          className={`font-medium pb-2 ${
            viewMode === "teachers"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-500"
          }`}
        >
          Teachers ({classTeachers.length})
        </button>
      </div>

      {/* ================= SEARCH BAR ================= */}
      <div className="bg-white rounded-xl p-4 mb-6 flex gap-4 items-center">
        <input
          placeholder={`Search ${
            viewMode === "students" ? "students" : "teachers"
          }...`}
          className="flex-1 border rounded-lg px-4 py-2 outline-none"
        />

        <select className="border rounded-lg px-4 py-2">
          <option>All Classes</option>
        </select>

        <select className="border rounded-lg px-4 py-2">
          <option>Sắp xếp</option>
        </select>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
          + Add {viewMode === "students" ? "Student" : "Teacher"}
        </button>
      </div>

      {/* ================= TABLE ================= */}
      {viewMode === "students" && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3 text-left">Mã SV</th>
                <th className="p-3 text-left">Tên sinh viên</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-center">View</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {classStudents.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{item.studentCode}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate(`/students/${item.id}`)}
                    >
                      <img src={eyeIcon} className="w-5 mx-auto" />
                    </button>
                  </td>

                  <td className="p-3 text-center flex justify-center gap-3">
                    <button>
                      <img src={trashIcon} className="w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "teachers" && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3 text-left">Mã GV</th>
                <th className="p-3 text-left">Tên giáo viên</th>
                <th className="p-3 text-left">Môn</th>
                <th className="p-3 text-center">View</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {classTeachers.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{item.teacherCode}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.subject}</td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate(`/teachers/${item.id}`)}
                    >
                      <img src={eyeIcon} className="w-5 mx-auto" />
                    </button>
                  </td>

                  <td className="p-3 text-center flex justify-center gap-3">
                    <button>
                      <img src={trashIcon} className="w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
