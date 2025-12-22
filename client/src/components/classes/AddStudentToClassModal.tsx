import type { Student } from "../../redux/types/student";
import { useAppDispatch } from "../../redux/hook";
import { updateStudent } from "../../redux/slices/studentSlice";

type Props = {
  open: boolean;
  onClose: () => void;
  classId: number;
  students: Student[];
};

export default function AddStudentToClassModal({
  open,
  onClose,
  classId,
  students,
}: Props) {
  const dispatch = useAppDispatch();

  if (!open) return null;

  const availableStudents = students.filter(
    (s) => Number(s.classId) !== classId
  );

  const handleAdd = (student: Student) => {
    dispatch(
      updateStudent({
        id: student.id,
        data: { ...student, classId: String(classId) },
      })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Thêm sinh viên vào lớp</h2>

        <div className="space-y-2 max-h-[300px] overflow-auto">
          {availableStudents.map((s) => (
            <div
              key={s.id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-gray-500">{s.studentCode}</p>
              </div>

              <button
                onClick={() => handleAdd(s)}
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
