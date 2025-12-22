import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchClasses } from "../../redux/slices/classesSlice";
import { fetchStudents } from "../../redux/slices/studentSlice";
import { fetchTeachers } from "../../redux/slices/teacherSlice";
import ConfirmModal from "../../components/common/ModalConfirm";
import { updateStudent } from "../../redux/slices/studentSlice";
import { updateTeacher } from "../../redux/slices/teacherSlice";
import { toast } from "react-toastify";

import trashIcon from "../../assets/icon/trash.png";
import eyeIcon from "../../assets/icon/eye.png";
import AddStudentToClassModal from "../../components/classes/AddStudentToClassModal";
import AddTeacherToClassModal from "../../components/classes/AddTeacherToClassModal";

type ViewMode = "students" | "teachers";

export default function ClassDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { list: classes, loading } = useAppSelector((s) => s.classes);
  const students = useAppSelector((s) => s.students.list);
  const teachers = useAppSelector((s) => s.teachers.list);

  const [viewMode, setViewMode] = useState<ViewMode>("students");
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openTeacherModal, setOpenTeacherModal] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [removeType, setRemoveType] = useState<"student" | "teacher" | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

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

  const openRemoveModal = (type: "student" | "teacher", item: any) => {
    setRemoveType(type);
    setSelectedItem(item);
    setConfirmOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (!selectedItem || !removeType) return;

    try {
      if (removeType === "student") {
        await dispatch(
          updateStudent({
            id: selectedItem.id,
            data: {
              ...selectedItem,
              classId: "",
            },
          })
        ).unwrap();

        toast.success("Xoá sinh viên khỏi lớp thành công 🎉");
      }

      if (removeType === "teacher") {
        await dispatch(
          updateTeacher({
            id: selectedItem.id,
            data: {
              ...selectedItem,
              classIds: selectedItem.classIds.filter(
                (cid: number) => cid !== classData.id
              ),
            },
          })
        ).unwrap();

        toast.success("Xoá giáo viên khỏi lớp thành công 🎉");
      }

      setConfirmOpen(false);
      setSelectedItem(null);
      setRemoveType(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Thao tác thất bại ❌");
    }
  };

  const filteredStudents = classStudents
    .filter((s) =>
      `${s.name} ${s.studentCode}`.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "code") return a.studentCode.localeCompare(b.studentCode);
      return 0;
    });

  const filteredTeachers = classTeachers
    .filter((t) =>
      `${t.name} ${t.teacherCode}`.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "code") return a.teacherCode.localeCompare(b.teacherCode);
      return 0;
    });

  return (
    <div className="p-8 bg-[#FFF7ED] min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {viewMode === "students" ? "Students" : "Teachers"}
          </h1>
          <p className="text-gray-500">Class: {classData.name}</p>
        </div>

        <button
          onClick={() => navigate("/classes")}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          ← Back
        </button>
      </div>

      {/* ================= TAB ================= */}
      <div className="flex gap-6 mb-6 bg-white p-4 rounded-md">
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${
            viewMode === "students" ? "students" : "teachers"
          }...`}
          className="flex-1 border rounded-lg px-4 py-2 outline-none"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Sắp xếp</option>

          {viewMode === "students" ? (
            <>
              <option value="name">Tên</option>
              <option value="code">Mã SV</option>
            </>
          ) : (
            <>
              <option value="name">Tên</option>
              <option value="code">Mã GV</option>
            </>
          )}
        </select>

        <button
          onClick={() =>
            viewMode === "students"
              ? setOpenStudentModal(true)
              : setOpenTeacherModal(true)
          }
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
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
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.studentCode}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>

                  <td className="p-3 text-center flex justify-center gap-3">
                    <button onClick={() => navigate(`/students/${item.id}`)}>
                      <img src={eyeIcon} className="w-5 mx-auto" />
                    </button>

                    <button onClick={() => openRemoveModal("student", item)}>
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
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.teacherCode}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.subject}</td>

                  <td className="p-3 text-center flex justify-center gap-3">
                    <button onClick={() => navigate(`/teachers/${item.id}`)}>
                      <img src={eyeIcon} className="w-5 mx-auto" />
                    </button>

                    <button onClick={() => openRemoveModal("teacher", item)}>
                      <img src={trashIcon} className="w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddStudentToClassModal
        open={openStudentModal}
        onClose={() => setOpenStudentModal(false)}
        classId={classData.id}
        students={students}
      />

      <AddTeacherToClassModal
        open={openTeacherModal}
        onClose={() => setOpenTeacherModal(false)}
        classId={classData.id}
        teachers={teachers}
      />

      <ConfirmModal
        open={confirmOpen}
        title="Xác nhận xoá"
        description={
          removeType === "student"
            ? `Xoá sinh viên "${selectedItem?.name}" khỏi lớp này?`
            : `Xoá giáo viên "${selectedItem?.name}" khỏi lớp này?`
        }
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
}
