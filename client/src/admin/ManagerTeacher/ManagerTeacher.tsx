import HeaderManagerTeacher from "../../components/teachers/HeaderManagerTeacher";
import { TeacherTable } from "../../components/teachers/TeacherTable";
import NavbarManagerTeacher from "../../components/teachers/NavbarManagerTeacher";
import SideBarManager from "../../components/layout/SideBarManager";
import { useState } from "react";
import type { Teacher } from "../../redux/types/teacher";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { deleteTeacher } from "../../redux/slices/teacherSlice";
import TeacherModalForm from "../../components/teachers/TeacherModalForm";
import ConfirmModal from "../../components/common/ModalConfirm";

export default function ManagerStudent() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sort, setSort] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [deleteTeacherTarget, setDeleteTeacherTarget] =
    useState<Teacher | null>(null);
  const classes = useAppSelector((state) => state.classes.list);
  const teachers = useAppSelector((state) => state.teachers.list);
  const dispatch = useAppDispatch();

  // ===== HANDLERS =====
  const handleAdd = () => {
    setMode("add");
    setSelectedTeacher(null);
    setOpen(true);
  };

  const handleEdit = (teacher: Teacher) => {
    setMode("edit");
    setSelectedTeacher(teacher);
    setOpen(true);
  };

  const handleDelete = (teacher: Teacher) => {
    setDeleteTeacherTarget(teacher);
  };

  const handleConfirmDelete = () => {
    if (!deleteTeacherTarget) return;

    dispatch(deleteTeacher(deleteTeacherTarget.id));
    setDeleteTeacherTarget(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTeacher(null);
  };

  const filteredTeachers = teachers
    .filter((t) => {
      if (!search) return true;
      const key = search.toLowerCase();
      return (
        t.name.toLowerCase().includes(key) ||
        t.teacherCode.toLowerCase().includes(key) ||
        t.email.toLowerCase().includes(key) ||
        t.subject.toLowerCase().includes(key)
      );
    })
    .filter((t) => {
      if (!classFilter) return true;
      return t.classIds.includes(Number(classFilter));
    })
    .sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "code") return a.teacherCode.localeCompare(b.teacherCode);
      return 0;
    });

  return (
    <div className="flex flex-row gap-6 min-h-screen bg-orange-50">
      {/* SIDEBAR */}
      <div className="w-64">
        <SideBarManager />
      </div>
      {/* MAIN CONTENT */}
      <div className="flex-col flex-1 p-4 gap-6">
        {/* HEADER */}
        <HeaderManagerTeacher onAdd={handleAdd} />

        {/* NAVBAR */}
        <div className="mt-6 mb-6">
          <NavbarManagerTeacher
            search={search}
            onSearchChange={setSearch}
            classFilter={classFilter}
            onClassChange={setClassFilter}
            sort={sort}
            onSortChange={setSort}
            classes={classes}
          />
        </div>

        {/* TABLE */}
        <TeacherTable data={filteredTeachers} onEdit={handleEdit} onDelete={handleDelete} />

        {/* MODAL */}

        <TeacherModalForm
          key={mode === "edit" ? selectedTeacher?.id : "add"}
          open={open}
          mode={mode}
          teacher={selectedTeacher}
          onClose={handleClose}
        />

        {/* CONFIRM */}
        <ConfirmModal
          open={!!deleteTeacherTarget}
          title="Xóa giảng viên"
          description={`Bạn có chắc chắn muốn xóa giảng viên "${deleteTeacherTarget?.name}"?`}
          onCancel={() => setDeleteTeacherTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
