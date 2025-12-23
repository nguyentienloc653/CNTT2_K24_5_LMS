import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect } from "react";
import { fetchTeachers } from "../../redux/slices/teacherSlice";
import { fetchClasses } from "../../redux/slices/classesSlice";

export default function TeacherDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { list: teachers, loading } = useAppSelector((state) => state.teachers);
  const classes = useAppSelector((state) => state.classes.list);

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchClasses());
  }, [dispatch]);

  const teacher = teachers.find((t) => t.id === Number(id));

  if (loading) {
    return <div className="p-8">Đang tải dữ liệu...</div>;
  }

  if (!teacher) {
    return (
      <div className="p-8 text-red-500 font-medium">
        Không tìm thấy giảng viên
      </div>
    );
  }

  // Các lớp giảng viên dạy
  const teacherClasses = classes.filter((c) =>
    teacher.classIds.includes(c.id)
  );

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Teacher Detail
          </h1>
          <p className="text-gray-500">
            More information about the teacher
          </p>
        </div>

        <button
          onClick={() => navigate("/teachers")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          ← Back to List
        </button>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        {/* Avatar + Basic Info */}
        <div className="flex gap-8 items-center mb-8">
          {/* Avatar giả */}
          <div className="w-32 h-32 rounded-full bg-orange-400 flex items-center justify-center text-4xl font-bold text-white">
            {teacher.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {teacher.name}
            </h2>
            <p className="text-gray-500">
              Teacher Code: {teacher.teacherCode}
            </p>
          </div>
        </div>

        {/* Grid info */}
        <div className="grid grid-cols-2 gap-6">
          <Info label="Ngày sinh" value={teacher.birthday} />
          <Info label="Email" value={teacher.email} />
          <Info label="Giới tính" value={teacher.gender} />
          <Info label="Số điện thoại" value={teacher.phone} />
          <Info label="Địa chỉ" value={teacher.address} />
          <Info label="Trạng thái" value={teacher.status} />
        </div>
      </div>

      {/* ================= CLASS INFO ================= */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Teaching Information
        </h2>

        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          {/* Classes */}
          <div>
            <b>Lớp giảng dạy:</b>
            <div className="flex flex-wrap gap-2 mt-3">
              {teacherClasses.length > 0 ? (
                teacherClasses.map((c) => (
                  <span
                    key={c.id}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {c.name}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">Chưa phân lớp</span>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <b>Môn giảng dạy:</b>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                {teacher.subject}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= INFO ITEM ================= */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-5 rounded-xl border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-700">
        {value || "-"}
      </p>
    </div>
  );
}
