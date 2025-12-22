import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { deleteClass, fetchClasses } from "../../redux/slices/classesSlice";
import ClassModalForm from "../../components/classes/ClassModalForm";
import type { Class } from "../../redux/types/class";
// import { toast } from "react-toastify";
import SideBarManager from "../../components/layout/SideBarManager";
import HeaderManagerClass from "../../components/classes/HeaderManagerClass";
import { ClassTable } from "../../components/classes/ClassTable";
import ConfirmModal from "../../components/common/ModalConfirm";
import NavbarManagerClass from "../../components/classes/NavbarManagerClass";

export default function ClassManager() {
  const dispatch = useAppDispatch();
  const classes = useAppSelector((state) => state.classes.list);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [deleteClassTarget, setDeleteClassTarget] = useState<Class | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleAdd = () => {
    setMode("add");
    setSelectedClass(null);
    setOpen(true);
  };

  const handleEdit = (cls: Class) => {
    setMode("edit");
    setSelectedClass(cls);
    setOpen(true);
  };

  const handleDelete = (clas: Class) => {
    setDeleteClassTarget(clas);
  };

  const handleConfirmDelete = () => {
    if (!deleteClassTarget) return;

    dispatch(deleteClass(deleteClassTarget.id));
    setDeleteClassTarget(null);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteClassTarget(null);
  };

  const filteredClass = classes
    .filter((c) =>
      `${c.name} ${c.classCode}`.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "code") return a.classCode.localeCompare(b.classCode);
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
        <HeaderManagerClass onAdd={handleAdd} />

        {/* NAVBAR */}
        <NavbarManagerClass
          search={search}
          onSearchChange={setSearch}
          sort={sortBy}
          onSortChange={setSortBy}
        />
        {/* TABLE */}
        <ClassTable onDelete={handleDelete} onEdit={handleEdit} data={filteredClass} />
        {/* MODAL */}
      </div>

      <ClassModalForm
        open={open}
        mode={mode}
        classData={selectedClass}
        onClose={handleClose}
      />

      <ConfirmModal
        open={!!deleteClassTarget}
        title="Xóa lớp học"
        description={`Bạn có chắc chắn muốn xóa lớp "${deleteClassTarget?.name}"?`}
        onCancel={() => setDeleteClassTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
