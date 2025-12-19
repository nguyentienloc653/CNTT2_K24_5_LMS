import { useEffect } from "react";
import { fetchTeachers } from "../../redux/slices/teacherSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import editIcon from "../../assets/icon/edit.png";
import trashIcon from "../../assets/icon/trash.png";
import { fetchClasses } from "../../redux/slices/classesSlice";
import type { Class } from "../../redux/types/class";
import { fetchStudents } from "../../redux/slices/studentSlice";
type Props = {
  onEdit: (classData: Class) => void;
  onDelete: (classData: Class) => void;
};

export function ClassTable({ onEdit, onDelete }: Props) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.teachers);
  const classes = useAppSelector((state) => state.classes.list);

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchStudents());
    dispatch(fetchClasses());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto p-2">
      <table className="w-full border-collapse bg-white shadow-md rounded-sm overflow-hidden">
        <thead>
          <tr className="bg-orange-500 text-white text-left">
            <th className="p-2">Mã lớp</th>
            <th className="p-2">Tên lớp</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2">View</th>
            <th className="p-2 text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{item.classCode}</td>
              <td className="p-2">{item.name}</td>
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
                <a
                  href={`/classes/${item.id}`}
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
