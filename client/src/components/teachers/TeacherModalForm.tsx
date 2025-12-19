import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "react-toastify";
import type { Teacher, TeacherForm } from "../../redux/types/teacher";
import { addTeacher, updateTeacher } from "../../redux/slices/teacherSlice";
import { Input } from "../common/Input";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  teacher?: Teacher | null;
  onClose: () => void;
};

const emptyForm: TeacherForm = {
  teacherCode: "",
  name: "",
  gender: "Nam",
  birthday: "",
  email: "",
  phone: "",
  address: "",
  subject: "",
  status: "active",
  classIds: [],
};

export default function TeacherModalForm({
  open,
  mode,
  teacher,
  onClose,
}: Props) {
  const [form, setForm] = useState<TeacherForm>(emptyForm);

  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const teachers = useAppSelector((state) => state.teachers.list);
  const classes = useAppSelector((state) => state.classes.list);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && teacher) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        teacherCode: teacher.teacherCode,
        name: teacher.name,
        gender: teacher.gender,
        birthday: teacher.birthday,
        email: teacher.email,
        phone: teacher.phone,
        address: teacher.address,
        subject: teacher.subject,
        status: teacher.status,
        classIds: teacher.classIds,
      });
    }

    if (mode === "add") {
      setForm(emptyForm);
    }

    setErrors({});
  }, [open, mode, teacher]);

  // ================= VALIDATE =================
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.teacherCode.trim()) {
      newErrors.studentCode = "Mã sinh viên bắt buộc";
    } else if (
      mode === "add" &&
      teachers.some((s) => s.teacherCode === form.teacherCode)
    ) {
      newErrors.teacherCode = "Mã giảng viên đã tồn tại";
    }

    if (!form.name.trim()) {
      newErrors.name = "Tên giảng viên bắt buộc";
    }

    if (!form.birthday) {
      newErrors.birthday = "Ngày sinh bắt buộc";
    } else if (new Date(form.birthday) > new Date()) {
      newErrors.birthday = "Ngày sinh không hợp lệ";
    }

    if (form.classIds.length === 0) {
      newErrors.className = "Phải chọn ít nhất 1 lớp";
    }

    if (!form.address.trim()) {
      newErrors.address = "Địa chỉ bắt buộc";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Số điện thoại bắt buộc";
    } else if (!/^\d{9,11}$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Môn giảng dạy bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!open) return null;

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (mode === "add") {
        await dispatch(addTeacher(form)).unwrap();
        toast.success("Thêm giảng viên thành công");
      } else {
        await dispatch(
          updateTeacher({
            id: teacher!.id,
            data: form,
          })
        ).unwrap();
        toast.success("Cập nhật giảng viên thành công 🎉");
      }

      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Thao tác thất bại ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[760px] max-h-[90vh] overflow-y-auto p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-6">
          {mode === "add" ? "Thêm giảng viên" : "Sửa giảng viên"}
        </h2>

        {/* GRID 2 CỘT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ===== CỘT TRÁI ===== */}
          <div className="space-y-3">
            <Input
              label="Mã giảng viên"
              value={form.teacherCode}
              onChange={(v) => setForm({ ...form, teacherCode: v })}
              error={errors.teacherCode}
              disabled={mode === "edit"}
            />

            <Input
              label="Tên giảng viên"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              error={errors.name}
            />

            <Input
              type="date"
              label="Ngày sinh"
              value={form.birthday}
              onChange={(v) => setForm({ ...form, birthday: v })}
              error={errors.birthday}
            />

            {/* Giới tính */}
            <div>
              <p className="font-medium mb-1">Giới tính</p>
              <div className="flex gap-4">
                {["Nam", "Nữ"].map((g) => (
                  <label key={g} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={form.gender === g}
                      onChange={() =>
                        setForm({ ...form, gender: g as "Nam" | "Nữ" })
                      }
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            {/* Trạng thái */}
            <div>
              <p className="font-medium mb-1">Trạng thái</p>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as "active" | "inactive",
                  })
                }
                className="input"
              >
                <option value="active">Đang giảng dạy</option>
                <option value="inactive">Ngừng giảng dạy</option>
              </select>
            </div>
          </div>

          {/* ===== CỘT PHẢI ===== */}
          <div className="space-y-3">
            <Input
              label="Email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              error={errors.email}
            />

            <Input
              label="Số điện thoại"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              error={errors.phone}
            />

            <Input
              label="Địa chỉ"
              value={form.address}
              onChange={(v) => setForm({ ...form, address: v })}
              error={errors.address}
            />

            <Input
              label="Môn giảng dạy"
              value={form.subject}
              onChange={(v) => setForm({ ...form, subject: v })}
              error={errors.subject}
            />

            {/* Lớp giảng dạy */}
            <div>
              <p className="font-medium mb-1">Lớp giảng dạy</p>
              <div className="max-h-40 overflow-y-auto border rounded p-2 space-y-1">
                {classes.map((c) => (
                  <label key={c.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.classIds.includes(c.id)}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          classIds: e.target.checked
                            ? [...form.classIds, c.id]
                            : form.classIds.filter((id) => id !== c.id),
                        })
                      }
                    />
                    {c.name}
                  </label>
                ))}
              </div>
              {errors.classIds && (
                <p className="text-red-500 text-sm mt-1">{errors.classIds}</p>
              )}
            </div>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Huỷ
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-5 py-2 rounded"
          >
            {mode === "add" ? "Thêm" : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
