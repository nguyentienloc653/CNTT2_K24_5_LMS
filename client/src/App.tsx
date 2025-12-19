import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import HomePage from "./homePage/HomePage";
import Article from "./article/Article";
import ArticleDetails from "./article/ArticleDetails";
import Elearning from "./elearning/Elearning";
import Overview from "./views/Overview";
import Scores from "./views/Scores";
import Attendance from "./views/Attendance";
import Submission from "./views/Submission";

import ManagerStudent from "./admin/ManagerStudent/ManagerStudent";
import ManagerTeacher from "./admin/ManagerTeacher/ManagerTeacher";
import DashboardManager from "./admin/DashboardStudent/DashboardManager";
import StudentDetail from "./admin/ManagerStudent/StudentDetail";
import Statisic from "./admin/StatisicStudent/statisic";

import { ToastContainer } from "react-toastify";
// import StudentLayout from "./components/layout/StudentLayout";
import Sidebar from "./components/training-manager/Sidebar";
import ClassManager from "./admin/ManagerClasses/ClassManager";

type PageId = "overview" | "scores" | "attendance" | "submission";

/* ===== Layout có Sidebar ===== */
function LayoutWithSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // lấy page hiện tại từ URL
  const activePage = location.pathname.replace("/", "") as PageId;

  const handleChangePage = (page: PageId) => {
    navigate(`/${page}`);
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} onChangePage={handleChangePage} />

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/article" element={<Article />} />
        <Route path="/articleDetails" element={<ArticleDetails />} />
        <Route path="/elearning" element={<Elearning />} />
        {/*DASHBOARD ELERNING */}
        <Route path="/" element={<Dashboard />} />
        {/* STUDENT LAYOUT */}
        <Route element={<LayoutWithSidebar />}>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/submission" element={<Submission />} />
        </Route>

        {/* Article */}
        <Route path="/article" element={<Article />} />

        {/* Admin */}
        <Route path="/dashboard-manager" element={<DashboardManager />} />
        <Route path="/students" element={<ManagerStudent />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/teachers" element={<ManagerTeacher />} />
        <Route path="/classes" element={<ClassManager />} />
        <Route path="/statistic" element={<Statisic />} />
      </Routes>
    </BrowserRouter>
  );
}
