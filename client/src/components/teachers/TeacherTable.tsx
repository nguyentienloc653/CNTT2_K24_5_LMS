import { useEffect } from "react";
import { fetchTeachers } from "../../redux/slices/teacherSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import editIcon from "../../assets/icon/edit.png";
import trashIcon from "../../assets/icon/trash.png";
import eyeIcon from "../../assets/icon/eye.png";
import type { Teacher } from "../../redux/types/teacher";
import { fetchClasses } from "../../redux/slices/classesSlice";
import { useNavigate } from "react-router-dom";
type Props = {
  data: Teacher[];
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
};

export function TeacherTable({ data, onEdit, onDelete }: Props) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.teachers);
  const classes = useAppSelector((state) => state.classes.list);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchClasses());
  }, [dispatch]);

  const getClassNames = (classIds: number[]) =>
    classes
      .filter((c) => classIds.includes(c.id))
      .map((c) => c.name)
      .join(", ");

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto p-2">
      <table className="w-full border-collapse bg-white shadow-md rounded-sm overflow-hidden">
        <thead>
          <tr className="bg-orange-500 text-white text-left">
            <th className="p-2">Mã GV</th>
            <th className="p-2">Tên giáo viên</th>
            <th className="p-2">Môn học</th>
            <th className="p-2">Lớp đang dạy</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2">View</th>
            <th className="p-2 text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-400">
                Không tìm thấy sinh viên
              </td>
            </tr>
          )}

          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{item.teacherCode}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.subject}</td>
              <td className="p-2">
                {getClassNames(item.classIds)}
              </td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    item.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-2">
                <button onClick={() => navigate(`/students/${item.id}`)}>
                  <img src={eyeIcon} className="w-5" />
                </button>
              </td>

              <td className="p-2 text-center flex gap-2 justify-center">
                {/* EDIT */}
                <button onClick={() => onEdit(item)}>
                  <img src={editIcon} alt="Edit" className="w-6" />
                </button>

                {/* DELETE */}
                <button onClick={() => onDelete(item)}>
                  <img src={trashIcon} alt="Delete" className="w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
