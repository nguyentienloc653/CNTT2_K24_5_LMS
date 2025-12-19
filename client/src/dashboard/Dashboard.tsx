import "./Dashboard.css";
import logo from "../img/mankailogo.png";
import searchIcon from "../img/search-normal.png";
import avatarImg from "../img/Avatar.png";
import notification from "../img/notification.png";
import avt from "../img/IMG.png";
import logoLms from "../img/message-programming.png";
import logoElearning from "../img/monitor-recorder.png";
import logoExam from "../img/mobile-programming.png";
import logoTrain from "../img/global.png";
import makailogo from "../img/Frame 54.png";
import iconAddress from "../img/Featured icon.png";
import iconHotline from "../img/Featured icon (1).png";
import iconEmail from "../img/Featured icon (2).png";
import iconfacebook from "../img/facebook.png";
import iconyoutube from "../img/youtube.png";
import { useNavigate } from "react-router-dom";

// type Item = {
//   title: string;
//   desc: string;
//   icon: string;
// };

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-home-container">
      <header className="dashboard-header">
        <img
          src={logo}
          alt="Logo"
          className="dashboard-logo"
          onClick={() => navigate("/")}
        />
        <div className="dashboard-header-actions">
          <img src={searchIcon} alt="Search" className="dashboard-icon" />
          <img
            src={notification}
            alt="Notification"
            className="dashboard-icon"
          />
          <img src={avatarImg} className="dashboard-avatar" alt="Avatar" />
        </div>
      </header>

      <section className="dashboard-banner">
        <div className="dashboard-banner-text">
          <h1 className="dashboard-banner-title">Xin Chào, Viên</h1>
          <p className="dashboard-banner-desc">
            Cùng khám phá kho tàng kiến thức bất tận cùng bộ tài liệu độc quyền
            với Rikkei Education nhé!
          </p>
        </div>
        <img src={avt} alt="Banner Girl" className="dashboard-banner-img" />
      </section>

      <h2 className="dashboard-section-title">Hệ thống học tập</h2>

      <div className="dashboard-grid-container">
        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <img src={logoLms} alt="LMS" />
          </div>
          <h3 className="dashboard-card-title">LMS</h3>
          <p className="dashboard-card-desc">
            Nền tảng quản lý học tập trực tuyến giúp tổ chức, theo dõi, và đánh
            giá các khóa học và tài liệu học tập
          </p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/HomePage")}>
          <div className="dashboard-card-icon">
            <img src={logoElearning} alt="E-Learning" />
          </div>
          <h3 className="dashboard-card-title">E-Learning</h3>
          <p className="dashboard-card-desc">
            Phương pháp học tập trực tuyến thông qua các thiết bị điện tử, cung
            cấp sự linh hoạt và tiện lợi cho người học
          </p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("")}>
          <div className="dashboard-card-icon">
            <img src={logoExam} alt="Bài kiểm tra" />
          </div>
          <h3 className="dashboard-card-title">Bài kiểm tra</h3>
          <p className="dashboard-card-desc">
            Các bài kiểm tra được thiết kế để đánh giá trình độ và hiệu biết của
            người học trong một lĩnh vực cụ thể
          </p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <img src={logoTrain} alt="Quản lý đào tạo" />
          </div>
          <h3 className="dashboard-card-title">Quản lý đào tạo</h3>
          <p className="dashboard-card-desc">
            Công cụ tạo và quản lý các bài kiểm tra trực tuyến giúp giáo viên
            đánh giá kiến thức của học sinh một cách dễ dàng và nhanh chóng
          </p>
        </div>
      </div>

      <footer className="dashboard-site-footer" role="contentinfo">
        <div className="dashboard-footer-top">
          <img
            src={makailogo}
            alt="Mankai Academy logo"
            className="dashboard-footer-logo"
          />
          <h2 className="dashboard-footer-title">
            MANKAI ACADEMY - HỌC VIỆN ĐÀO TẠO PHÁT TRIỂN TIẾNG NHẬT THỰC CHIẾN
          </h2>
        </div>

        <div className="dashboard-footer-body">
          <div className="dashboard-col dashboard-contact">
            <h3 className="dashboard-col-title">THÔNG TIN LIÊN HỆ</h3>
            <ul className="dashboard-contact-list">
              <li>
                <img
                  src={iconAddress}
                  alt="Address"
                  className="dashboard-icon"
                />
                <div>
                  <strong>Địa chỉ:</strong>
                  <div>
                    Tòa Sông Đà, Đường Phạm Hùng, Mỹ Đình, Nam Từ Liêm, Hà Nội
                  </div>
                </div>
              </li>
              <li>
                <img
                  src={iconHotline}
                  alt="Hotline"
                  className="dashboard-icon"
                />
                <div>
                  <strong>Hotline:</strong>
                  <div>0835 662 538</div>
                </div>
              </li>
              <li>
                <img src={iconEmail} alt="Email" className="dashboard-icon" />
                <div>
                  <strong>Email:</strong>
                  <div>support@mankai.edu.vn</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="dashboard-col dashboard-social">
            <h3 className="dashboard-col-title">THEO DÕI CHÚNG TÔI TẠI</h3>
            <div className="dashboard-social-icons" aria-hidden>
              <a
                href="#"
                className="dashboard-social-btn"
                aria-label="Facebook"
              >
                <img src={iconfacebook} alt="Facebook" />
              </a>
              <a
                href="https://www.youtube.com/@RikkeiEducation"
                className="dashboard-social-btn"
                aria-label="Youtube"
              >
                <img src={iconyoutube} alt="Youtube" />
              </a>
            </div>
          </div>

          <div className="dashboard-col dashboard-quote">
            <blockquote>
              <p>
                “Hạnh phúc là điểm khởi đầu của giáo dục và cũng là đích đến
                cuối cùng. Giảng viên chúng tôi tâm niệm rằng giảng dạy và luyện
                thi JLPT, mảng ngôn ngữ phối hợp với phát triển kỹ năng giúp học
                viên phát triển toàn diện.”
              </p>
              <cite>— Anh Nguyễn Việt Lâm — CEO Mankai Academy</cite>
            </blockquote>
          </div>
        </div>

        <div className="dashboard-footer-bottom">
          <small>
            © 2024 By Mankai Academy - Mankai Education. All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  );
}
