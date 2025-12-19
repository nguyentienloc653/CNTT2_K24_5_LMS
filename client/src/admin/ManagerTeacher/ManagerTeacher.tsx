import HeaderManagerTeacher from "../../components/teachers/HeaderManagerTeacher";
import { TeacherTable } from "../../components/teachers/TeacherTable";
import NavbarManagerStudent from "../../components/students/NavbarManagerStudent";
import SideBarManager from "../../components/layout/SideBarManager";
import { useState } from "react";
import type { Teacher } from "../../redux/types/teacher";
import { useAppDispatch } from "../../redux/hook";
import { deleteTeacher } from "../../redux/slices/teacherSlice";
import TeacherModalForm from "../../components/teachers/TeacherModalForm";
import ConfirmModal from "../../components/common/ModalConfirm";

export default function ManagerStudent() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [deleteTeacherTarget, setDeleteTeacherTarget] =
    useState<Teacher | null>(null);
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

  return (
    <div className="flex flex-row gap-6 min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <div className="w-64">
        <SideBarManager />
      </div>
      {/* MAIN CONTENT */}
      <div className="flex-col flex-1 p-4 gap-6">
        {/* HEADER */}
        <HeaderManagerTeacher onAdd={handleAdd} />

        {/* NAVBAR */}
        <NavbarManagerStudent />

        {/* TABLE */}
        <TeacherTable onEdit={handleEdit} onDelete={handleDelete} />

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
