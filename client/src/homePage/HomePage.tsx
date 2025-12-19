import "./HomePage.css";
import logo from "../img/mankailogo.png";
import searchIcon from "../img/search-normal.png";
import avatarImg from "../img/Avatar.png";
import notification from "../img/notification.png";
import makailogo from "../img/Frame 54.png";
import iconAddress from "../img/Featured icon.png";
import iconHotline from "../img/Featured icon (1).png";
import iconEmail from "../img/Featured icon (2).png";
import iconfacebook from "../img/facebook.png";
import iconyoutube from "../img/youtube.png";
import imggiang from "../img/Image.png";
import img2 from "../img/Image 2.png";
import clock from "../img/clock.png";
import book from "../img/book.png";
import profiler from "../img/profile.png";
import iconHome from "../img/home2.png";
import iconBook from "../img/book (1).png";
import { useNavigate } from "react-router-dom";

type Course = {
  id: number;
  title: string;
  subtitle: string;
  lessons: string;
  teacher: string;
  rating?: string;
  image: string;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const courses: Course[] = [
    {
      id: 1,
      title: "N1 CHILL CLASS",
      subtitle: "N1 Chill Class",
      lessons: "30 buổi",
      teacher: "Giang Sensei",
      image: img2,
    },
    {
      id: 2,
      title: "N2 CHILL CLASS",
      subtitle: "N2 Chill Class",
      lessons: "24 buổi",
      teacher: "Giang Sensei",
      image: img2,
    },
    {
      id: 3,
      title: "PHÁT ÂM J-VOICE",
      subtitle: "Phát âm / J-Voice",
      lessons: "16 buổi",
      teacher: "Giang Sensei",
      rating: "4.9",
      image: img2,
    },
    {
      id: 4,
      title: "IT TALK",
      subtitle: "IT Talk",
      lessons: "12 buổi",
      teacher: "Giang Sensei",
      rating: "4.7",
      image: img2,
    },
  ];

  return (
    <div className="homepage-home-container">
      <header className="homepage-header">
        <div className="homepage-header-left">
          <img
            src={logo}
            alt="Logo"
            className="homepage-logo"
            onClick={() => navigate("/")}
          />

          <nav className="homepage-nav">
            <span className="homepage-nav-item active">
              <img
                src={iconHome}
                alt="Home"
                onClick={() => navigate("/HomePage")}
              />{" "}
              Trang chủ
            </span>
            <span
              className="homepage-nav-item"
              onClick={() => navigate("/Article")}
            >
              <img src={iconBook} alt="Blog" /> Bài viết
            </span>
          </nav>
        </div>

        <div className="homepage-header-actions">
          <img src={searchIcon} alt="Search" className="homepage-icon" />
          <img
            src={notification}
            alt="Notification"
            className="homepage-icon"
          />
          <img src={avatarImg} className="homepage-avatar" alt="Avatar" />
        </div>
      </header>

      <div className="homepage-tb-container">
        <div className="homepage-tb-left">
          <span className="homepage-tb-quote">“</span>
          <p className="homepage-tb-text">
            Hạnh phúc là điểm khởi đầu của giáo dục và cũng là đích đến cuối
            cùng. Giang, với <strong>hơn 10 năm kinh nghiệm</strong> giảng dạy
            và luyện thi JLPT, mong muốn giúp học viên rút ngắn thời gian và
            <strong> chinh phục JLPT</strong>. Hãy biến học tập thành không chỉ
            là mục tiêu phát triển bản thân mà còn là hành trình hạnh phúc để
            hiện thực hóa những giấc mơ..
          </p>
          <span className="homepage-tb-quote right">”</span>
        </div>

        <div className="homepage-tb-right">
          <img
            src={imggiang}
            alt="Giang Sensei"
            className="homepage-tb-image"
          />
        </div>
      </div>

      <div className="homepage-course-container">
        <h2 className="homepage-course-title">TẤT CẢ KHÓA HỌC</h2>

        <div className="homepage-course-grid">
          {courses.map((c) => (
            <div
              key={c.id}
              className="homepage-course-card"
              onClick={() => navigate("/Elearning")}
            >
              <div className="homepage-course-img-box">
                <img
                  src={c.image}
                  alt={c.title}
                  className="homepage-course-img"
                />
                <span className="homepage-course-level">Beginner</span>
              </div>

              <div className="homepage-course-body">
                <div className="homepage-course-info">
                  <span>
                    <img src={clock} alt="Clock" /> 360 phút
                  </span>
                  <span>
                    <img src={book} alt="Lessons" /> {c.lessons}
                  </span>
                  <span>
                    <img src={profiler} alt="Teacher" /> {c.teacher}
                  </span>
                </div>

                <h3 className="homepage-course-subtitle">{c.subtitle}</h3>

                <button className="homepage-course-btn">
                  HỌC NGAY <span>↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="homepage-site-footer" role="contentinfo">
        <div className="homepage-footer-top">
          <img
            src={makailogo}
            alt="Mankai Academy logo"
            className="homepage-footer-logo"
          />
          <h2 className="homepage-footer-title">
            MANKAI ACADEMY - HỌC VIỆN ĐÀO TẠO PHÁT TRIỂN TIẾNG NHẬT THỰC CHIẾN
          </h2>
        </div>

        <div className="homepage-footer-body">
          <div className="homepage-col contact">
            <h3 className="homepage-col-title">THÔNG TIN LIÊN HỆ</h3>
            <ul className="homepage-contact-list">
              <li>
                <img
                  src={iconAddress}
                  alt="Address"
                  className="homepage-icon"
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
                  className="homepage-icon"
                />
                <div>
                  <strong>Hotline:</strong>
                  <div>0835 662 538</div>
                </div>
              </li>
              <li>
                <img src={iconEmail} alt="Email" className="homepage-icon" />
                <div>
                  <strong>Email:</strong>
                  <div>support@mankai.edu.vn</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="homepage-col social">
            <h3 className="homepage-col-title">THEO DÕI CHÚNG TÔI TẠI</h3>
            <div className="homepage-social-icons" aria-hidden>
              <a
                href="https://www.facebook.com/rikkeiacademy.vn"
                className="homepage-social-btn"
                aria-label="Facebook"
              >
                <img src={iconfacebook} alt="Facebook" />
              </a>
              <a
                href="https://www.youtube.com/@RikkeiEducation"
                className="homepage-social-btn"
                aria-label="Youtube"
              >
                <img src={iconyoutube} alt="Youtube" />
              </a>
            </div>
          </div>

          <div className="homepage-col quote">
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

        <div className="homepage-footer-bottom">
          <small>
            © 2024 By Mankai Academy - Mankai Education. All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  );
}
