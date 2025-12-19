import "./ArticleDetails.css";
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
import imgArticleDetails from "../img/anhbaiviet1.png";
import imgArticleDetails2 from "../img/anhbaiviet2.png";
import imgArticleDetails3 from "../img/anhbaiviet3.png";
import { useNavigate } from "react-router-dom";

export default function ArticleDetails() {
  const navigate = useNavigate();
  return (
    <div className="articledetails-home-container">
      <header className="articledetails-articledetails-header">
        <div className="articledetails-articledetails-header-left">
          <img
            src={logo}
            alt="Logo"
            className="articledetails-logo"
            onClick={() => navigate("/")}
          />
          <nav className="articledetails-nav">
            <span
              className="articledetails-nav-item active"
              onClick={() => navigate("/HomePage")}
            >
              <img src={iconHome} alt="Home" /> Trang chủ
            </span>
            <span
              className="articledetails-nav-item"
              onClick={() => navigate("/Article")}
            >
              <img src={iconBook} alt="Blog" /> Bài viết
            </span>
          </nav>
        </div>

        <div className="articledetails-header-actions">
          <img src={searchIcon} alt="Search" className="articledetails-icon" />
          <img
            src={notification}
            alt="Notification"
            className="articledetails-icon"
          />
          <img src={avatarImg} className="articledetails-avatar" alt="Avatar" />
        </div>
      </header>

      <div className="articledetails-article-wrapper">
        <div className="articledetails-breadcrumb">
          Trang chủ / Bài viết / <span>Chi tiết bài viết</span>
        </div>

        <h1 className="articledetails-article-title">
          Authentication & Authorization trong ReactJS
        </h1>

        <div className="articledetails-article-meta">
          <span className="articledetails-tag">Front-End</span>
          <span>• 8 tháng trước</span>
          <span>• 10–15 phút đọc</span>
        </div>

        <div className="articledetails-article-content">
          <h3>Ornare eu elementum felis porttitor nunc</h3>
          <p>
            Ornare eu elementum felis porttitor nunc tortor. Ornare neque
            accumsan metus nulla ultricies maecenas rhoncus ultrices cras.
            Vestibulum varius adipiscing ipsum pharetra. Semper ullamcorper
            malesuada ut auctor scelerisque. Sit morbi pellentesque adipiscing
            pellentesque habitant ullamcorper est. In dolor sit platea faucibus
            ut dignissim pulvinar.
          </p>

          <img
            src={imgArticleDetails}
            alt="Article Detail 1"
            className="articledetails-article-image"
          />

          <h4>Lorem ipsum dolor sit amet consectetur :</h4>
          <p>
            Ornare eu elementum felis porttitor nunc tortor. Ornare neque
            accumsan metus nulla ultricies maecenas rhoncus ultrices cras.
          </p>

          <h4>
            Semper lacinia non lectus mauris sed eget scelerisque facilisis
            donec:
          </h4>
          <ul>
            <li>
              Tellus molestie leo gravida feugiat. Ipsum est lacus lobortis
              accumsan eget.
            </li>
            <li>
              Sit parturient viverra ut cursus. Vestibulum non et ullamcorper
              fermentum fringilla est.
            </li>
            <li>
              A nullam diam rhoncus pellentesque eleifend risus ut libero.
            </li>
          </ul>

          <img
            src={imgArticleDetails2}
            alt="Article Detail 2"
            className="articledetails-article-image"
          />

          <h3>Vestibulum varius adipiscing</h3>
          <p>
            Ornare eu elementum felis porttitor nunc tortor. Ornare neque
            accumsan metus nulla ultricies maecenas rhoncus ultrices cras.
          </p>

          <img
            src={imgArticleDetails3}
            alt="Article Detail 3"
            className="articledetails-article-image"
          />
        </div>
      </div>

      <footer className="articledetails-site-footer" role="contentinfo">
        <div className="articledetails-footer-top">
          <img
            src={makailogo}
            alt="Mankai Academy logo"
            className="articledetails-footer-logo"
          />
          <h2 className="articledetails-footer-title">
            MANKAI ACADEMY - HỌC VIỆN ĐÀO TẠO PHÁT TRIỂN TIẾNG NHẬT THỰC CHIẾN
          </h2>
        </div>

        <div className="articledetails-footer-body">
          <div className="articledetails-col contact">
            <h3 className="articledetails-col-title">THÔNG TIN LIÊN HỆ</h3>
            <ul className="articledetails-contact-list">
              <li>
                <img
                  src={iconAddress}
                  alt="Address"
                  className="articledetails-icon"
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
                  className="articledetails-icon"
                />
                <div>
                  <strong>Hotline:</strong>
                  <div>0835 662 538</div>
                </div>
              </li>
              <li>
                <img
                  src={iconEmail}
                  alt="Email"
                  className="articledetails-icon"
                />
                <div>
                  <strong>Email:</strong>
                  <div>support@mankai.edu.vn</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="articledetails-col social">
            <h3 className="articledetails-col-title">THEO DÕI CHÚNG TÔI TẠI</h3>
            <div className="articledetails-social-icons" aria-hidden>
              <a
                href="#"
                className="articledetails-social-btn"
                aria-label="Facebook"
              >
                <img src={iconfacebook} alt="Facebook" />
              </a>
              <a
                href="https://www.youtube.com/@RikkeiEducation"
                className="articledetails-social-btn"
                aria-label="Youtube"
              >
                <img src={iconyoutube} alt="Youtube" />
              </a>
            </div>
          </div>

          <div className="articledetails-col quote">
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

        <div className="articledetails-footer-bottom">
          <small>
            © 2024 By Mankai Academy - Mankai Education. All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  );
}
