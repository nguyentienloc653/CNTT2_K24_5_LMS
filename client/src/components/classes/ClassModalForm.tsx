import { useEffect, useState } from "react";
import { addClass, updateClass } from "../../redux/slices/classesSlice";
import { useAppDispatch } from "../../redux/hook";
import type { Class, ClassForm } from "../../redux/types/class";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  classData?: Class | null;
  onClose: () => void;
};

const emptyForm: ClassForm = {
  classCode: "",
  name: "",
  grade: 1,
  homeroomTeacherId: undefined,
  studentIds: [],
  teacherIds: [],
  status: "active",
};

export default function ClassModalForm({
  open,
  mode,
  classData,
  onClose,
}: Props) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<ClassForm>(emptyForm);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && classData) {
      const { id, ...rest } = classData;
      setForm(rest);
    } else {
      setForm(emptyForm);
    }
  }, [open, mode, classData]);

  const handleSubmit = async () => {
    try {
      if (mode === "add") {
        await dispatch(addClass(form)).unwrap();
        toast.success("Thêm lớp thành công");
      } else {
        await dispatch(
          updateClass({
            id: classData!.id,
            data: form,
          })
        ).unwrap();
        toast.success("Cập nhật lớp thành công");
      }
      onClose();
    } catch {
      toast.error("Thao tác thất bại");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[480px] p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">
          {mode === "add" ? "Thêm lớp học" : "Sửa lớp học"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Mã lớp"
            value={form.classCode}
            onChange={(e) =>
              setForm({ ...form, classCode: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Tên lớp"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Khối"
            value={form.grade}
            onChange={(e) =>
              setForm({ ...form, grade: Number(e.target.value) })
            }
          />

          <select
            className="border p-2 rounded"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as any })
            }
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngưng</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose}>Huỷ</button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {mode === "add" ? "Thêm" : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
