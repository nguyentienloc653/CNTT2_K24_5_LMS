import { useEffect } from "react";
import { fetchStudents } from "../../redux/slices/studentSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import editIcon from "../../assets/icon/edit.png";
import trashIcon from "../../assets/icon/trash.png";
import type { Student } from "../../redux/types/student";
import { fetchClasses } from "../../redux/slices/classesSlice";
import { useNavigate } from "react-router-dom";
import eyeIcon from "../../assets/icon/eye.png";
type Props = {
  data: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
};

export function StudentTable({ data, onEdit, onDelete }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.students);
  const classes = useAppSelector((state) => state.classes.list);

  const getClassName = (classId: string) =>
    classes.find((c) => String(c.id) === classId)?.name || "—";

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchClasses());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto p-2">
      <table className="w-full bg-white shadow-md">
        <thead>
          <tr className="bg-orange-500 text-white text-left">
            <th className="p-2">Mã SV</th>
            <th className="p-2">Tên sinh viên</th>
            <th className="p-2">Ngày sinh</th>
            <th className="p-2">Lớp</th>
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
              <td className="p-2">{item?.studentCode}</td>
              <td className="p-2">{item?.name}</td>
              <td className="p-2">{item?.birthday}</td>
              <td className="p-2">{getClassName(String(item?.classId))}</td>

              <td className="p-2">
                <button onClick={() => navigate(`/students/${item.id}`)}>
                  <img src={eyeIcon} className="w-5" />
                </button>
              </td>

              <td className="p-2 flex gap-2 justify-center">
                <button onClick={() => onEdit(item)}>
                  <img src={editIcon} className="w-6" />
                </button>
                <button onClick={() => onDelete(item)}>
                  <img src={trashIcon} className="w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
