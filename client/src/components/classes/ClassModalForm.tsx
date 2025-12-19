import { useEffect, useState } from "react";
import { addClass, updateClass } from "../../redux/slices/classesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
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
  status: "active",
};

export default function ClassModalForm({
  open,
  mode,
  classData,
  onClose,
}: Props) {
  const [form, setForm] = useState<ClassForm>(emptyForm);

  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  //   const teachers = useAppSelector((state) => state.teachers.list);
  const classes = useAppSelector((state) => state.classes.list);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && classData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        classCode: classData.classCode,
        name: classData.name,
        status: classData.status,
      });
    }

    if (mode === "add") {
      setForm(emptyForm);
    }

    setErrors({});
  }, [open, mode, classData]);

  // ================= VALIDATE =================
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.classCode.trim()) {
      newErrors.classCode = "Mã lớp bắt buộc";
    } else if (
      mode === "add" &&
      classes.some((s) => s.classCode === form.classCode)
    ) {
      newErrors.classCode = "Mã lớp đã tồn tại";
    }

    if (!form.name.trim()) {
      newErrors.name = "Tên lớp bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!open) return null;

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (mode === "add") {
        await dispatch(addClass(form)).unwrap();
        toast.success("Thêm giảng viên thành công");
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
          <div>
            <input
              className={`border p-2 rounded w-full ${
                errors.classCode ? "border-red-500" : ""
              }`}
              placeholder="Mã lớp"
              value={form.classCode}
              disabled={mode === "edit"}
              onChange={(e) => setForm({ ...form, classCode: e.target.value })}
            />

            {errors.classCode && (
              <p className="text-red-500 text-sm mt-1">{errors.classCode}</p>
            )}
          </div>

          <div>
            <input
              className={`border p-2 rounded w-full ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Tên lớp"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

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
