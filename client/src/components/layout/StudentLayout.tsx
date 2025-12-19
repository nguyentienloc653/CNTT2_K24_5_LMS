import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../training-manager/Sidebar";
import "../../views/css/StudentLayout.css";

type PageId = "overview" | "scores" | "attendance" | "submission";

export default function StudentLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.replace("/", "") as PageId;

  const handleChangePage = (page: PageId) => {
    navigate(`/${page}`);
  };

  return (
    <div className="student-layout">
      <Sidebar
        activePage={path}
        onChangePage={handleChangePage}
      />

      <main className="student-content">
        <Outlet />
      </main>
    </div>
  );
}
