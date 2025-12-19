import "./Article.css";
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
import iconHome from "../img/home2.png";
import iconBook from "../img/book (1).png";
import clock from "../img/clock2.png";
import iconBook2 from "../img/book2.png";
import banner from "../img/back ground.png";
import { useNavigate } from "react-router-dom";

export default function Article() {
  const navigate = useNavigate();
  const blogs = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    category: "Front-End",
    title: "Authentication & Authorization trong ReactJS",
    description:
      "Chào bạn! Nếu bạn đã làm việc với React, chắc hẳn bạn đã biết tới Dev Mode...",
    time: "15-17 phút đọc",
    views: "8 tháng trước",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
  }));

  return (
    <div className="article-home-container">
      <header className="article-header">
        <div className="article-header-left">
          <img
            src={logo}
            alt="Logo"
            className="article-logo"
            onClick={() => navigate("/")}
          />
          <nav className="article-nav">
            <span
              className="article-nav-item active"
              onClick={() => navigate("/HomePage")}
            >
              <img src={iconHome} alt="Home" /> Trang chủ
            </span>
            <span className="article-nav-item">
              <img src={iconBook} alt="Blog" /> Bài viết
            </span>
          </nav>
        </div>

        <div className="article-header-actions">
          <img src={searchIcon} alt="Search" className="article-icon" />
          <img src={notification} alt="Notification" className="article-icon" />
          <img src={avatarImg} alt="Avatar" className="article-avatar" />
        </div>
      </header>

      <div className="article-blog-page">
        <div className="article-blog-banner">
          <img src={banner} alt="Banner" />
          <p className="article-breadcrumb">Trang chủ / Bài viết</p>
          <h1>Bài viết</h1>
        </div>

        <div className="article-blog-container">
          <div className="article-blog-header">
            <h3>
              Tất cả bài viết <span>(120)</span>
            </h3>
            <select>
              <option>Sắp xếp: Front-End</option>
              <option>Back-End</option>
            </select>
          </div>
          <hr />

          <div className="article-blog-grid">
            {blogs.map((item) => (
              <div
                className="article-blog-card"
                key={item.id}
                onClick={() => navigate("/ArticleDetails")}
              >
                <img src={item.image} alt={item.title} />
                <div className="article-blog-card-content">
                  <span className="article-tag">{item.category}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <div className="article-blog-meta">
                    <span className="article-meta-item">
                      <img
                        src={clock}
                        alt="Views"
                        className="article-meta-icon"
                      />{" "}
                      {item.views}
                    </span>
                    <span className="article-meta-item">
                      <img
                        src={iconBook2}
                        alt="Reading time"
                        className="article-meta-icon"
                      />{" "}
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="article-site-footer" role="contentinfo">
        <div className="article-footer-top">
          <img
            src={makailogo}
            alt="Mankai Academy logo"
            className="article-footer-logo"
          />
          <h2 className="article-footer-title">
            MANKAI ACADEMY - HỌC VIỆN ĐÀO TẠO PHÁT TRIỂN TIẾNG NHẬT THỰC CHIẾN
          </h2>
        </div>

        <div className="article-footer-body">
          <div className="article-col contact">
            <h3 className="article-col-title">THÔNG TIN LIÊN HỆ</h3>
            <ul className="article-contact-list">
              <li>
                <img src={iconAddress} alt="Address" className="article-icon" />
                <div>
                  <strong>Địa chỉ:</strong>
                  <div>
                    Tòa Sông Đà, Đường Phạm Hùng, Mỹ Đình, Nam Từ Liêm, Hà Nội
                  </div>
                </div>
              </li>
              <li>
                <img src={iconHotline} alt="Hotline" className="article-icon" />
                <div>
                  <strong>Hotline:</strong>
                  <div>0835 662 538</div>
                </div>
              </li>
              <li>
                <img src={iconEmail} alt="Email" className="article-icon" />
                <div>
                  <strong>Email:</strong>
                  <div>support@mankai.edu.vn</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="article-col social">
            <h3 className="article-col-title">THEO DÕI CHÚNG TÔI TẠI</h3>
            <div className="article-social-icons" aria-hidden>
              <a href="#" className="article-social-btn" aria-label="Facebook">
                <img src={iconfacebook} alt="Facebook" />
              </a>
              <a
                href="https://www.youtube.com/@RikkeiEducation"
                className="article-social-btn"
                aria-label="Youtube"
              >
                <img src={iconyoutube} alt="Youtube" />
              </a>
            </div>
          </div>

          <div className="article-col quote">
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

        <div className="article-footer-bottom">
          <small>
            © 2024 By Mankai Academy - Mankai Education. All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  );
}
