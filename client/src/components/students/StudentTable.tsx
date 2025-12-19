import { useEffect } from "react";
import { fetchStudents } from "../../redux/slices/studentSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import editIcon from "../../assets/icon/edit.png";
import trashIcon from "../../assets/icon/trash.png";
import type { Student } from "../../redux/types/student";
import { fetchClasses } from "../../redux/slices/classesSlice";
type Props = {
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
};

export function StudentTable({ onEdit, onDelete }: Props) {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.students);
  const classes = useAppSelector((state) => state.classes.list);

  const getClassName = (classId: number) =>
    classes.find((c) => Number(c.id) === classId)?.name || "—";

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchClasses());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto p-2">
      <table className="w-full border-collapse bg-white shadow-md rounded-sm overflow-hidden">
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
          {list.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{item.studentCode}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.birthday}</td>
              <td className="p-2">{getClassName(item?.classId)}</td>

              <td className="p-2">
                <a
                  href={`/students/${item.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Detail
                </a>
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
