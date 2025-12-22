import type { Teacher } from "../../redux/types/teacher";
import { useAppDispatch } from "../../redux/hook";
import { updateTeacher } from "../../redux/slices/teacherSlice";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  onClose: () => void;
  classId: number;
  teachers: Teacher[];
};

export default function AddTeacherToClassModal({
  open,
  onClose,
  classId,
  teachers,
}: Props) {
  const dispatch = useAppDispatch();

  if (!open) return null;

  const availableTeachers = teachers.filter(
    (t) => !t.classIds.includes(classId)
  );

  const handleAddTeacher = async (teacher: Teacher) => {
    try {
      await dispatch(
        updateTeacher({
          id: teacher.id,
          data: {
            ...teacher,
            classIds: [...teacher.classIds, Number(classId)],
          },
        })
      ).unwrap();

      toast.success("Thêm giáo viên vào lớp thành công 🎉");
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Thao tác thất bại ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Thêm giáo viên vào lớp</h2>

        <div className="space-y-2 max-h-[300px] overflow-auto">
          {availableTeachers.map((t) => (
            <div
              key={t.id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-gray-500">{t.subject}</p>
              </div>

              <button
                onClick={() => handleAddTeacher(t)}
                className="px-3 py-1 bg-orange-500 text-white rounded"
              >
                Thêm
              </button>
            </div>
          ))}
        </div>

        <div className="text-right mt-4">
          <button onClick={onClose} className="text-gray-500">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
