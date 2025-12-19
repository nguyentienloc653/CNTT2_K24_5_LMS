import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

export default function StudentDetail() {
  const { id } = useParams();

  const students = useAppSelector((state) => state.students.list);
  const classes = useAppSelector((state) => state.classes.list);
  const teachers = useAppSelector((state) => state.teachers.list);

  const student = students.find((s) => s.id === Number(id));

  if (!student) {
    return <div className="p-8 text-red-500">Không tìm thấy sinh viên</div>;
  }

  const studentClasses = classes.filter((c) =>
    c.studentIds.includes(student.id)
  );

  const teacherIds = studentClasses.flatMap((c) => c.teacherIds);

  const subjects = Array.from(
    new Set(
      teachers.filter((t) => teacherIds.includes(t.id)).map((t) => t.subject)
    )
  );

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Student Detail</h1>
          <p className="text-gray-500">More information about the student</p>
        </div>

        <a
          href="/students"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700"
        >
          ← Back to List
        </a>
      </div>

      {/* Main Card */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        {/* Avatar + Basic Info */}
        <div className="flex gap-8 items-center mb-8">
          {/* Avatar fake */}
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-white">
            {student.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
            <p className="text-gray-500">Student Code: {student.studentCode}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {studentClasses.length > 0 ? (
                studentClasses.map((c) => (
                  <span
                    key={c.id}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {c.name}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
        </div>

        {/* Grid info */}
        <div className="grid grid-cols-2 gap-6">
          <Info label="Ngày sinh" value={student.birthday} />
          <Info label="Email" value={student.email} />
          <Info label="Giới tính" value={student.gender || "-"} />
          <Info label="Địa chỉ" value={student.address} />
        </div>
      </div>

      {/* Class Info */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Class Information
        </h2>

        <div className="bg-white p-6 rounded-xl shadow space-y-3">
          <p>
            <b>Lớp học:</b>{" "}
            {studentClasses.map((c) => c.name).join(", ") || "-"}
          </p>

          <div>
            <b>Môn học:</b>
            <div className="flex flex-wrap gap-2 mt-2">
              {subjects.length > 0 ? (
                subjects.map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {sub}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">Chưa có môn học</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-5 rounded-xl border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-700">{value}</p>
    </div>
  );
}
