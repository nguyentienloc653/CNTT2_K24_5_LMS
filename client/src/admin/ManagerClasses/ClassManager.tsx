import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchClasses, deleteClass } from "../../redux/slices/classesSlice";
import ClassModalForm from "../../components/classes/ClassModalForm";
import { toast } from "react-toastify";
import SideBarManager from "../../components/layout/SideBarManager";
import NavbarManagerClass from "../../components/classes/NavbarManagerClass";
import HeaderManagerClass from "../../components/classes/HeaderManagerClass";
import { ClassTable } from "../../components/classes/ClassTable";
import type { Class } from "../../redux/types/class";

export default function ClassManager() {
  const dispatch = useAppDispatch();
  const classes = useAppSelector((state) => state.classes.list);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [deleteClassTarget, setDeleteClassTarget] = useState<Class | null>(null);

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

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xoá lớp này?")) return;
    await dispatch(deleteClass(id));
    toast.success("Xoá lớp thành công");
  };

  return (
    <div className="p-6">
      
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Mã lớp</th>
            <th className="border p-2">Tên lớp</th>
            <th className="border p-2">Khối</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((c) => (
            <tr key={c.id} className="text-center">
              <td className="border p-2">{c.classCode}</td>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.grade}</td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    c.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {c.status}
                </span>
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="text-blue-600"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-600"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ClassModalForm
        open={open}
        mode={mode}
        classData={selectedClass}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
