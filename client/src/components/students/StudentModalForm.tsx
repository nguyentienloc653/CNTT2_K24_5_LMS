import { useEffect, useState } from "react";
import { addStudent, updateStudent } from "../../redux/slices/studentSlice";
import type { Student, StudentForm } from "../../redux/types/student";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  student?: Student | null;
  onClose: () => void;
};

const emptyForm: StudentForm = {
  studentCode: "",
  name: "",
  birthday: "",
  classId: 0,
  gender: "Nam",
  address: "",
  email: "",
};

export default function StudentModalForm({
  open,
  mode,
  student,
  onClose,
}: Props) {
  const [form, setForm] = useState<StudentForm>(emptyForm);

  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const students = useAppSelector((state) => state.students.list);
  const classes = useAppSelector((state) => state.classes.list);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && student) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        studentCode: student.studentCode,
        name: student.name,
        birthday: student.birthday,
        classId: student.classId,
        gender: student.gender,
        address: student.address,
        email: student.email,
      });
    }

    if (mode === "add") {
      setForm(emptyForm);
    }

    setErrors({});
  }, [open, mode, student]);

  // ================= VALIDATE =================
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.studentCode.trim()) {
      newErrors.studentCode = "Mã sinh viên bắt buộc";
    } else if (
      mode === "add" &&
      students.some((s) => s.studentCode === form.studentCode)
    ) {
      newErrors.studentCode = "Mã sinh viên đã tồn tại";
    }

    if (!form.name.trim()) {
      newErrors.name = "Tên sinh viên bắt buộc";
    }

    if (!form.birthday) {
      newErrors.birthday = "Ngày sinh bắt buộc";
    } else if (new Date(form.birthday) > new Date()) {
      newErrors.birthday = "Ngày sinh không hợp lệ";
    }

    if (!form.classId) {
      newErrors.className = "Vui lòng chọn lớp";
    }

    if (!form.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }

    if (!form.address.trim()) {
      newErrors.address = "Địa chỉ bắt buộc";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!open) return null;

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (mode === "add") {
        await dispatch(addStudent(form)).unwrap();
        toast.success("Thêm sinh viên thành công");
      } else {
        await dispatch(
          updateStudent({
            id: student!.id,
            data: form,
          })
        ).unwrap();
        toast.success("Cập nhật sinh viên thành công 🎉");
      }

      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Thao tác thất bại ❌");
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none";

  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-6">
          {mode === "add" ? "Thêm sinh viên" : "Sửa sinh viên"}
        </h2>

        {/* FORM 2 CỘT */}
        <div className="grid grid-cols-2 gap-4">
          {/* Mã SV */}
          <div>
            <input
              value={form.studentCode}
              onChange={(e) =>
                setForm({ ...form, studentCode: e.target.value })
              }
              placeholder="Mã sinh viên"
              className={inputClass}
            />
            {errors.studentCode && (
              <p className={errorClass}>{errors.studentCode}</p>
            )}
          </div>

          {/* Tên */}
          <div>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Tên sinh viên"
              className={inputClass}
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          {/* Ngày sinh */}
          <div>
            <input
              type="date"
              value={form.birthday}
              onChange={(e) => setForm({ ...form, birthday: e.target.value })}
              className={inputClass}
            />
            {errors.birthday && <p className={errorClass}>{errors.birthday}</p>}
          </div>

          {/* Lớp */}
          <div>
            <select
              value={form.classId}
              onChange={(e) =>
                setForm({ ...form, classId: Number(e.target.value) })
              }
              className={inputClass}
            >
              <option value="">-- Chọn lớp --</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.className && (
              <p className={errorClass}>{errors.className}</p>
            )}
          </div>

          {/* Địa chỉ */}
          <div>
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Địa chỉ"
              className={inputClass}
            />
            {errors.address && <p className={errorClass}>{errors.address}</p>}
          </div>

          {/* Giới tính */}
          <div>
            <p className="text-sm font-medium mb-1">Giới tính</p>

            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === "Nam"}
                  onChange={() => setForm({ ...form, gender: "Nam" })}
                  className="accent-blue-600"
                />
                <span>Nam</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === "Nữ"}
                  onChange={() => setForm({ ...form, gender: "Nữ" })}
                  className="accent-blue-600"
                />
                <span>Nữ</span>
              </label>
            </div>

            {errors.gender && <p className={errorClass}>{errors.gender}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className={inputClass}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Huỷ
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            {mode === "add" ? "Thêm" : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
