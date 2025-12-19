// src/components/Sidebar.tsx
import "../../views/css/Overview.css";

import LogoImg from "../../img/Logo.png";

// icon menu
import overviewIcon from "../../img/status-up.png";
import scoresIcon from "../../img/graph.png";
import attendanceIcon from "../../img/calendar-tick.png";
import submissionIcon from "../../img/note.png";
import logoutIcon from "../../img/logout.png";

// icon thông tin cá nhân
import dobIcon from "../../img/calendar-2.png";
import emailIcon from "../../img/sms.png";
import phoneIcon from "../../img/call.png";

type PageId = "overview" | "scores" | "attendance" | "submission";

type MenuItem = {
  id: PageId;
  label: string;
  icon: string;
};

type SidebarProps = {
  activePage: PageId;
  onChangePage: (page: PageId) => void;
};

function Sidebar({ activePage, onChangePage }: SidebarProps) {
  const menuItems: MenuItem[] = [
    { id: "overview", label: "Tổng quan", icon: overviewIcon },
    { id: "scores", label: "Xem điểm", icon: scoresIcon },
    { id: "attendance", label: "Điểm danh", icon: attendanceIcon },
    { id: "submission", label: "Nộp bài", icon: submissionIcon },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={LogoImg} alt="RKEI Edu" className="logo-img" />
      </div>

      {/* MENU */}
      <nav className="menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => onChangePage(item.id)}
            type="button"
          >
            <img src={item.icon} alt="" className="menu-icon-img" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <hr className="sidebar-divider" />

      {/* PROFILE */}
      <div className="profile-card">
        <div className="avatar">
          <img src="https://i.pravatar.cc/100?img=5" alt="avatar" />
        </div>

        <div className="profile-info">
          <h3>Nguyễn Ánh Viên</h3>
          <span className="student-code">PTIT242</span>
          <br />
          <br />

          <div className="profile-fields">
            <div className="profile-field">
              <img src={dobIcon} alt="" className="field-icon-img" />
              <span className="field-label">Ngày sinh:</span>
              <span>15/03/2006</span>
            </div>

            <div className="profile-field">
              <img src={emailIcon} alt="" className="field-icon-img" />
              <span className="field-label">Email:</span>
              <span>vien@gmail.com</span>
            </div>

            <div className="profile-field">
              <img src={phoneIcon} alt="" className="field-icon-img" />
              <span className="field-label">Số điện thoại:</span>
              <span>0981 965 304</span>
            </div>
          </div>
        </div>
      </div>

      {/* LOGOUT */}
      <button className="logout-btn" type="button">
        <img src={logoutIcon} alt="" className="menu-icon-img" />
        <span>Log Out</span>
      </button>
    </aside>
  );
}

export default Sidebar;
