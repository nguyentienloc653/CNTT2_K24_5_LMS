import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchClasses } from "../../redux/slices/classesSlice";
import trashIcon from "../../assets/icon/trash.png";
import eyeIcon from "../../assets/icon/eye.png";
import { fetchStudents } from "../../redux/slices/studentSlice";
import { fetchTeachers } from "../../redux/slices/teacherSlice";

type ViewMode = "students" | "teachers" | null;

export default function ClassDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { list: classes, loading } = useAppSelector((state) => state.classes);
  const students = useAppSelector((state) => state.students.list);
  const teachers = useAppSelector((state) => state.teachers.list);

  const [viewMode, setViewMode] = useState<ViewMode>("students");

  // fetch classes nếu reload trang
  useEffect(() => {
    if (classes.length === 0) {
      dispatch(fetchClasses());
    }
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
    if (teachers.length === 0) {
      dispatch(fetchTeachers());
    }
  }, [dispatch, classes.length, teachers.length, students.length]);

  const classData = classes.find((c) => String(c.id) === id);

  if (loading) {
    return <div className="p-8">Đang tải dữ liệu lớp học...</div>;
  }

  if (!classData) {
    return (
      <div className="p-8 text-red-500 font-medium">Không tìm thấy lớp học</div>
    );
  }

  const classStudents = students.filter(
    (s) => Number(s.classId) === Number(classData.id)
  );

  const classTeachers = teachers.filter((t) =>
    t.classIds.includes(classData.id)
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{classData.name}</h1>
          <p className="text-gray-500">
            Tổng {classStudents.length} sinh viên · {classTeachers.length} giáo
            viên
          </p>
        </div>

        <button
          onClick={() => navigate("/classes")}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Quay lại
        </button>
      </div>

      {/* ================= SELECT CARD ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* STUDENTS CARD */}
        <div
          onClick={() => setViewMode("students")}
          className={`cursor-pointer rounded-xl p-6 shadow transition
            ${
              viewMode === "students"
                ? "bg-orange-600 text-white"
                : "bg-white hover:bg-orange-50"
            }`}
        >
          <h3 className="text-lg font-semibold">Sinh viên</h3>
          <p className="text-3xl font-bold mt-2">{classStudents.length}</p>
          <p className="text-sm opacity-80">Sinh viên trong lớp</p>
        </div>

        {/* TEACHERS CARD */}
        <div
          onClick={() => setViewMode("teachers")}
          className={`cursor-pointer rounded-xl p-6 shadow transition
            ${
              viewMode === "teachers"
                ? "bg-orange-600 text-white"
                : "bg-white hover:bg-orange-50"
            }`}
        >
          <h3 className="text-lg font-semibold">Giáo viên</h3>
          <p className="text-3xl font-bold mt-2">{classTeachers.length}</p>
          <p className="text-sm opacity-80">Giáo viên phụ trách</p>
        </div>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {!viewMode && (
        <div className="text-center text-gray-400 py-10">
          Chọn Sinh viên hoặc Giáo viên để xem chi tiết
        </div>
      )}

      {/* ================= STUDENTS TABLE ================= */}
      {viewMode === "students" && (
        <section className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Sinh viên ({classStudents.length})
            </h2>

            <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
              + Thêm sinh viên
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="p-2 text-left">Mã SV</th>
                <th className="p-2 text-left">Tên</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    Chưa có sinh viên
                  </td>
                </tr>
              ) : (
                classStudents.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.studentCode}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.email}</td>

                    <td className="p-2 text-center flex gap-2 justify-center">
                      <button onClick={() => navigate(`/students/${item.id}`)}>
                        <img src={eyeIcon} className="w-5" />
                      </button>

                      <button onClick={() => console.log("delete", item)}>
                        <img src={trashIcon} className="w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      )}

      {/* ================= TEACHERS TABLE ================= */}
      {viewMode === "teachers" && (
        <section className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Giáo viên ({classTeachers.length})
            </h2>

            <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
              + Thêm giáo viên
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="p-2 text-left">Mã GV</th>
                <th className="p-2 text-left">Tên</th>
                <th className="p-2 text-left">Môn</th>
                <th className="p-2 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {classTeachers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    Chưa có giáo viên
                  </td>
                </tr>
              ) : (
                classTeachers.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.teacherCode}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.subject}</td>

                    <td className="p-2 text-center flex gap-2 justify-center">
                      <button onClick={() => navigate(`/teachers/${item.id}`)}>
                        <img src={eyeIcon} className="w-5" />
                      </button>

                      <button onClick={() => console.log("remove", item)}>
                        <img src={trashIcon} className="w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
