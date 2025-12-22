import { useState } from "react";
import SideBarManager from "../../components/layout/SideBarManager";
import HeaderManagerStudent from "../../components/students/StudentHeader";
import NavbarManagerStudent from "../../components/students/NavbarManagerStudent";
import { StudentTable } from "../../components/students/StudentTable";
import StudentModalForm from "../../components/students/StudentModalForm";
import { deleteStudent } from "../../redux/slices/studentSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import ModalConfirm from "../../components/common/ModalConfirm";
import type { Student } from "../../redux/types/student";

export default function ManagerStudent() {
  // ===== MODAL STATE =====
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sort, setSort] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleteStudentTarget, setDeleteStudentTarget] =
    useState<Student | null>(null);
  const students = useAppSelector((state) => state.students.list);
  const classes = useAppSelector((state) => state.classes.list);
  const dispatch = useAppDispatch();

  // ===== HANDLERS =====
  const handleAdd = () => {
    setMode("add");
    setSelectedStudent(null);
    setOpen(true);
  };

  const handleEdit = (student: Student) => {
    setMode("edit");
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleDelete = (student: Student) => {
    setDeleteStudentTarget(student);
  };

  const handleConfirmDelete = () => {
    if (!deleteStudentTarget) return;

    dispatch(deleteStudent(deleteStudentTarget.id));
    setDeleteStudentTarget(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const filteredStudents = students
    .filter((s) => {
      if (!search) return true;
      const key = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(key) ||
        s.studentCode.toLowerCase().includes(key) ||
        s.email.toLowerCase().includes(key)
      );
    })
    .filter((s) => {
      if (!classFilter) return true;
      return String(s.classId) === classFilter;
    })
    .sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "code") return a.studentCode.localeCompare(b.studentCode);
      return 0;
    });

  return (
    <div className="flex min-h-screen bg-orange-50">
      {/* SIDEBAR */}
      <div className="w-64">
        <SideBarManager />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col p-4 gap-6">
        {/* HEADER */}
        <HeaderManagerStudent onAdd={handleAdd} />

        {/* NAVBAR */}
        <NavbarManagerStudent
          search={search}
          onSearchChange={setSearch}
          classFilter={classFilter}
          onClassChange={setClassFilter}
          sort={sort}
          onSortChange={setSort}
          classes={classes}
        />

        {/* TABLE */}
        <StudentTable data={filteredStudents} onEdit={handleEdit} onDelete={handleDelete} />

        {/* MODAL */}
        <StudentModalForm
          key={mode === "edit" ? selectedStudent?.id : "add"}
          open={open}
          mode={mode}
          student={selectedStudent}
          onClose={handleClose}
        />

        <ModalConfirm
          open={!!deleteStudentTarget}
          title="Xoá sinh viên"
          description={`Bạn có chắc chắn muốn xoá sinh viên "${deleteStudentTarget?.name}"?`}
          onCancel={() => setDeleteStudentTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
