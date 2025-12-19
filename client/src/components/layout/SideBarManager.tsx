import { NavLink } from "react-router-dom";

import studentIcon from "../../assets/icon/studentIcon.png";
import mankaiLogo from "../../assets/icon/Frame 10.png";
import classIcon from "../../assets/icon/class.png";
import teacherIcon from "../../assets/icon/studentIcon.png";
import courseIcon from "../../assets/icon/course.png";
import periodIcon from "../../assets/icon/period.png";
import questionIcon from "../../assets/icon/question.png";
import examIcon from "../../assets/icon/exam.png";
import statisticIcon from "../../assets/icon/statistic.png";
import dashboardIcon from "../../assets/icon/dashboard.png"

export default function SideBarManager() {
  const menu = [
    { icon: dashboardIcon, label: "Dashboard", path: "/dashboard-manager"},
    { icon: studentIcon, label: "Students", path: "/students" },
    { icon: teacherIcon, label: "Teachers", path: "/teachers" },
    { icon: courseIcon, label: "Course", path: "/courses" },
    { icon: periodIcon, label: "Period", path: "/period" },
    { icon: classIcon, label: "Classes", path: "/classes" },
    { icon: questionIcon, label: "Questions", path: "/questions" },
    { icon: examIcon, label: "Exams", path: "/exams" },
    { icon: statisticIcon, label: "Statistic", path: "/statistic" },
  ];

  return (
    <div className="w-64 bg-white border-r h-screen shadow-lg shadow-slate-300 rounded-md">
      {/* Logo */}
      <div className="flex gap-2 mb-6 p-4">
        <img src={mankaiLogo} alt="Mankai" className="w-10" />
        <div className="text-2xl font-semibold">Mankai Admin</div>
      </div>

      {/* Menu */}
      <ul className="space-y-4">
        {menu.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg cursor-pointer 
                hover:bg-orange-100 
                ${isActive ? "bg-orange-500 text-white font-semibold" : "text-gray-700"}`
              }
            >
              <img src={item.icon} alt={item.label} className="w-4" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
